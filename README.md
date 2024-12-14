# Learning Knex.js

## Description

This project is a TypeScript-based application that uses Knex.js for database operations. It includes functionalities
for managing authors, genres, and books in a PostgreSQL database.

## Prerequisites

- Node.js v18.20.0
- Yarn or npm
- PostgreSQL

## Installation

1. Clone the repository:
    ```sh
    git clone git@github.com:ArditZubaku/LearningKnex.js.git
    cd LearningKnex.js
    ```

2. Install dependencies:
    ```sh
    yarn install
    # or
    npm install
    ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
    ```env
    DB_HOST=<your-database-host>
    DB_PORT=<your-database-port>
    DB_USER=<your-database-user>
    DB_PASSWORD=<your-database-password>
    DB_DATABASE=<your-database-name>
    ```

## Database Setup

1. Run migrations to set up the database schema:
    ```sh
    yarn knex migrate:latest
    # or
    npx knex migrate:latest
    ```

## Usage

### Running the Application

To start the application, use the following command:

```sh
yarn start
# or
npm start
```

## Project Structure

- `src/`: Contains the source code.
    - `config/`: Configuration files.
    - `examples/`: Example query builders.
    - `types/`: Type definitions.
    - `utils/`: Utility functions.
- `migrations/`: Database migration files.
- `.tool-versions`: Specifies the Node.js version.

## Scripts

- `yarn start` / `npm start`: Start the application.
- `yarn migrate:create <name>`: Create a new migration file.
- `yarn migrate:run`: Run database migrations.
- `yarn migrate:rollback` : Rollback the last migration.
- `yarn seed:create <name>` : Create a new seed file.
- `yarn seed:run` : Run seed files.
