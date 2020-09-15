"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Update = exports.ReadAll = exports.Read = exports.Create = void 0;
const create_1 = __importDefault(require("./create"));
exports.Create = create_1.default;
const delete_1 = __importDefault(require("./delete"));
exports.Delete = delete_1.default;
const read_1 = __importDefault(require("./read"));
exports.Read = read_1.default;
const read_all_1 = __importDefault(require("./read-all"));
exports.ReadAll = read_all_1.default;
const update_1 = __importDefault(require("./update"));
exports.Update = update_1.default;
