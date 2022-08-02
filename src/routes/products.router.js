import { Router } from 'express';
import { createRequire } from 'module';
import Contenedor from '../contenedor.js';

const require = createRequire(import.meta.url);
const router = Router();
const products = require('../../products.json');

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

    if(newProduct.title && newProduct.price && newProduct.description){
        let contenedor = new Contenedor();
        contenedor.save(newProduct);
        res.send(newProduct);
    }
    else{
        res.send("Error: Faltan datos");
    }
});

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
                items.splice(index, 1);
                await contenedor.save(items);
                res.send('Producto eliminado');
            }else{
                res.send('Producto no encontrado');
            }
        } catch(error){
            console.log(error);
        }
    }
    deleteProduct(parsedId);
}
);


router.delete('/deleteAll', (req, res) => {
    let deleteAll = async() => {
        try{
            let contenedor = new Contenedor();
            await contenedor.deleteAll();
            res.send('Todos los productos fueron eliminados');
        }
        catch(error){
            console.log(error);
        }
    }
    deleteAll();
});

export default router;