import AWS from 'aws-sdk'
import { APIGatewayEvent } from 'aws-lambda'

const Delete = async (event: APIGatewayEvent, dbClient: AWS.DynamoDB.DocumentClient, segment: string) => {
  const id = segment
  const params = {
    TableName: process.env.PRODUCTS_TABLE_NAME || '',
    Key: { id },
  }

  try {
    await dbClient.delete(params).promise()
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Key),
    }
    return response
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    }
  }
}

export default Delete
