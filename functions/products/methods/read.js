"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Read = async (event, dbClient, segment, headers) => {
    const id = segment;
    const params = {
        TableName: process.env.PRODUCTS_TABLE_NAME || '',
        Key: { id },
    };
    try {
        // Utilising the get method to retrieve an indvidual item
        const data = await dbClient.get(params).promise();
        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Item),
            headers,
        };
        return response;
    }
    catch (e) {
        return {
            statusCode: 500,
            headers,
        };
    }
};
exports.default = Read;
// Test Data
// {
//     "pathParameters": {
//       "id": "a4850b12819e5f92c216222d51757378"
//     }
//   }
