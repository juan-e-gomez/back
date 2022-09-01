import { Router } from 'express';
import { createRequire } from 'module';
import ProductsManager from '../managers/productsmanager.js';

const require = createRequire(import.meta.url);
const router = Router();

// products table from mysql
router.get('/', (req, res) => {
    ProductsManager.getProducts().then((products) => {
        res.send(products);
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        ProductsManager.db.destroy();
    }
    );
})

// get product from mysql using pid

router.get('/:pid', (req, res) => {
    let pid = req.params.pid;
    let parsedPid = parseInt(pid);
    let getById = ProductsManager.getProduct(parsedPid);
    getById.then((product) => {
        res.send(product);
    }).catch((err) => {
        res.send('Product not found');
    }).finally(() => {
        ProductsManager.db.destroy();
    }
    );
})


// insert product into mysql db

router.post('/', (req, res) => {
    const admin = true;

    if (admin === true) {
        let product = req.body;
        ProductsManager.insertProduct(product).then((product) => {
            res.send(product);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            ProductsManager.db.destroy();
        }
        );
    } else {
        res.send('You are not authorized to add a product');
    }
})

// modify product in mysql db

router.put('/:pid', (req, res) => {
    const admin = true;

    if (admin === true) {
        let pid = req.params.pid;
        let product = req.body;
        let parsedPid = parseInt(pid);
        ProductsManager.updateProduct(parsedPid, product).then((product) => {
            res.send(product);
            if(!product) {
                res.send('Product not found');
            }
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            ProductsManager.db.destroy();
        }
        );
    } else {
        res.send('You are not authorized to modify a product');
    }
})

// delete product from mysql db

router.delete('/:pid', (req, res) => {
    const admin = true;

    if (admin === true) {
        let pid = req.params.pid;
        let parsedPid = parseInt(pid);
        ProductsManager.deleteProduct(parsedPid).then((product) => {
            res.send(product);
            if(!product) {
                res.send('Product not found');
            }
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            ProductsManager.db.destroy();
        }
        );
    } else {
        res.send('You are not authorized to delete a product');
    }
})


// delete all products from mysql db

router.delete('/', (req, res) => {
    const admin = true;

    if (admin === true) {
        ProductsManager.deleteTable().then((products) => {
            res.send(products);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            ProductsManager.db.destroy();
        }
        );
    } else {
        res.send('You are not authorized to delete all products');
    }
})


export default router;