# Pivot Services

Each entity has its own directory. Service infrastructure is managed in the [infrastructure](../infrastructure) directory.

## Requirements

 * Python 3.6+
 * pip
 * virtualenv is recommended

## Usage

Install [boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html); either within a virtualenv or globally.

Make code changes, then deploy them to AWS using the [infrastructure deployment instructions](../infrastructure/README.md).

## Useful Commands

 * `python3 -m unittest` run unit tests
