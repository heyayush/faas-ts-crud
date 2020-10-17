"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getId_1 = __importDefault(require("../utils/getId"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RESERVED_WORDS = ['new'];
const Create = async (event, dbClient, tableName, headers) => {
    const { name, ...rest } = event.body && JSON.parse(event.body);
    const sanitizedName = name.replace(/[^a-zA-Z0-9 ]/g, '');
    const params = {
        TableName: tableName,
        Item: {
            // Creating an Item with a unique id and with the passed title
            id: getId_1.default(),
            name: sanitizedName,
            ...rest,
        },
    };
    try {
        // Utilising the put method to insert an item into the table (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.01)
        await dbClient.put(params).promise();
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Item),
            headers,
        };
        return response; // Returning a 200 if the item has been inserted
    }
    catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify(e),
            headers,
        };
    }
};
exports.default = Create;
