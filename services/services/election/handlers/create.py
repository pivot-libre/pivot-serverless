import json
from services.common.http_support import cors_headers


def handler(event, context):
    body = {
        "message": "POST executed successfully!",
        "input": event
    }
    response = {
        "statusCode": 200,
        "body": json.dumps(body),
        "headers": {
            **cors_headers()
        }
    }

    return response

    # Use this code if you don't use the http event with the LAMBDA-PROXY
    # integration
    """
    return {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "event": event
    }
    """
