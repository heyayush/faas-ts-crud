"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReadAll = async (event, dbClient, headers) => {
    const params = {
        TableName: process.env.PRODUCTS_TABLE_NAME || '',
    };
    try {
        // Utilising the scan method to get all items in the table
        const data = await dbClient.scan(params).promise();
        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Items),
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
exports.default = ReadAll;
