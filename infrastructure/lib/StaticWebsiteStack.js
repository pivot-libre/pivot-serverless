import {cdk, RemovalPolicy} from '@aws-cdk/core';
import { SPADeploy } from 'cdk-spa-deploy';

export default class StaticWebsiteStack extends cdk.Stack {
  staticWebsite;

  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("Static Site Scope");
    console.dir(scope);
    this.staticWebsite = new SPADeploy(this, 'spaDeploy')
      .createBasicSite({
        indexDoc: 'index.html',
        websiteFolder: '../../ui/dist'
      });
  }
}
