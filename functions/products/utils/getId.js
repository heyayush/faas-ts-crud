"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const getId = () => `faas-${uuid_1.v4()}`;
exports.default = getId;
