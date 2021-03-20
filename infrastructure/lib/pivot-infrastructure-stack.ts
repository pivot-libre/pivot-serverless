import {Stack, StackProps, Construct, RemovalPolicy} from '@aws-cdk/core';
import { SPADeploy, SPADeploymentWithCloudFront } from 'cdk-spa-deploy';
import { IGrantable } from '@aws-cdk/aws-iam';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import { BlockPublicAccess, Bucket, BucketAccessControl, BucketEncryption } from '@aws-cdk/aws-s3';

export class PivotInfrastructureStack extends Stack {
  readonly staticWebsite : SPADeploymentWithCloudFront;
  readonly api: apigw.RestApi;
  readonly userDataBucket: Bucket;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    this.staticWebsite = new SPADeploy(this, 'ui')
      .createSiteWithCloudfront({
        indexDoc: 'index.html',
        websiteFolder: '../ui/dist'
      });
    
    const allowedOrigins = [
      // 'localhost:8080', //for local development
      // this.staticWebsite.distribution.distributionDomainName //for the static web app
      '*',
    ];

    this.userDataBucket = new Bucket(this, 'user-data', {
      accessControl: BucketAccessControl.PRIVATE,
      autoDeleteObjects: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      encryption: BucketEncryption.S3_MANAGED,
      removalPolicy: RemovalPolicy.DESTROY, //TODO: paramaterize this so that prod data is RETAIN
    });
    
    this.api =  new apigw.RestApi(this, `api`, {
      restApiName: `Pivot API`,
      defaultCorsPreflightOptions: {
        allowOrigins: allowedOrigins,
      },
      deployOptions: {
        throttlingRateLimit: 1,
        throttlingBurstLimit: 1,
      }
    });

    const lambdas = this.createCrudApi('election', this.api);
    lambdas.forEach((lambda) => {
      //TODO grant permissions more selectively
      this.userDataBucket.grantReadWrite(lambda.grantPrincipal);
      // this.userDataBucket.grantDelete(lambda.grantPrincipal);
      lambda.addEnvironment('USER_DATA_BUCKET', this.userDataBucket.bucketName);
    });
  }

  private createCrudApi(name: string, api: apigw.RestApi): Array<Function> {
    const entityRootResource = api.root.addResource(name);
    
    const createLambda = this.createLambdaForCrudOperation(name, 'create');
    entityRootResource.addMethod('POST', new apigw.LambdaIntegration(createLambda));

    const entityParameterizedResource = entityRootResource.addResource('{id}');

    const readLambda = this.createLambdaForCrudOperation(name, 'read');
    entityParameterizedResource.addMethod('GET', new apigw.LambdaIntegration(readLambda));

    const updateLambda = this.createLambdaForCrudOperation(name, 'update');
    entityParameterizedResource.addMethod('PUT', new apigw.LambdaIntegration(updateLambda));
    
    const deleteLambda = this.createLambdaForCrudOperation(name, 'delete');
    entityParameterizedResource.addMethod('DELETE', new apigw.LambdaIntegration(deleteLambda));

    const lambdas = [
      createLambda,
      readLambda,
      updateLambda,
      deleteLambda
    ];

    return lambdas;
  }

  private createLambdaForCrudOperation(name: string, operation: string) {
    const code = Code.fromAsset(
      `../services`, //relative to cdk.json
      {
        exclude: [
          '*.pyc',
          'node_modules',
          '.serverless',
          'venv',
          'env',
          'tests'
        ]
      }
    );
    const lambdaForOperation = new Function(this, `${operation}-${name}-Lambda`, {
      runtime: Runtime.PYTHON_3_6,
      code: code,
      handler: `services/${name}/handlers/${operation}.handler`
    });
    return lambdaForOperation;
  }

}
