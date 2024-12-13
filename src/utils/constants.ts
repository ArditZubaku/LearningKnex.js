export const TABLES = {
    authors: "authors",
    genres: "genres",
    books: "books",
} as const;

export const FIELDS = {
    id: "id",
    name: "name",
    bio: "bio",
    title: "title",
    description: "description",
    price: "price",
    author_id: "author_id",
    genre_id: "genre_id",
} as const;
