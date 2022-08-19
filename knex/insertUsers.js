import options from "./options/mysql.js";
import knex from "knex";

const db = knex(options);

const users = [
    {
        first_name: "John",
        last_name: "Doe",
        age: 30
    },
    {
        first_name: "Jane",
        last_name: "Doe",
        age: 25
    },
    {
        first_name: "John",
        last_name: "Smith",
        age: 40
    }
];


db("users").insert(users).then(() => {
    console.log("users inserted");
}
).catch((err) => {
    console.log(err);
}
).finally(() => {
    db.destroy();
}
);

