"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
// Generate unique id with no external dependencies
const generateUUID = () => crypto_1.default.randomBytes(16).toString('hex');
const Create = async (event, dbClient) => {
    const { title } = event.body && JSON.parse(event.body);
    const params = {
        TableName: process.env.AWS_PRODUCTS_TABLE_NAME || '',
        Item: {
            // Creating an Item with a unique id and with the passed title
            id: generateUUID(),
            title: title,
        },
    };
    try {
        // Utilising the put method to insert an item into the table (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.01)
        const data = await dbClient.put(params).promise();
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
        return response; // Returning a 200 if the item has been inserted
    }
    catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify(e),
        };
    }
};
exports.default = Create;
