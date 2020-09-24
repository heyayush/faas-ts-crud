import AWS from 'aws-sdk'
import { APIGatewayEvent } from 'aws-lambda'
import { OutgoingHttpHeaders } from 'http'

const Update = async (
  event: APIGatewayEvent,
  dbClient: AWS.DynamoDB.DocumentClient,
  segment: string,
  tableName: string,
  headers: OutgoingHttpHeaders
) => {
  const id = segment
  const { label, url } = event.body && JSON.parse(event.body)
  const params = {
    TableName: tableName,
    Item: {
      id: id,
      name: label,
      url: url,
    },
  }
  try {
    await dbClient.put(params).promise()
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
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

export default Update
