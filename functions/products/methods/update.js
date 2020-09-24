"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Update = async (event, dbClient, segment, tableName, headers) => {
    const id = segment;
    const { label, url } = event.body && JSON.parse(event.body);
    const params = {
        TableName: tableName,
        Item: {
            id: id,
            name: label,
            url: url,
        },
    };
    try {
        await dbClient.put(params).promise();
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Item),
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
exports.default = Update;
