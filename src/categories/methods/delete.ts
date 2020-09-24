import AWS from 'aws-sdk'
import { APIGatewayEvent } from 'aws-lambda'
import { OutgoingHttpHeaders } from 'http'

const Delete = async (
  event: APIGatewayEvent,
  dbClient: AWS.DynamoDB.DocumentClient,
  segment: string,
  tableName: string,
  headers: OutgoingHttpHeaders
) => {
  const id = segment
  const params = {
    TableName: tableName,
    Key: { id },
  }

  try {
    await dbClient.delete(params).promise()
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Key),
      headers,
    }
    return response
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e),
      headers,
    }
  }
}

export default Delete
