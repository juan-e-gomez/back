import options from "./options/mysql.js";
import knex from "knex";


export default class ChatManager {

    constructor() {
        this.path = path;
        const db = knex(options);
    }

    createTable = async() => {
        db.schema.createTable("messages", (table) => {
            table.primary("id");
            table.increments("id");
            table.string("author",30);
            table.string("text",30);
        }).then(() => {
            console.log("table created");
        }).catch((err) => {
            console.log(err);
        });}

    
    insertMessage = async(message) => {
        db("messages").insert(messages).then(() => {
            console.log("messages inserted");
        }
        ).catch((err) => {
            console.log(err);
        }
        ).finally(() => {
            db.destroy();
        }
        )};

    getMessages = async() => {
        try{
            let messages = await db("messages").select();
            return messages;
        }catch(error){
            console.log(error);
        }
    }
}



