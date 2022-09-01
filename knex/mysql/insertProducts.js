import options from "../options/mysql.js";
import knex from "knex";

const db = knex(options);

const products = [
    {
        pid: 1,
        title: "Product 1",
        price: 100,
        description: "This is product 1"
    },
    {
        pid: 2,
        title: "Product 2",
        price: 200,
        description: "This is product 2"
    },
    {
        pid: 3,
        title: "Product 3",
        price: 300,
        description: "This is product 3"
    }
]


db("products").insert(products).then(() => {
    console.log("Products inserted");
}
).catch((err) => {
    console.log(err);
}
).finally(() => {
    db.destroy();
}
);

