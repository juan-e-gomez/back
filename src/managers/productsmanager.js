import mysqldb from "../../knex/options/mysql.js";


class ProductsManager {
    constructor() {
        this.mysqldb = mysqldb;
    }
    // create product table in mysql db
    createTable() {
        this.mysqldb.schema.createTable("products", (table) => {
            table.primary("pid");
            table.increments("pid");
            table.string("title",30).nullable(false);
            table.float("price").nullable(false);
            table.string("description",30).nullable(false);
        }).then(() => {
            console.log("Products table created.");
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            this.mysqldb.destroy();
        }
        );
    }
    // insert product into mysql db
    insertProduct(product) {
        this.mysqldb("products").insert({
            title: product.title,
            price: product.price,
            description: product.description
        }).then(() => {
            console.log("Product inserted");
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            this.db.destroy();
        }
        );
    }
    // update product in mysql db
    updateProduct(pid, product) {
        this.mysqldb("products").where("pid",{pid}).update({
            title: product.title,
            price: product.price,
            description: product.description
        }).then(() => {
            console.log("Product updated");
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            this.mysqldb.destroy();
        }
        );
    }
    // delete product from mysql db
    deleteProduct(pid) {
        this.mysqldb("products").where("pid",{pid}).del().then(() => {
            console.log("Product deleted");
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            this.mysqldb.destroy();
        }
        );
    }
    // get all products from mysql db
    getProducts() {
        return this.mysqldb("products").select('*');
    }
    // get product from mysql db
    getProduct(pid) {
        return this.mysqldb("products").where("pid",{pid}).select('*');
    }
    // delete product table from mysql db
    deleteTable() {
        this.mysqldb.schema.dropTable("products").then(() => {
            console.log("Products table deleted.");
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            this.mysqldb.destroy();
        }
        );
    }
}


export default ProductsManager;