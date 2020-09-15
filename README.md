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
