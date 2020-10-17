"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const flatupdateParams_1 = __importDefault(require("../utils/flatupdateParams"));
const Update = async (event, dbClient, tableName, headers) => {
    console.log('update initiated');
    const { id, ...rest } = event.body && JSON.parse(event.body);
    console.log('data received', id, rest);
    // Needs Testing
    const params = {
        TableName: tableName,
        Key: {
            id: id,
        },
        ...flatupdateParams_1.default(rest),
        ReturnValues: 'ALL_NEW',
    };
    dbClient.update(params, function (err, data) {
        if (err) {
            console.log('Error', err);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify(err),
            };
        }
        else {
            console.log('Success', data);
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(data),
            };
        }
    });
};
exports.default = Update;
