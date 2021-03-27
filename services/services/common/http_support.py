"""
Common HTTP Functionality
"""

def cors_headers():
    """
    Return Cross-Origin Resource Sharing (CORS) HTTP Headers.
    https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    """
    return {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE,PUT",
    }
