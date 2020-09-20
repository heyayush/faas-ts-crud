import AWS from 'aws-sdk'
import { APIGatewayEvent } from 'aws-lambda'
import { OutgoingHttpHeaders } from 'http'

const ReadAll = async (event: APIGatewayEvent, dbClient: AWS.DynamoDB.DocumentClient, headers: OutgoingHttpHeaders) => {
  const params = {
    TableName: process.env.PRODUCTS_TABLE_NAME || '', // The name of your DynamoDB table
  }
  try {
    // Utilising the scan method to get all items in the table
    const data = await dbClient.scan(params).promise()

    const response = {
      statusCode: 200,
      body: JSON.stringify(data.Items),
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

export default ReadAll
