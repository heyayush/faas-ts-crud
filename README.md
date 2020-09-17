# faas-ts-crud

CRUD operations with lambda functions in typescript

netlify-lambda is a tool for locally emulating the serverless function for development and for bundling our serverless function with third party npm modules

Simulate our function endpoints locally by using proxy for webpack

in package.json add

```json
{
  "name": "react-lambda",
  ...
  "proxy": {
    "/.netlify/functions": {
      "target": "http://localhost:9000",
      "pathRewrite": {
        "^/\\.netlify/functions": ""
      }
    }
  }
}
```

## Target

    GET /books
    POST /books
    GET /books/{id}
    PUT /books/{id}
    DELETE /books/{id}


    Set up credentials on AWS

    references
    https://medium.com/avmconsulting-blog/how-to-build-a-serverless-api-with-dynamodb-aws-lambda-and-api-gateway-d61ac63c27dd

At a high level, netlify-lambda takes a source folder (e.g. src/lambda, specified in your command) and outputs it to a built folder, (e.g. built-lambda, specified in your netlify.toml file).

Netlify-lambda vs Netlify dev

Netlify-lambda

- Uses webpack and babel
- Bundles functions and their dependencies as a single js file.
- Use netlify-lambda only if you need a build step. Here we need a build step to convert ts to js.

Netlify dev

- Suitable approach for deploying function as a zip instead of single js file.

Build and Deploy Challenges
https://github.com/liady/webpack-node-externals
to exclude node modules in webpack
https://github.com/netlify/netlify-lambda/issues/112
https://github.com/netlify/netlify-lambda#webpack-configuration

with the webpack-node-externals use, size of single js file output from webpack bundle of products function reduced from 5mb to 6kb

Solution 1-

1. compile ts to js with tsc
2. copy all package.json from src/** to functions/** respectively
3. run yarn in each functions/\*\* folder having package.json to install the node modules
4. use netlify-dev command `netlify functions:build --src functions` to build

Solution 2-
use netlify-lambda with webpack-node-externals to output a single js file and then use netlify dev to bundle that along with node modules as a zip

## S3

When you create a presigned URL for your object, you must provide your security credentials, specify a bucket name, an object key, specify the HTTP method (GET to download the object) and expiration date and time. The presigned URLs are valid only for the specified duration.

### using presigned url to access the files

FE will make a req to get signed urls lambda function will return those signed urls
FE will make a `PUT` req to upload file with that signed url
FE sends the file id to back-end for receiving that file

### Image optimization on S3 buckets.

If an image is uploaded then a lambda function is automatically triggered which will compress that image.
