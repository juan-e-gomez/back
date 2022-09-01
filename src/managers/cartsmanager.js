import fs from 'fs';
import __dirname from '../utils.js';


const path = __dirname + '/carts.json';

export default class CartManager {

    constructor() {
        this.path = path;
    }

    getAll = async() => {
        try{
            if(fs.existsSync(path)){
                let content = await fs.promises.readFile(path, 'utf-8')
                let carts = JSON.parse(content)
                return carts;
            }else{
                return [];
            }
        }catch(error){
            console.log(error);
        }
    }

    
    createCart = async() => {
        let carts = await this.getAll();
        let cart = {
            cid: carts.length+1,
            products: []
        };
        if(carts.length > 0){
            cart.cid = carts[carts.length-1].cid + 1;
            cart.products = [];
        }else{
            cart.cid = 1;
            cart.products = [];
        }
        carts.push(cart);
        let content = JSON.stringify(carts);
        await fs.promises.writeFile(path, content, 'utf-8');
        return cart;
    }

    getByCid = async(cid) => {
        try{
            let carts = await this.getAll();
            let searchedCart = carts.find(p => p.cid === cid);
            if(!searchedCart){
                return 'Carrito no encontrado';
            }else{
                return searchedCart;
            }
        }catch(error){
            console.log(error);
        }
    }


    deleteByCid = async(cid) => {
        try{
            let carts = await this.getAll();
            let deleteCart = carts.find(p => p.cid === cid);
            if(!deleteCart){
                return 'Cart no encontrado';
            }
            let index = carts.indexOf(deleteCart);

            console.log(`Deleting cart ${cid}`);

            carts.splice(index, 1);
            await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'));
        } catch(error){
            console.log(error);
        }
    }

    getCartsProducts = async(cid) => {
        try{
            let carts = await this.getAll();
            let cart = carts.find(p => p.cid === cid);
            if(!cart){
                return 'Cart no encontrado';
            }
            return cart.products;
        } catch(error){
            console.log(error);
        }
    }

    addProductToCart = async(cid, pid) => {
        try{
            let carts = await this.getAll();
            let cart = carts.find(p => p.cid === cid);
            if(!cart){
                return 'Cart no encontrado';
            } else {
                let products = cart.products;
                let product = products.find(p => p.pid === pid);
                if(!product){
                    product = {
                        pid: pid,
                        quantity: 1
                    };
                    products.push(product);
                } else {
                    product.quantity++;
                }
                cart.products = products;
                let content = JSON.stringify(carts);
                await fs.promises.writeFile(path, content, 'utf-8');
                return product;
            }
        } catch(error){
            console.log(error);
        }
    }
    
    deleteProductFromCart = async(cid, pid) => {
        try{
            let carts = await this.getAll();
            let cart = carts.find(p => p.cid === cid);
            if(!cart){
                return 'Cart no encontrado';
            } else {
                let products = cart.products;
                let product = products.find(p => p.pid === pid);
                if(!product){
                    return 'Product no encontrado';
                } else {
                    let index = products.indexOf(product);
                    products.splice(index, 1);
                    cart.products = products;
                    let content = JSON.stringify(carts);
                    await fs.promises.writeFile(path, content, 'utf-8');
                    return 'Producto eliminado';
                }
            }
        } catch(error){
            console.log(error);
        }
    }
}
