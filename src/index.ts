import {error, log} from "console";
import {onDatabaseConnect} from "./config/knex";
import {createAuthor, createBook, createGenre, getAllAuthors, getAllBooks, getAuthorById} from "./examples/crud";
import {faker} from "@faker-js/faker/locale/en";
import {randomUUID} from "node:crypto";

onDatabaseConnect()
    .then(async () => {
        log(await getAllAuthors(2, 0));
        log(await getAllBooks(3, 2));
        log(await getAuthorById(faker.number.int({min: 1, max: 100})));
        log(await createAuthor({name: faker.person.firstName("male"), bio: faker.person.bio()}))
        log(await createGenre({name: faker.book.genre() + randomUUID()}));
        log(await createBook({
            title: faker.book.title(),
            price: faker.number.int({max: 10_000}),
            description: faker.lorem.paragraph(3),
            genre_id: 10,
            author_id: 10,
        }))
    })
    .catch((err) => error(err));
