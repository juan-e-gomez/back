import options from "./options/mysql.js";
import knex from "knex";

const db = knex(options);

db("users").where("id", 1).update({
    first_name: "John",
    last_name: "Updated",
    age: 30
}).then(() => {
    console.log("user updated");
}
).catch((err) => {
    console.log(err);
}
).finally(() => {
    db.destroy();
}
);

