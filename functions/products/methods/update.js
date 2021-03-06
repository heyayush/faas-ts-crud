"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const flatupdateParams_1 = __importDefault(require("../utils/flatupdateParams"));
const Update = async (event, dbClient, tableName, headers, segment) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, action, ...rest } = event.body && JSON.parse(event.body);
    // Needs Testing
    const params = {
        TableName: tableName,
        Key: {
            id: segment,
        },
        ...flatupdateParams_1.default(rest),
        ReturnValues: 'ALL_NEW',
    };
    try {
        const updatedData = await dbClient.update(params).promise();
        const response = {
            statusCode: 200,
            headers,
            body: JSON.stringify(updatedData),
        };
        return response;
    }
    catch (err) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify(err),
        };
    }
};
exports.default = Update;
