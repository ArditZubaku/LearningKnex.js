import knex from "../config/knex";
import {Author} from "../types";

export async function getLastAuthor(): Promise<Author | undefined> {
    return knex("authors").orderBy("created_at", "desc").first();
}

export async function createAuthorWithBook() {
    try {
        await knex.transaction(
            async (trx) => {
                const author = (
                    await trx("authors").insert({
                        name: "Transaction author",
                        bio: "Transaction bio",
                    }).returning("*")
                ).at(0);
                await trx("books").insert({
                    title: "Transaction title",
                    description: "Transaction description",
                    price: 10_000,
                    author_id: author?.id
                });
                console.log("Author and book created!");
            })
    } catch (e) {
        console.error("Error during transaction ", e);
    }
}
