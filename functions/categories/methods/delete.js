"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Delete = async (event, dbClient, segment, tableName, headers) => {
    const id = segment;
    const params = {
        TableName: tableName,
        Key: { id },
    };
    try {
        await dbClient.delete(params).promise();
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Key),
            headers,
        };
        return response;
    }
    catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify(e),
            headers,
        };
    }
};
exports.default = Delete;
