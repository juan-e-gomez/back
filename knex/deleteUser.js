import options from "./options/mysql.js";
import knex from "knex";

const db = knex(options);

db("users").where("last_name", "Doe").del().then(() => {
    console.log("user deleted");
}
).catch((err) => {
    console.log(err);
}
).finally(() => {
    db.destroy();
}
);
