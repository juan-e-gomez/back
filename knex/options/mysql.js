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


let mysqldb = knex(mysqloptions);

try {
    let exists = await mysqldb.schema.hasTable('products');
    if(exists){
        await mysqldb('products').del();
    }
    else{
        await mysqldb.schema.createTable('products', (table) => {
            table.primary('pid');
            table.increments('pid');
            table.string('title',30);
            table.float('price');
            table.string('description',30);
        }).then(() => {
            console.log("Products table created.");
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            mysqldb.destroy();
        }
        )}
}
catch (err) {
    console.log(err);
}


export default mysqldb;