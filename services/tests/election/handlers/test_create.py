"""
Test Election Creation
"""

import unittest
from services.election.handlers.create import handler

class CreateTest(unittest.TestCase):
    """
    Election Creation Test Suite
    """

    def test(self):
        """
        happy-path test for echoed response
        """

        expected = {
            'body': '{"message": "POST executed successfully!", "input": {}}',
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,DELETE,PUT',
                'Access-Control-Allow-Origin': '*'
            },
            'statusCode': 200
        }
        self.assertEqual(handler({}, {}), expected)

if __name__ == '__main__':
    unittest.main()
