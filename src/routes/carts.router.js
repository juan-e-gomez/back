import { Router } from 'express';
import { createRequire } from 'module';
import Contenedor from '../contenedor.js';
import CartManager from '../cartmanager.js';

const require = createRequire(import.meta.url);
const router = Router();
const products = require('../products.json');
const carts = require('../carts.json');


router.post('/', (req, res) => {
    // crea carrito y devuelve el id
    let cid = carts.length+1;
    let parsedCid = parseInt(cid);
    let newCart = {
        id: parsedCid,
        products: []
    };

    let newItem = async() => {
        try{
            let cartmanager = new CartManager();
            let item = await cartmanager.createCart(newCart);
            res.send(item);
        }
        catch(error){
            res.send('Error al crear el carrito');
        }
    }
    newItem();
});

router.delete('/:cid', (req, res) => {
    // vacia carrito y elimina
    let cid = req.params.cid;
    let parsedCid = parseInt(cid);
    let deleteCart = async(parsedCid) => {
        try{
            let cartmanager = new CartManager();
            let carts = await cartmanager.getAll();
            let index = carts.findIndex(p => p.cid === parsedCid);
            if(index>-1){
                await cartmanager.deleteByCid(parsedCid);
                res.send('Carrito eliminado');
            }else{
                res.send('Carrito no encontrado');
            }
        } catch(error){
            res.send('Error al eliminar el carrito');
        }
    }
    deleteCart(parsedCid);
}   
);

router.get('/:cid', (req, res) => {
    // devuelve carrito
    let cid = req.params.cid;
    let parsedCid = parseInt(cid);
    let getCart = async(parsedCid) => {
        try{
            let cartmanager = new CartManager();
            let item = await cartmanager.getByCid(parsedCid);
            res.send(item);
        }
        catch(error){
            res.send('Carrito no encontrado');
        }
    }
    getCart(parsedCid);
}
);


router.get('/:cid/products', (req, res) => {
    // devuelve los productos del carrito
    let cid = req.params.cid;
    let parsedCid = parseInt(cid);
    let getProducts = async(parsedCid) => {
        try{
            let cartmanager = new CartManager();
            let products = await cartmanager.getCartsProducts(parsedCid);
            res.send(products);
        }
        catch(error){
            res.send('Error al obtener los productos');
        }
    }
    getProducts(parsedCid);
}
);


router.post('/:cid/products', (req, res) => {
    // agrega producto al carrito
    let cid = req.params.cid;
    let parsedCid = parseInt(cid);
    let pid = req.body.pid;
    let parsedPid = parseInt(pid);
    let addProduct = async(parsedCid, parsedPid) => {
        try{
            let cartmanager = new CartManager();
            let item = await cartmanager.addProductToCart(parsedCid, parsedPid);
            res.send(item);
        }
        catch(error){
            res.send('Error al agregar el producto');
        }
    }
    addProduct(parsedCid, parsedPid);
}
);


router.delete('/:cid/products/:pid', (req, res) => {
    // elimina producto del carrito
    let cid = req.params.cid;
    let parsedCid = parseInt(cid);
    let pid = req.params.pid;
    let parsedPid = parseInt(pid);
    let deleteProduct = async(parsedCid, parsedPid) => {
        try{
            let cartmanager = new CartManager();
            let item = await cartmanager.deleteProductFromCart(parsedCid, parsedPid);
            res.send(item);
        }
        catch(error){
            res.send('Error al eliminar el producto');
        }
    }
    deleteProduct(parsedCid, parsedPid);

}
);


export default router;
