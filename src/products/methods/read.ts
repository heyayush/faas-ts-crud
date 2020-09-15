import AWS from 'aws-sdk'
import { APIGatewayEvent } from 'aws-lambda'

const Read = async (event: APIGatewayEvent, dbClient: AWS.DynamoDB.DocumentClient, segment: string) => {
  const id = segment
  const params = {
    TableName: process.env.PRODUCTS_TABLE_NAME || '', // The name of your DynamoDB table
    Key: { id }, // They key of the item you wish to find.
  }
  try {
    // Utilising the get method to retrieve an indvidual item
    const data = await dbClient.get(params).promise()
    const response = {
      statusCode: 200,
      body: JSON.stringify(data.Item),
    }
    return response
  } catch (e) {
    return {
      statusCode: 500,
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
