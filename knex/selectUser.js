import options from "./options/mysql.js";
import knex from "knex";
import { diskStorage } from "multer";

const db = knex(options);

db("users").select('*').then(result=>{
    console.log(JSON.parse(JSON.stringify(result)));
}
).catch((err) => {
    console.log(err);
}
).finally(() => {
    db.destroy();
}
);

