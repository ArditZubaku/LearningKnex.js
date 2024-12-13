import knex from "../config/knex";
import {Author, Book, Genre} from "../types";

export async function getBooksWithAuthorAndGenre(): Promise<(Pick<Book, "id" | "title"> & Pick<Author, "name"> & Pick<Genre, "name">)[]> {
    return knex("books")
        .join("authors", "authors.id", "books.author_id")
        .join("genres", "genres.id", "books.genre_id")
        .select(
            "books.id",
            "books.title",
            "authors.name as author_name",
            "genres.name as genre_name"
        ).limit(10);
}

export async function getTopAuthorsAndBookCount() {
    return knex("authors")
        .join("books", "books.author_id", "authors.id")
        .select("name", knex.raw("count(books.id) as books_count"))
        .groupBy("authors.id")
        .orderBy("books_count", "desc")
        .limit(10) as unknown as (Pick<Author, "name"> & { books_count: number })[];
}
