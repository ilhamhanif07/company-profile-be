import promise from "pg-promise";
require("dotenv").config();

const connection = process.env.CONNECTION;
const pgp = promise();
const connectionString = `postgres://default:${connection}:5432/verceldb?sslmode=require`;
const db = pgp(connectionString);

console.log(connection);

export default db;
