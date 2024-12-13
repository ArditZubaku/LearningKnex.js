import {Author, Book} from "../types";
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

