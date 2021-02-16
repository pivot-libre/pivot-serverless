import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as PivotInfrastructure from '../lib/pivot-infrastructure-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new PivotInfrastructure.PivotInfrastructureStack(app, 'MyTestStack');
    // THEN
    expect(stack.staticWebsite).not.toBeNull();
    expect(stack.api).not.toBeNull();
    expect(stack.userDataBucket).not.toBeNull();
});
