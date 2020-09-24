"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slugify_1 = __importDefault(require("slugify"));
const uuid_1 = require("uuid");
const Create = async (event, dbClient, headers) => {
    const { name } = event.body && JSON.parse(event.body);
    const slugifyOptions = {
        lower: true,
        strict: true,
        replacement: '-',
    };
    const sanitizedName = name.replace(/[^a-zA-Z0-9 ]/g, '');
    const url = slugify_1.default(sanitizedName, slugifyOptions); // TODO: check if this url is unique
    const params = {
        TableName: process.env.PRODUCTS_TABLE_NAME || '',
        Item: {
            // Creating an Item with a unique id and with the passed title
            id: uuid_1.v4(),
            name: sanitizedName,
            url: url,
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
