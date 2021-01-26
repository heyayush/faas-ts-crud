import AWS from 'aws-sdk'
import { APIGatewayEvent } from 'aws-lambda'
import { OutgoingHttpHeaders } from 'http'
import flatUpdateParams from '../utils/flatupdateParams'

const Update = async (
  event: APIGatewayEvent,
  dbClient: AWS.DynamoDB.DocumentClient,
  tableName: string,
  headers: OutgoingHttpHeaders,
  segment: string
) => {
  console.log('update initiated')

  const { id, ...rest } = event.body && JSON.parse(event.body)
  console.log('data received', id, rest, 'segment', segment)
  console.log('flat update params', flatUpdateParams(rest))
  // Needs Testing
  const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
    TableName: tableName,
    Key: {
      id: segment,
    },
    ...flatUpdateParams(rest),
    ReturnValues: 'ALL_NEW',
  }
  try {
    const updatedData = await dbClient.update(params).promise()
    const response = {
      statusCode: 200,
      headers,
      body: JSON.stringify(updatedData),
    }
    return response
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify(err),
    }
  }
}

export default Update
