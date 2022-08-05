import { Router } from 'express';
import { createRequire } from 'module';
import Contenedor from '../contenedor.js';

const require = createRequire(import.meta.url);
const router = Router();
const products = require('../products.json');

console.log(products);

router.get('/',(req,res)=>{
    res.render('home.ejs',{
        products:products
        
    });
}
);

export default router;