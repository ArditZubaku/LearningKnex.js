import {error, log} from "console";
import {onDatabaseConnect} from "./config/knex";
import {getAllAuthors, getAllBooks, getAuthorById} from "./examples/crud";
import {faker} from "@faker-js/faker/locale/en";

onDatabaseConnect()
    .then(async () => {
        log(await getAllAuthors(2, 0));
        log(await getAllBooks(3, 2));
        log(await getAuthorById(faker.number.int({min: 1, max: 100})));
    })
    .catch((err) => error(err));
