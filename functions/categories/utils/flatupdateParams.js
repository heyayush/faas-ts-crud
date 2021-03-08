"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flatUpdateParams = (params) => ({
    UpdateExpression: Object.values(params).includes(null) ? withNull(params) : withoutNull(params),
    ExpressionAttributeNames: Object.entries(params)
        .filter(([key, value]) => value !== null)
        .map(([key, value]) => key)
        .reduce((acc, key) => ({
        ...acc,
        [`#${key}`]: key,
    }), {}),
    ExpressionAttributeValues: Object.entries(params)
        .filter(([key, value]) => value !== null)
        .reduce((acc, [key, value]) => ({
        ...acc,
        [`:${key}`]: value,
    }), {}),
});
const withNull = (params) => `SET ${Object.entries(params)
    .filter(([key, value]) => value !== null)
    .map(([key]) => `#${key} = :${key}, `)
    .reduce((acc, str) => acc + str)
    .slice(0, -2)} REMOVE ${Object.entries(params) // This is to remove trailing comma and space
    .filter(([key, value]) => value === null)
    .map(([key]) => `${key} `)
    .reduce((acc, str) => acc + str, '')
    .slice(0, -1)}`;
const withoutNull = (params) => `SET ${Object.entries(params)
    .filter(([key, value]) => value !== null)
    .map(([key]) => `#${key} = :${key}, `)
    .reduce((acc, str) => acc + str, '')
    .slice(0, -2)}`;
exports.default = flatUpdateParams;
