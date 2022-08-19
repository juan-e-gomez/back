import options from "./options/mysql.js";
import knex from "knex";

const db = knex(options);

db.schema.createTable("users", (table) => {
    table.primary("cdid");
    table.increments("id");
    table.string("first_name",30);
    table.string("last_name",30);
    table.integer("age");
}).then(() => {
    console.log("table created");
}).catch((err) => {
    console.log(err);
});