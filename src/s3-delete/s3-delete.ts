import AWS from 'aws-sdk'
import { APIGatewayEvent, Context, Callback } from 'aws-lambda'
import crypto from 'crypto'
import { OutgoingHttpHeaders } from 'http'

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
const s3Client = new AWS.S3(myAWSConfig)

const allowedOrigins = [
  'https://one-shop.netlify.app',
  'https://www.one-shop.netlify.app',
  'http://one-shop.netlify.app',
  'http://one-shop.netlify.app',
  'http://faas-ts-crud.netlify.app',
  'https://faas-ts-crud.netlify.app',
  'faas-ts-crud.netlify.app',
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

const deleteObject = async (_: APIGatewayEvent, headers: OutgoingHttpHeaders, s3Client: AWS.S3, id: string) => {
  const params = {
    Bucket: process.env.ASSETS_BUCKET_NAME || '', // Name of your S3 bucket
    Key: id, // Filename
  }
  try {
    // Generating a preSignedUrl for a putObject
    const deleteResponse = await s3Client.deleteObject(params, (err, data) => {
      if (err) {
        console.log('error in deletion', err)
      } else {
        console.log('data is', data)
      }
    })
    const response = {
      statusCode: 200,
      headers,
      body: JSON.stringify({ deleteResponse: deleteResponse }),
    }
    return response
  } catch (e) {
    return {
      statusCode: 500,
      headers,
    }
  }
}

// TODO: multiple signed urls for multiple uploads
// const GetSignedUrls = async () => {}

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

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': requestOrigin,
  }

  const path = event.path.replace(/\.netlify\/functions\/[^/]+/, '')
  const segments = path.split('/').filter((e) => e)

  switch (event.httpMethod) {
    case 'DELETE':
      if (segments.length === 1) {
        const { objectId } = event.body && JSON.parse(event.body)
        return deleteObject(event, headers, s3Client, objectId)
      }
      /* GET /.netlify/functions/api/123456 */
      //   if (segments.length === 1) {
      //     // event.id = segments[0];
      //     return GetSignedUrls(event, dbClient, segments[0])
      //   }
      else {
        return {
          statusCode: 500,
          headers,
          body: 'Oops something went wrong',
        }
      }
      break
    /* Fallthrough case */
    default:
      return {
        statusCode: 500,
        headers,
        body: 'unrecognized HTTP Method, must be a POST request',
      }
  }
}
