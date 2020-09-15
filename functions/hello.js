"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
exports.handler = async (event) => {
    var _a;
    const subject = ((_a = event.queryStringParameters) === null || _a === void 0 ? void 0 : _a.name) || 'World';
    return {
        statusCode: 200,
        body: `Hello ${subject}!`,
    };
};
