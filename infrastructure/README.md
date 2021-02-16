# Pivot Infrastructure

Pivot's Infrastructure is managed with TypeScript and the CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Requirements

 * nodejs
 * npm

## Setup

```
cd infrastructure
```

Install the dependencies.

```
npm install
```

Build and deploy the stack

```
npx cdk deploy
```

The output will contain an API Gateway URL. Save this for later. You will need it to set up the UI.


## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `npx cdk deploy`      deploy this stack to your default AWS account/region
 * `npx cdk diff`        compare deployed stack with current state
 * `npx cdk synth`       emits the synthesized CloudFormation template
