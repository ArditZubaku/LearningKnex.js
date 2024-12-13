import {Knex} from "knex";
import {faker} from "@faker-js/faker/locale/en";
import {Author} from "../src/types";

// Knex runs seeds in alphabetical order, so this seed will run firs because of the number in the filename

const SEED_COUNT = 100;

const createAuthor: () => Partial<Author> = () => ({
    name: faker.person.firstName("male"),
    bio: faker.person.bio(),
})

export async function seed(knex: Knex): Promise<void> {
    const authors = Array.from({length: SEED_COUNT}, createAuthor);
    await knex("authors").insert(authors);
}
