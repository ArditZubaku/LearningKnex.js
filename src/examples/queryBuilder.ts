import {Author} from "../types";
import knex from "../config/knex";

export async function getAuthorsPaginated(
    limit: number,
    offset: number
): Promise<{ results: Partial<Author>[], count: number }> {
    // const queryBuilder = knex("authors");
    // queryBuilder.limit(limit);
    // queryBuilder.offset(offset);
    //
    // const secondQueryBuilder = queryBuilder.clone();
    // secondQueryBuilder.clearCounters();
    // secondQueryBuilder.clearSelect();

    // const authors = await knex("authors").limit(limit).offset(offset);
    // const count = Number((await knex("authors").count().first())?.count);

    const queryBuilder = knex("authors").where("name", "ilike", "a%").select("id");
    const authors = await queryBuilder.limit(limit).offset(offset);
    const count = Number((await queryBuilder.clone().clearSelect().count().first())?.count);

    return {
        results: authors,
        count,
    }
}
