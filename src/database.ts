import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

// const POSTGRES_HOST = '127.0.0.1'
// const POSTGRES_DB = 'storefront'
// const POSTGRES_USER = 'storefront_backend'
// const POSTGRES_PASSWORD = 'password'
const {
  ENV,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  POSTGRES_DB_TEST,
} = process.env;

let client;
console.log(ENV);

client = new Pool({
  host: POSTGRES_HOST,
  database: ENV === "test" ? POSTGRES_DB_TEST : POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default client;
