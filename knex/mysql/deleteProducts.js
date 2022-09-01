import options from "../options/mysql.js";
import knex from "knex";

const db = knex(options);

db("products").where("pid",{pid}).del().then(() => {
    console.log("Product deleted");
}).catch((err) => {
    console.log(err);
}).finally(() => {
    db.destroy();
}
);


