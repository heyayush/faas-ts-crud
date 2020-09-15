// functions/hello.js
import { APIGatewayEvent } from 'aws-lambda'

export const handler = async (event: APIGatewayEvent) => {
    const subject = event.queryStringParameters?.name || 'World'
  
    return {
      statusCode: 200,
  
      body: `Hello ${subject}!`,
    }
  }
  
