# Pivot Serverless 

This repo is split into:

- **ui**: A [Vue JS](https://vuejs.org/) application
- **services**: [Python](https://www.python.org/) web services
- **infrastructure**: An [AWS Typescript CDK](https://aws.amazon.com/cdk/) project

## Requirements
 * nodejs v 10+
 * npm
 * Python 3.6+
 * An AWS Account
    * Create [an Access Key](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys)
    * Put your access key in ~/.aws/credentials ([example](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html))
    * Populate ~/.aws/config with a region and an output ([example](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html))


## Setup

Clone this repo.

```bash
$ git clone <clone url here>
```

```bash
cd ui
npm install
npm run build
cd ../infrastructure
npm install
npx cdk deploy
# copy the API Gateway URL from the output to your clipboard
# ex: https://1234567890.execute-api.us-east-2.amazonaws.com/prod/
cd ../ui
# copy the example ui config to a .gitignored location 
cp config.example.json public/config.json
# paste the API Gateway URL from your clipboard into the config file
vim public/config.json

# verify locally
npm run serve
# visit the local URL
# ex: https://localhost:8080

# verify in the cloud 
#rebuild the ui
npm run build
cd ../infrastructure
npx cdk deploy
# copy the cloudfront hostname from the output to your clipboard
# ex: 1234567890.cloudfront.net
# visit the remote URL
# ex: https://1234567890.cloudfront.net
```

# Details
Additional documentation is available in each directory:
- [ui](./ui/README.md)
- [sevices](./services/README.md)
- [infrastructure](./infrastructure/README.md)
