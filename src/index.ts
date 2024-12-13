import {error, log} from "console";
import {onDatabaseConnect} from "./config/knex";
import {
    createAuthor,
    createBook,
    createGenre,
    deleteAuthorById,
    deleteBookById,
    getAllAuthors,
    getAllBooks,
    getAuthorById,
    updateAuthorById,
    updateBookById
} from "./examples/crud";
import {faker} from "@faker-js/faker/locale/en";
import {randomUUID} from "node:crypto";
import {getTopAuthorsAndBookCount, getBooksWithAuthorAndGenre} from "./examples/relations";

const randomId = () => faker.number.int({min: 1, max: 100});

onDatabaseConnect()
    .then(async () => {
        // log(await getAllAuthors(2, 0));
        // log(await getAllBooks(3, 2));
        // log(await getAuthorById(randomId()));
        // log(await createAuthor({name: faker.person.firstName("male"), bio: faker.person.bio()}))
        // log(await createGenre({name: faker.book.genre() + randomUUID()}));
        // log(await createBook({
        //     title: faker.book.title(),
        //     price: faker.number.int({max: 10_000}),
        //     description: faker.lorem.paragraph(3),
        //     genre_id: 10,
        //     author_id: 10,
        // }));
        // log(await updateAuthorById(
        //     randomId(),
        //     {
        //         name: faker.person.firstName("male"),
        //         bio: faker.person.bio()
        //     }));
        // log(await updateBookById(
        //     randomId(),
        //     {
        //         title: faker.book.title(),
        //         price: faker.number.int({max: 10_000}),
        //         description: faker.lorem.paragraph(3),
        //         genre_id: randomId(),
        //         author_id: randomId(),
        //     }))
        // log(await deleteAuthorById(randomId()));
        // log(await deleteBookById(randomId()));
        // log(await getBooksWithAuthorAndGenre());
        log(await getTopAuthorsAndBookCount());
    })
    .catch((err) => error(err));
