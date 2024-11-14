import "dotenv/config";
import Knex from "knex";
import { env } from "node:process";

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DEBUG
} = env;

const knex = Knex({
  client: "postgresql",
  connection: {
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    debug: true,
  },
  pool: {
    min: 2,
    max: 10
  }
})

export const onDatabaseConnect = async () => await knex.raw("SELECT 1");

export default knex;

