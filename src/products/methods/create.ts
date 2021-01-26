import AWS from 'aws-sdk'
import { APIGatewayEvent } from 'aws-lambda'
import { OutgoingHttpHeaders } from 'http'
import getId from '../utils/getId'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RESERVED_WORDS = ['new']

const Create = async (
  event: APIGatewayEvent,
  dbClient: AWS.DynamoDB.DocumentClient,
  tableName: string,
  headers: OutgoingHttpHeaders,
  segment: string
) => {
  const { name, ...rest } = event.body && JSON.parse(event.body)
  const sanitizedName = name.replace(/[^a-zA-Z0-9 ]/g, '')

  const params = {
    TableName: tableName, // The name of your DynamoDB table
    Item: {
      // Creating an Item with a unique id and with the passed title
      id: segment ? segment : getId(),
      name: sanitizedName,
      ...rest,
    },
  }

  try {
    // Utilising the put method to insert an item into the table (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.01)
    await dbClient.put(params).promise()
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
      headers,
    }
    return response // Returning a 200 if the item has been inserted
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e),
      headers,
    }
  }
}

export default Create
