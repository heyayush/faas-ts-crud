"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Delete = async (event, dbClient, segment) => {
    const id = segment;
    const params = {
        TableName: process.env.PRODUCTS_TABLE_NAME || '',
        Key: { id },
    };
    try {
        await dbClient.delete(params).promise();
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Key),
        };
        return response;
    }
    catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify(e),
        };
    }
};
exports.default = Delete;
