import options from "../options/mysql.js";
import knex from "knex";

const db = knex(options);

db("users").where("pid",{pid}).update({
    title: "Product 1",
    price: 100,
    description: "This is product 1"
}).then(() => {
    console.log("Product updated");
}).catch((err) => {
    console.log(err);
}).finally(() => {
    db.destroy();
});