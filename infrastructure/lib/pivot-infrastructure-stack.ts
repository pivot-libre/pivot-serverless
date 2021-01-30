import {Stack, StackProps, Construct} from '@aws-cdk/core';
import { SPADeploy } from 'cdk-spa-deploy';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';

export class PivotInfrastructureStack extends Stack {
  readonly staticWebsite : any;
  readonly api: apigw.RestApi;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    this.staticWebsite = new SPADeploy(this, 'spaDeploy')
      .createSiteWithCloudfront({
        indexDoc: 'index.html',
        websiteFolder: '../ui/dist'
      });

    this.api =  new apigw.RestApi(this, `PivotApi`, {
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
      const lambdaForOperation = new lambda.Function(this, `${operation}${name}Lambda`, {
        runtime: lambda.Runtime.PYTHON_3_8,
        code: lambda.Code.fromAsset(`../services/${name}`),//relative to cdk.json
        handler: `${operation}.handler`
      });
      const lambdaIntegration = new apigw.LambdaIntegration(lambdaForOperation);
      resource.addMethod(operation, lambdaIntegration);
    });
  return crudApis;
  }
}
