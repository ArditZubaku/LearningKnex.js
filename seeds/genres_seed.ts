import {Knex} from "knex";
import {faker} from "@faker-js/faker/locale/en";
import {Genre} from "../src/types";

const SEED_COUNT = 10;

const createGenres: () => Partial<Genre> = () => ({
    name: faker.lorem.words(2),
})

export async function seed(knex: Knex): Promise<void> {
    const genres = Array.from({length: SEED_COUNT}, createGenres);
    await knex().table("genres").insert(genres);
}
