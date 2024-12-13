import "dotenv/config";
import type {Knex} from "knex";
import {env} from "node:process";

// Update with your config settings.

const {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE,
} = env;

const pgConfig: Knex.Config = {
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
    },
    migrations: {
        tableName: "knex_migrations",
        directory: "./migrations",
    }
}

const config: { [key: string]: Knex.Config } = {
    development: pgConfig,
    staging: pgConfig,
    production: pgConfig,
};

export default config;
