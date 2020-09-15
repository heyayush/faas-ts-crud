import AWS from 'aws-sdk'
import crypto from 'crypto'
import { APIGatewayEvent } from 'aws-lambda'

// Generate unique id with no external dependencies
const generateUUID = () => crypto.randomBytes(16).toString('hex')

const Create = async (event: APIGatewayEvent, dbClient: AWS.DynamoDB.DocumentClient) => {
  const { title } = event.body && JSON.parse(event.body)
  const params = {
    TableName: process.env.PRODUCTS_TABLE_NAME || '', // The name of your DynamoDB table
    Item: {
      // Creating an Item with a unique id and with the passed title
      id: generateUUID(),
      title: title,
    },
  }

  try {
    // Utilising the put method to insert an item into the table (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.01)
    await dbClient.put(params).promise()
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    }
    return response // Returning a 200 if the item has been inserted
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    }
  }
}

export default Create
