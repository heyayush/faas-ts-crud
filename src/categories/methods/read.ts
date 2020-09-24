import AWS from 'aws-sdk'
import { APIGatewayEvent } from 'aws-lambda'
import { OutgoingHttpHeaders } from 'http'

const Read = async (
  event: APIGatewayEvent,
  dbClient: AWS.DynamoDB.DocumentClient,
  segment: string,
  tableName: string,
  headers: OutgoingHttpHeaders
) => {
  const id = segment
  const params = {
    TableName: tableName, // The name of your DynamoDB table
    Key: { id }, // They key of the item you wish to find.
  }
  try {
    // Utilising the get method to retrieve an indvidual item
    const data = await dbClient.get(params).promise()
    const response = {
      statusCode: 200,
      body: JSON.stringify(data.Item),
      headers,
    }
    return response
  } catch (e) {
    return {
      statusCode: 500,
      headers,
    }
  }
}

export default Read

// Test Data
// {
//     "pathParameters": {
//       "id": "a4850b12819e5f92c216222d51757378"
//     }
//   }
