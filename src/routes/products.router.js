import { Router } from 'express';
import { createRequire } from 'module';
import Contenedor from '../contenedor.js';

const require = createRequire(import.meta.url);
const router = Router();
const products = require('../products.json');

console.log(products);

router.get('/', (req, res) => {
    let getAll = async() => {
        try{
            let contenedor = new Contenedor();
            let items = await contenedor.getAll();
            res.send(items);
        }catch(error){
            console.log(error);
        }
    }
    getAll();
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    let parsedId = parseInt(id);
    let getById = async(parsedId) => {
        try{
            let contenedor = new Contenedor();
            let item = await contenedor.getById(parsedId);
            res.send(item);
        }
        catch(error){
            res.send('Producto no encontrado');
        }
    }
    getById(parsedId);
});

router.post('/', (req, res) => {
    let id = products.length+1;
    let parsedId = parseInt(id);
    let newProduct = {
        id: parsedId,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
    }
    let newItem = async() => {
        try{
            let contenedor = new Contenedor();
            let item = await contenedor.save(newProduct);
            res.send(item);
        }
        catch(error){
            res.send('Error al guardar el producto');
        }
    }
    res.render('products/new', {
        product: newProduct
    });
    newItem();
}

);

    


router.put('/:id', (req, res) => {
    let id = req.params.id;
    let parsedId = parseInt(id);
    let modifyProduct = {
        id: parsedId,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
    }
    if(!modifyProduct) return res.status(404).send('El producto no existe');
    let modify = async(modifyProduct) => {
        try{
            let contenedor = new Contenedor();
            await contenedor.modify(modifyProduct);
            res.send(modifyProduct);
        }catch(error){
            console.log(error);
        }
    }
    modify(modifyProduct);
});


router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let parsedId = parseInt(id);
    let deleteProduct = async(parsedId) => {
        try{
            let contenedor = new Contenedor();
            let items = await contenedor.getAll();
            let index = items.findIndex(p => p.id === parsedId);
            if(index>-1){
                await contenedor.deleteById(parsedId);
                res.send('Producto eliminado');
            }else{
                res.send('Producto no encontrado');
            }
        }catch(error){
            console.log(error);
        }
    }
    deleteProduct(parsedId);
}
);


router.delete('/', (req, res) => {
    let deleteAll = async() => {
        try{
            let contenedor = new Contenedor();
            await contenedor.deleteAll();
            res.send('Todos los productos fueron eliminados');
            console.log('Todos los productos fueron eliminados');
        }
        catch(error){
            console.log(error);
        }
    }
    deleteAll();
});

export default router;