import {Stack, StackProps, Construct, RemovalPolicy} from '@aws-cdk/core';
import { SPADeploy } from 'cdk-spa-deploy';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';

export class PivotInfrastructureStack extends Stack {
  readonly staticWebsite : any;
  readonly api: apigw.RestApi;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    this.staticWebsite = new SPADeploy(this, 'ui')
      .createSiteWithCloudfront({
        indexDoc: 'index.html',
        websiteFolder: '../ui/dist'
      });

    // this.staticWebsite = 'blah';
    this.api =  new apigw.RestApi(this, `api`, {
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
      },
      restApiName: `Pivot API`,
    });

    this.createCrudApi('elections', this.api);
  }

  private createCrudApi(name: string, api: apigw.RestApi) {
    const resource = api.root.addResource(name);
    const crudApis = ['POST', 'GET', 'PUT', 'DELETE'].map((operation) => {
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
      const lambdaForOperation = new lambda.Function(this, `${operation}${name}Lambda`, {
        runtime: lambda.Runtime.PYTHON_3_6,
        code: code,
        handler: `handlers/${operation}.handler`
      });
      const lambdaIntegration = new apigw.LambdaIntegration(lambdaForOperation);
      resource.addMethod(operation, lambdaIntegration);
    });
  return crudApis;
  }
}
