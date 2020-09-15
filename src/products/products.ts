import AWS from 'aws-sdk'
import { APIGatewayEvent, Context, Callback } from 'aws-lambda'
import { Create, Read, ReadAll, Update, Delete } from './methods'

const activeEnv = process.env.ACTIVE_ENV || process.env.NODE_ENV || 'development'

console.log(`Using environment config: '${activeEnv}'`)

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: `.env.${activeEnv}`,
})

const myAWSConfig = new AWS.Config()
myAWSConfig.update({
  accessKeyId: process.env.AYUSH_ACCESS_KEY_ID,
  secretAccessKey: process.env.AYUSH_SECRET_ACCESS_KEY,
  region: process.env.AYUSH_REGION,
})

// Create the DynamoDB service object
const dbClient = new AWS.DynamoDB.DocumentClient(myAWSConfig)

const allowedOrigins = [
  'https://heyayush.com',
  'https://www.heyayush.com',
  'http://heyayush.com',
  'http://heyayush.com',
]

const checkLocalhost = (str: string) => {
  if (str) {
    return str.includes('localhost:')
  }
}

const checkAllowedOrigins = (origin: string) => {
  const isLocalhost = checkLocalhost(origin)
  const isAllowedOrigin = allowedOrigins.indexOf(origin) > -1
  return isLocalhost || isAllowedOrigin
}

export const handler = (event: APIGatewayEvent, _: Context, callback: Callback) => {
  const requestOrigin = event.headers.origin || event.headers.host

  if (!checkAllowedOrigins(requestOrigin)) {
    console.error('Origin not allowed')
    callback(null, {
      statusCode: 401,
      body: 'Unauthorized origin',
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }

  // const headers = {
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Origin': requestOrigin,
  // }

  const path = event.path.replace(/\.netlify\/functions\/[^/]+/, '')
  const segments = path.split('/').filter((e) => e)

  switch (event.httpMethod) {
    case 'GET':
      /* GET /.netlify/functions/api */
      if (segments.length === 0) {
        return ReadAll(event, dbClient)
      }
      /* GET /.netlify/functions/api/123456 */
      if (segments.length === 1) {
        // event.id = segments[0];
        return Read(event, dbClient, segments[0])
      } else {
        return {
          statusCode: 500,
          body: 'too many segments in GET request',
        }
      }
      break
    /* POST /.netlify/functions/api */
    case 'POST':
      return Create(event, dbClient)
      break
    /* PUT /.netlify/functions/api/123456 */
    case 'PUT':
      if (segments.length === 1) {
        // event.id = segments[0];
        return Update(event, dbClient, segments[0])
      } else {
        return {
          statusCode: 500,
          body: 'invalid segments in POST request, must be /.netlify/functions/api/123456',
        }
      }
      break
    /* DELETE /.netlify/functions/api/123456 */
    case 'DELETE':
      if (segments.length === 1) {
        // event.id = segments[0];
        return Delete(event, dbClient, segments[0])
      } else {
        return {
          statusCode: 500,
          body: 'invalid segments in DELETE request, must be /.netlify/functions/api/123456',
        }
      }
      break
    /* Fallthrough case */
    default:
      return {
        statusCode: 500,
        body: 'unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE',
      }
  }
}
