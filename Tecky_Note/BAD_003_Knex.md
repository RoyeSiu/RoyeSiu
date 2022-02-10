### 3. Installation knex

### 3.1 `knex`

```bash
yarn add knex @types/knex pg @types/pg
```

### 3.2 Initialization

### 2.1. `init`

```
yarn knex init -x ts
```

It is going to generate a file called `knexfile.ts`. The content should be as follow:

### 2.1.1. `knexfile.ts`

```typescript
// Update with your config settings.

import dotenv from "dotenv"
dotenv.config();

module.exports = {
  development: {
    debug: true,
    client: "postgresql",
    connection: {
        database: process.env.DB_NAME,
        user:     process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
        database: process.env.DB_NAME,
        user:     process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
        database: process.env.DB_NAME,
        user:     process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
```
