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
const allowedOrigins = [
    'https://heyayush.com',
    'https://www.heyayush.com',
    'http://heyayush.com',
    'http://heyayush.com',
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
    if (!checkAllowedOrigins(requestOrigin)) {
        console.error('Origin not allowed');
        callback(null, {
            statusCode: 401,
            body: 'Unauthorized origin',
            headers: {
                'Content-Type': 'text/plain',
            },
        });
    }
    const responseHeaders = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': requestOrigin,
    };
    const path = event.path.replace(/\.netlify\/functions\/[^/]+/, '');
    const segments = path.split('/').filter((e) => e);
    switch (event.httpMethod) {
        case 'GET':
            /* GET /.netlify/functions/api */
            if (segments.length === 0) {
                return methods_1.ReadAll(event, dbClient, responseHeaders);
            }
            /* GET /.netlify/functions/api/123456 */
            if (segments.length === 1) {
                // event.id = segments[0];
                return methods_1.Read(event, dbClient, segments[0], responseHeaders);
            }
            else {
                return {
                    statusCode: 500,
                    body: 'too many segments in GET request',
                    responseHeaders,
                };
            }
            break;
        /* POST /.netlify/functions/api */
        case 'POST':
            return methods_1.Create(event, dbClient, responseHeaders);
            break;
        /* PUT /.netlify/functions/api/123456 */
        case 'PUT':
            if (segments.length === 1) {
                // event.id = segments[0];
                return methods_1.Update(event, dbClient, segments[0], responseHeaders);
            }
            else {
                return {
                    statusCode: 500,
                    body: 'invalid segments in POST request, must be /.netlify/functions/api/123456',
                    responseHeaders,
                };
            }
            break;
        /* DELETE /.netlify/functions/api/123456 */
        case 'DELETE':
            if (segments.length === 1) {
                // event.id = segments[0];
                return methods_1.Delete(event, dbClient, segments[0], responseHeaders);
            }
            else {
                return {
                    statusCode: 500,
                    body: 'invalid segments in DELETE request, must be /.netlify/functions/api/123456',
                    responseHeaders,
                };
            }
            break;
        /* Fallthrough case */
        default:
            return {
                statusCode: 500,
                body: 'unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE',
                responseHeaders,
            };
    }
};
