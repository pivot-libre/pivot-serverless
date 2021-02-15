import {Stack, StackProps, Construct, RemovalPolicy} from '@aws-cdk/core';
import { SPADeploy, SPADeploymentWithCloudFront } from 'cdk-spa-deploy';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import { create } from 'domain';

export class PivotInfrastructureStack extends Stack {
  readonly staticWebsite : SPADeploymentWithCloudFront;
  readonly api: apigw.RestApi;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    this.staticWebsite = new SPADeploy(this, 'ui')
      .createSiteWithCloudfront({
        indexDoc: 'index.html',
        websiteFolder: '../ui/dist'
      });
    
    const allowedOrigins = [
      'localhost', //for local development
      this.staticWebsite.distribution.distributionDomainName //for the static web app
    ];

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

    this.createCrudApi('election', this.api);
  }

  private createCrudApi(name: string, api: apigw.RestApi) {
    const entityRootResource = api.root.addResource(name);
    entityRootResource.addMethod('POST', this.buildLambdaIntegration(name, 'create'));

    const entityParameterizedResource = entityRootResource.addResource('{id}');
    entityParameterizedResource.addMethod('GET', this.buildLambdaIntegration(name, 'read'));
    entityParameterizedResource.addMethod('PUT', this.buildLambdaIntegration(name, 'update'));
    entityParameterizedResource.addMethod('DELETE', this.buildLambdaIntegration(name, 'delete'));

    return null;
  }

  private createLambdaForCrudOperation(name: string, operation: string) {
    const code = lambda.Code.fromAsset(
      `../services/${name}`, //relative to cdk.json
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
    const lambdaForOperation = new lambda.Function(this, `${operation}-${name}-Lambda`, {
      runtime: lambda.Runtime.PYTHON_3_6,
      code: code,
      handler: `handlers/${operation}.handler`
    });
    return lambdaForOperation;
  }
  private buildLambdaIntegration(entityName: string, nameOfOperation: string) {
    const lambdaForOperation = this.createLambdaForCrudOperation(entityName, nameOfOperation);
    const lambdaIntegration = new apigw.LambdaIntegration(lambdaForOperation);
    return lambdaIntegration;
  }

}
