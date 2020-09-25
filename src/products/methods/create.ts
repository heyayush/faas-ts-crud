import AWS from 'aws-sdk'
import { APIGatewayEvent } from 'aws-lambda'
import { OutgoingHttpHeaders } from 'http'
import slugify from 'slugify'
import { v4 as uuidv4 } from 'uuid'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RESERVED_WORDS = ['new']

const Create = async (
  event: APIGatewayEvent,
  dbClient: AWS.DynamoDB.DocumentClient,
  tableName: string,
  headers: OutgoingHttpHeaders
) => {
  const { name, category, primaryImage, pics, description, price } = event.body && JSON.parse(event.body)
  const slugifyOptions = {
    lower: true,
    strict: true,
    replacement: '-',
  }
  const sanitizedName = name.replace(/[^a-zA-Z0-9 ]/g, '')
  const url = slugify(sanitizedName, slugifyOptions) // TODO: check if this url is unique and is not one of reserved words

  const params = {
    TableName: tableName, // The name of your DynamoDB table
    Item: {
      // Creating an Item with a unique id and with the passed title
      id: uuidv4(),
      name: sanitizedName,
      url,
      category,
      primaryImage,
      pics,
      description,
      price,
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
