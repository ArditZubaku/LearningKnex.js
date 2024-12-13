import type {Knex} from "knex";

const tables = {
    authors: "authors",
    genres: "genres",
    books: "books",
} as const;

const fields = {
    id: "id",
    name: "name",
    bio: "bio",
    title: "title",
    description: "description",
    price: "price",
    author_id: "author_id",
    genre_id: "genre_id",
} as const;

export async function up(knex: Knex): Promise<void> {
    // if (!(await knex.schema.hasTable(tables.authors))) {
    await knex.schema.createTable(tables.authors, (table) => {
        table.increments(fields.id).primary();
        table.string(fields.name).notNullable();
        table.text(fields.bio).notNullable();
        table.timestamps(true, true);
    });
    // }

    // if (!(await knex.schema.hasTable(tables.genres))) {
    await knex.schema.createTable(tables.genres, (table) => {
        table.increments(fields.id).primary();
        table.string(fields.name).notNullable().unique().index();
        table.timestamps(true, true);
    });
    // }

    // if (!(await knex.schema.hasTable(tables.books))) {
    await knex.schema.createTable(tables.books, (table) => {
        table.increments(fields.id).primary();
        table.string(fields.title).notNullable().unique().index();
        table.text(fields.description).nullable();
        table.integer(fields.price).notNullable();
        table.integer(fields.author_id).unsigned().references(fields.id).inTable(tables.authors).notNullable();
        table.integer(fields.genre_id).references("genres.id").notNullable();
        table.timestamps(true, true);
    });
    // }
}

export async function down(knex: Knex): Promise<void> {
    // await knex.schema
    //     .dropTableIfExists(tables.books)
    //     .dropTableIfExists(tables.genres)
    //     .dropTableIfExists(tables.authors);
    await knex.schema.dropTable(tables.books).dropTable(tables.genres).dropTable(tables.authors);
}
