import AWS from 'aws-sdk'
import { APIGatewayEvent } from 'aws-lambda'
import { OutgoingHttpHeaders } from 'http'
import flatUpdateParams from '../utils/flatupdateParams'

const Update = async (
  event: APIGatewayEvent,
  dbClient: AWS.DynamoDB.DocumentClient,
  tableName: string,
  headers: OutgoingHttpHeaders
) => {
  console.log('update initiated')

  const { id, ...rest } = event.body && JSON.parse(event.body)
  console.log('data received', id, rest)

  // Needs Testing
  const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
    TableName: tableName,
    Key: {
      id: id,
    },
    ...flatUpdateParams(rest),
    ReturnValues: 'ALL_NEW',
  }
  dbClient.update(params, function (err, data) {
    if (err) {
      console.log('Error', err)
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify(err),
      }
    } else {
      console.log('Success', data)
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data),
      }
    }
  })
}

export default Update
