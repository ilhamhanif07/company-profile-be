"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_promise_1 = __importDefault(require("pg-promise"));
require("dotenv").config();
const connection = process.env.CONNECTION;
const pgp = (0, pg_promise_1.default)();
const connectionString = `postgres://default:${connection}:5432/verceldb?sslmode=require`;
const db = pgp(connectionString);
console.log(connection);
exports.default = db;
//# sourceMappingURL=database.js.map