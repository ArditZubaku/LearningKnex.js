import {Knex} from "knex";
import {Book} from "../src/types";
import {faker} from "@faker-js/faker/locale/en";
import {randomUUID} from "node:crypto";

const SEED_COUNT = 200;

const createBook = (totalAuthors: number, totalGenres: number): Partial<Book> => ({
    title: faker.book.title() + "-" + randomUUID(),
    description: faker.lorem.paragraph(3),
    price: faker.number.int({min: 100, max: 1000}),
    author_id: faker.number.int({min: 1, max: totalAuthors}),
    genre_id: faker.number.int({min: 1, max: totalGenres}),
});

export async function seed(knex: Knex): Promise<void> {
    const authorsCount = (await knex("authors").count().first())?.count;
    const genresCount = (await knex("genres").count().first())?.count;

    console.log("Authors count:", authorsCount);
    console.log("Genres count:", genresCount);

    if (!authorsCount || !genresCount) {
        throw new Error("You need to seed authors and genres first");
    }

    const books = Array.from({length: SEED_COUNT}, () => createBook(Number(authorsCount), Number(genresCount)));
    try {
        // Knex gives you wrong type for insert method, so you need to cast it
        const inserted = await knex("books").insert(books) as { rowCount: number };
        console.log("Inserted", inserted?.rowCount, "books");
    } catch (e) {
        console.error(e);
        if ((e as { constraint?: string }).constraint === "books_title_unique") {
            console.error("Some books already exist in the database");
        }
    }
}
