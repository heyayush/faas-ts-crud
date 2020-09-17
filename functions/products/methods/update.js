"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Update = async (event, dbClient, segment) => {
    const id = segment;
    const { title } = event.body && JSON.parse(event.body);
    const params = {
        TableName: process.env.PRODUCTS_TABLE_NAME || '',
        Item: {
            id: id,
            title: title,
        },
    };
    try {
        await dbClient.put(params).promise();
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
        return response;
    }
    catch (e) {
        return {
            statusCode: 500,
        };
    }
};
exports.default = Update;
