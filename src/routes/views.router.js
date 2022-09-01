import { Router } from 'express';
import { createRequire } from 'module';
import Contenedor from '../managers/productsmanager.js';

const require = createRequire(import.meta.url);
const router = Router();
const products = require('../products.json');

router.get('/',(req,res)=>{
    res.render('home.ejs',{
        products:products
        
    });
}
);

export default router;