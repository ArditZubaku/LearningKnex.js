import type {Knex} from "knex";
import {FIELDS, TABLES} from "../src/utils/constants";

export async function up(knex: Knex): Promise<void> {
    // if (!(await knex.schema.hasTable(tables.authors))) {
    await knex.schema.createTable(TABLES.authors, (table) => {
        table.increments(FIELDS.id).primary();
        table.string(FIELDS.name).notNullable();
        table.text(FIELDS.bio).notNullable();
        table.timestamps(true, true);
    });
    // }

    // if (!(await knex.schema.hasTable(tables.genres))) {
    await knex.schema.createTable(TABLES.genres, (table) => {
        table.increments(FIELDS.id).primary();
        table.string(FIELDS.name).notNullable().unique().index();
        table.timestamps(true, true);
    });
    // }

    // if (!(await knex.schema.hasTable(tables.books))) {
    await knex.schema.createTable(TABLES.books, (table) => {
        table.increments(FIELDS.id).primary();
        table.string(FIELDS.title).notNullable().unique().index();
        table.text(FIELDS.description).nullable();
        table.integer(FIELDS.price).notNullable();
        table.integer(FIELDS.author_id).unsigned().references(FIELDS.id).inTable(TABLES.authors).notNullable();
        table.integer(FIELDS.genre_id).references("genres.id").notNullable();
        table.timestamps(true, true);
    });
    // }
}

export async function down(knex: Knex): Promise<void> {
    // await knex.schema
    //     .dropTableIfExists(tables.books)
    //     .dropTableIfExists(tables.genres)
    //     .dropTableIfExists(tables.authors);
    await knex.schema.dropTable(TABLES.books).dropTable(TABLES.genres).dropTable(TABLES.authors);
}
