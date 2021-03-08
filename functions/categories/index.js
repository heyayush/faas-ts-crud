"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const methods_1 = require("./methods");
const activeEnv = process.env.ACTIVE_ENV || process.env.NODE_ENV || 'development';
console.log(`Using environment config: '${activeEnv}'`);
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
    path: `.env.${activeEnv}`,
});
const myAWSConfig = new aws_sdk_1.default.Config();
myAWSConfig.update({
    accessKeyId: process.env.AYUSH_ACCESS_KEY_ID,
    secretAccessKey: process.env.AYUSH_SECRET_ACCESS_KEY,
    region: process.env.AYUSH_REGION,
});
// Create the DynamoDB service object
const dbClient = new aws_sdk_1.default.DynamoDB.DocumentClient(myAWSConfig);
const tableName = process.env.CATEGORIES_TABLE_NAME || '';
const allowedOrigins = [
    'https://one-shop.netlify.app',
    'https://www.one-shop.netlify.app',
    'http://one-shop.netlify.app',
    'http://one-shop.netlify.app',
];
const checkLocalhost = (str) => {
    if (str) {
        return str.includes('localhost:');
    }
};
const checkAllowedOrigins = (origin) => {
    const isLocalhost = checkLocalhost(origin);
    const isAllowedOrigin = allowedOrigins.indexOf(origin) > -1;
    return isLocalhost || isAllowedOrigin;
};
exports.handler = (event, _, callback) => {
    const requestOrigin = event.headers.origin || event.headers.host;
    console.log('request from', requestOrigin);
    console.log('method', event.httpMethod);
    if (!checkAllowedOrigins(requestOrigin)) {
        console.error(`Origin ${requestOrigin} is not allowed`);
        callback(null, {
            statusCode: 401,
            body: `This is unauthorized origin ${requestOrigin}`,
            headers: {
                'Content-Type': 'text/plain',
            },
        });
    }
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };
    const path = event.path.replace(/\.netlify\/functions\/[^/]+/, '');
    const segments = path.split('/').filter((e) => e);
    switch (event.httpMethod) {
        case 'GET':
            /* GET /.netlify/functions/api */
            if (segments.length === 0) {
                return methods_1.ReadAll(event, dbClient, tableName, headers);
            }
            /* GET /.netlify/functions/api/123456 */
            if (segments.length === 1) {
                // event.id = segments[0];
                return methods_1.Read(event, dbClient, segments[0], tableName, headers);
            }
            else {
                return {
                    statusCode: 500,
                    body: 'too many segments in GET request',
                    headers,
                };
            }
            break;
        /* POST /.netlify/functions/api */
        case 'POST':
            if (segments.length === 0) {
                return methods_1.Create(event, dbClient, tableName, headers, segments[0]);
            }
            /* GET /.netlify/functions/api/123456 */
            if (segments.length === 1) {
                // event.id = segments[0];
                const { action } = event.body && JSON.parse(event.body);
                switch (action) {
                    case 'UPDATE':
                        return methods_1.Update(event, dbClient, tableName, headers, segments[0]);
                    case 'DELETE':
                        return methods_1.Delete(event, dbClient, tableName, headers, segments[0]);
                    default:
                        return {
                            statusCode: 500,
                            body: '"action" is missing',
                            headers,
                        };
                }
            }
            else {
                return {
                    statusCode: 500,
                    body: 'too many segments in GET request',
                    headers,
                };
            }
            break;
        /* PUT /.netlify/functions/api/123456 */
        case 'PUT':
            return {
                statusCode: 500,
                body: 'PUT request is not allowed',
                headers,
            };
            break;
        /* DELETE /.netlify/functions/api/123456 */
        case 'DELETE':
            return {
                statusCode: 500,
                body: 'DELETE request is not allowed',
                headers,
            };
            // if (segments.length === 1) {
            //   // event.id = segments[0];
            //   return Delete(event, dbClient, tableName, headers, segments[0])
            // } else {
            //   return {
            //     statusCode: 500,
            //     body: 'invalid segments in DELETE request, must be /.netlify/functions/api/123456',
            //     headers,
            //   }
            // }
            break;
        /* Fallthrough case */
        default:
            return {
                statusCode: 500,
                body: 'unrecognized HTTP Method, must be one of GET/POST',
                headers,
            };
    }
};
// 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Content-Length, Authorization, Accept, Cache-Control,  Origin, Referer, X-Api-Key',
