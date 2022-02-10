### knex migration

## Create migration
```ts
yarn knex migrate:make create-xxxxx
```
# run migration

```ts
yarn knex migrate:list              //show list
yarn knex migrate:currentVersion    //返回當前版本檔案名
yarn knex migrate:up                //下一個版本  ==  next
yarn knex migrate:up "filename"     //下一個版本  ==  next
yarn knex migrate:down              //上一個版本  ==  back
yarn knex migrate:down  "filename"  //上一個版本  ==  back
yarn knex migrate:rollback          //上一次版本  ==  undo
yarn knex migrate:rollback --all    //返回原始版本
yarn knex migrate:latest            //最新版本    ==  new
```

# knex create table sample
```ts
import { Knex } from "knex";

const tables = Object.freeze({
    usertable:"users",
    filetable:"file_table",
    categorytable:"file_table"
})
const usertable = "user_table";
const filetable = "file_table";
const categorytable = "category_table";




export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(usertable, (table) => {
        // or 
    await knex.schema.createTableIfNotExists(usertable, (table) => {
        table.increments("user_id");
        table.string("username").notNullable();
        table.integer("password").notNullable().unique();
        table.string("level").notNullable();
        table.timestamps(false, true); // => created_at && update_at
    });
    await knex.schema.createTable(categorytable, (table) => {
        table.increments("categorytable_id");
        table.string("name").notNullable();
    });
    await knex.schema.createTable(filetable, (table) => {
        table.increments("file_id");
        table.string("filename").notNullable();
        table.string("content").notNullable();
        table.boolean("isfile").notNullable();
        table.string("category_id").notNullable().unique();
        table.string("user_id").notNullable().unique();
        table.foreign("category_id").references(`${categorytable}.categorytable_id`);
        table.foreign("user_id").references(`${usertable}.user_id`);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(filetable);
    await knex.schema.dropTable(categorytable);
    await knex.schema.dropTable(usertable);
}
```
```sql
DROP TABLE table_name CASCADE
```

## Create seed

yarn knex  seed:make -x ts create-teachers-and-students

# run seed

yarn knex seed:run





