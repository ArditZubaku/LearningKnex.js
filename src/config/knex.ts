import "dotenv/config";
import Knex from "knex";
import config from "../../knexfile";

const knex = Knex(config.development)

export const onDatabaseConnect = async () => await knex.raw("SELECT 1");

export default knex;

