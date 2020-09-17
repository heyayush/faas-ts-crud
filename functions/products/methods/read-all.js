"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReadAll = async (event, dbClient) => {
    const params = {
        TableName: process.env.PRODUCTS_TABLE_NAME || '',
    };
    try {
        // Utilising the scan method to get all items in the table
        const data = await dbClient.scan(params).promise();
        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Items),
        };
        return response;
    }
    catch (e) {
        return {
            statusCode: 500,
        };
    }
};
exports.default = ReadAll;
