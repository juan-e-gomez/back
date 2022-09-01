import knex from 'knex';


const sqliteoptions = {
    client: 'sqlite3',
    connection: {
        filename: './db/ecommerce/chatrroom.sqlite'
    },
    useNullAsDefault: true
};


let db = knex(sqliteoptions) 

try {
    let exists = await db.schema.hasTable('messages');
    if(exists){
        await db('messages').del();
    }
    else{
        await db.schema.createTable('messages', (table) => {
            table.primary('id');
            table.increments('id');
            table.string('author',30).nullable(false);
            table.string('text',30).nullable(false);
        }).then(() => {
            console.log("table created");
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            db.destroy();
        }
        )};
}
catch (err) {
    console.log(err);
}



export default db;