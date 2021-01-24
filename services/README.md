# Pivot Services

Each service has its own directory. Services are managed separately. Lambda infrastructure is managed via serverless.yml files. Other infrastructure should be managed in the [infrastructure](../infrastructure) directory.

## Usage

In each directory

Install any relevant serverless framework plugins

```bash
$ npm install
```

```bash
$ serverless invoke local --function theFunctionName --path event.json
```

Where...
- `event.json` contains the request event info appropriate to the service.
- `theFunctionName` is a function name listed in the service's serverless.yml file

Finally, run this to deploy to the API to your AWS account.

```bash
$ serverless deploy
```

The API service refers to an `.env` file for secret environment variables that are not checking in to the repo. Make su
