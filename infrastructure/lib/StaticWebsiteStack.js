import {RemovalPolicy} from '@aws-cdk/core';
import { StaticWebsite } from '@cloudcomponents/cdk-static-website';
import * as sst from "@serverless-stack/resources";

export default class StaticWebsiteStack extends sst.Stack {
  staticWebsite;

  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("Static Site Scope");
    console.dir(scope);
    this.staticWebsite = new StaticWebsite(this, 'PivotStaticWebsite', {
      // bucketConfiguration: {
      //   // source: '../../ui/dist',
      //   removalPolicy: RemovalPolicy.DESTROY,
      // },
    });
  }
}
