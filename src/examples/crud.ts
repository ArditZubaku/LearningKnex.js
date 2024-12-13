import {Author, Book, Genre} from "../types";
import knex from "../config/knex";

export const getAllAuthors = async (limit: number, offset: number): Promise<Author[]> => {
    // return knex("authors").select("*");
    // return knex("authors").orderBy("created_at", "desc");
    return knex("authors").orderBy("created_at", "desc").limit(limit).offset(offset);
}

export async function getAllBooks(limit: number, offset: number): Promise<Book[]> {
    return knex("books").limit(limit).offset(offset).orderBy("created_at", "desc");
}

export async function getAuthorById(id: number): Promise<Author | undefined> {
    // return knex("authors").where("id", "=", id).first();
    return knex("authors").where({id}).first();
}

export async function getGenreById(id: number) {
    return knex("genres").where({id}).first();
}

export async function getBookById(id: number) {
    return knex("books").where({id}).first();
}

export async function createAuthor({name, bio}: Partial<Author>): Promise<Pick<Author, "id" | "name"> | undefined> {
    // return knex("authors").insert({name, bio}, "*").first();
    return knex("authors").insert({name, bio}, ["id", "name"]);
}

export async function createGenre(genre: Partial<Genre>) {
    // return knex("genres").insert(genre, "*");
    // return knex("genres").insert(genre, "*").returning("*").then(rows => rows[0]);
    return (await knex("genres").insert(genre, "*")).at(0);
}

async function checkIfAuthorExists(id?: number) {
    if (!id) throw new Error("Author ID is required!");

    const t1 = performance.now();
    const author = await getAuthorById(id);
    const t2 = performance.now();
    console.log("This query took: ", t2 - t1, "ms");
    if (!author) throw new Error("Invalid ID!");
}

async function checkIfGenreExists(id?: number) {
    if (!id) throw new Error("Genre ID is required!");

    const genre = await getGenreById(id);
    if (!genre) throw new Error("Invalid ID");
}

async function checkIfBooksExists(id?: number) {
    if (!id) throw new Error("Book ID is required!");

    const book = await getBookById(id);
    if (!book) throw new Error("Invalid ID");
}

export async function createBook(book: Partial<Book>): Promise<Book | undefined> {
    await Promise.all([checkIfAuthorExists(book.author_id), checkIfGenreExists(book.genre_id)]);
    return (await knex("books").insert(book, "*")).at(0);
}

export async function updateAuthorById(id: number, newAuthor: Partial<Author>): Promise<Author | undefined> {
    await checkIfAuthorExists(id);
    // return (await knex("authors").update(newAuthor).where({id}).returning("*")).at(0);
    return (await knex("authors").where({id}).update(newAuthor, "*")).at(0);
}

export async function updateBookById(id: number, newBook: Partial<Book>): Promise<Book | undefined> {
    if (newBook.author_id) {
        await checkIfAuthorExists(newBook.author_id);
    }
    if (newBook.genre_id) {
        await checkIfGenreExists(newBook.genre_id);
    }
    await checkIfBooksExists(id);
    return (await knex("books").where({id}).update(newBook).returning("*")).at(0);
}
