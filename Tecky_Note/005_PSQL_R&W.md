## 1.2. `npm install xlsx`

[https://github.com/SheetJS/sheetjs/tree/master/demos/typescript](https://github.com/SheetJS/sheetjs/tree/master/demos/typescript)

## 2. `Development`

- `.env`

```yaml
DB_NAME=Name_of_DataBase
DB_USERNAME=DataBase_UserName
DB_PASSWORD=DataBase_Password
```

## 2.1 `npm i pg @types/pg`
## 2.2 `npm i dotenv @types/dotenv`

- `main.ts`
```typescript
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();


const client = new pg.Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
})

async function main(){
    const user = {
        username:"gordon",
        password:"tecky"
    };
    await client.connect() // "dial-in" to the postgres server
    await client.query('INSERT INTO users (username,password) values ($1,$2)', [user.username,user.password]) 

    const result = await client.query('SELECT * from users where username = $1',['gordon']);
    console.log(result.rows[0].username) // gordon
    await client.end() // close connection with the database
}
main();
```