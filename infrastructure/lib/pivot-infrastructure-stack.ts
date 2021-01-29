import {Stack, StackProps, Construct} from '@aws-cdk/core';
import { SPADeploy } from 'cdk-spa-deploy';

export class PivotInfrastructureStack extends Stack {
  readonly staticWebsite : any;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    this.staticWebsite = new SPADeploy(this, 'spaDeploy')
      .createSiteWithCloudfront({
        indexDoc: 'index.html',
        websiteFolder: '../ui/dist'
      });
  }
}
