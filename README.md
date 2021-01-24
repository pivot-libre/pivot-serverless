# Pivot Serverless 

This repo is split into:

- **services**: [Serverless Framework](https://github.com/serverless/serverless) services
- **infrastructure**: An [SST](https://github.com/serverless-stack/serverless-stack) app
- **ui**: A Vue JS app

#### Usage

To use this repo locally you need to have the [Serverless framework](https://serverless.com) installed.

```bash
$ npm install serverless -g
```

Clone this repo.

```bash
$ git clone <clone url here>
```

Head over to the `infrastructure/` directory and install the npm packages.

``` bash
$ npm install
```

And build the SST app.

``` bash
$ npx sst build
```

Then deploy it to your AWS account

``` bash
$ npx sst deploy
```

Then head over to any `services/<service name>/` directory. And run a single API endpoint locally.

```bash
$ serverless invoke local --function list --path event.json
```

Where, `event.json` contains the request event info appropriate to the service. 

Finally, run this to deploy to the API to your AWS account.

```bash
$ serverless deploy
```

The API service refers to an `.env` file for secret environment variables that are not checking in to the repo. Make sure to create one before deploying - https://serverless-stack.com/chapters/load-secrets-from-env.html.

