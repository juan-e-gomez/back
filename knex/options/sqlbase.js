import knex from 'knex';

const mysqloptions = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'mibase'
    }
};



const sqliteoptions = {
    client: 'sqlite3',
    connection: {
        filename: './mibase.sqlite'
    },
    useNullAsDefault: true
};



let db = knex(sqliteoptions) 
try {
    let exists = await db.schema.hasTable('users');
    if(exists){
        await db('users').del();
    }
    else{
        await db.schema.createTable('users', (table) => {
            table.primary('id');
            table.increments('id');
            table.string('first_name',30).nullable(false);
            table.string('last_name',30).nullable(false);
            table.integer('age').nullable(false); 
        });
    }
}
catch (err) {
    console.log(err);
}


export default db;