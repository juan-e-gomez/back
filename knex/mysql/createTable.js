import options from "../options/mysql.js";
import knex from "knex";

const db = knex(options);

db.schema.createTable("products", (table) => {
    table.primary("pid");
    table.increments("pid");
    table.string("title",30).nullable(false);
    table.float("price").nullable(false);
    table.string("description",30).nullable(false);
}).then(() => {
    console.log("Products table created.");
}).catch((err) => {
    console.log(err);
}).finally(() => {
    db.destroy();
}
);
