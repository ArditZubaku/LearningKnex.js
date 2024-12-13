interface Base {
    id: number;
    created_at: Date;
    updated_at: Date;
}

export interface Author extends Base {
    name: string;
    bio: string;
}

export interface Genre extends Base {
    name: string;
}

export interface Book extends Base {
    title: string;
    description: string;
    price: number;
    author_id: number;
    genre_id: number;
}

declare module "knex/types/tables" {
    // There already is a Tables interface in the knex/types/tables module
    // We are extending it (TS will merge it) to include our custom tables
    interface Tables {
        authors: Author;
        genres: Genre;
        books: Book;
    }
}
