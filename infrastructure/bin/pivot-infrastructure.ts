#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PivotInfrastructureStack } from '../lib/pivot-infrastructure-stack';

const app = new cdk.App();
new PivotInfrastructureStack(app, 'PivotInfrastructureStack');
