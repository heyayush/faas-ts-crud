"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: Modify Delete to actually add a flag is deleted instead of actually deleting that object.
const Delete = async (event, dbClient, tableName, headers, segment) => {
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
