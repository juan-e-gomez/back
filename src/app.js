import express from 'express';
import usersRouter from './routes/users.router.js';
import productsRouter from './routes/products.router.js';
import handlebars from 'express-handlebars';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const products = require('../products.json');

const app = express();
const port = 8080;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('views','./views');
app.set('view engine','pug');

app.get('/hello', (req, res) => {
    res.render('hello.pug', {
        message: 'Hello world!'
    });
});

app.get('/urlparam', (req, res) => {
    res.send(req.query);
});

app.use('/users', usersRouter);

app.use('/products', productsRouter);

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.get("/products", (req, res) => {
    res.send(products);
});
    
app.get("/randomproduct", (req, res) => {
    let random = Math.floor(Math.random() * products.length);
    res.send(products[random]);
});


/* const template = handlebars.compile('<h1>{{message}}</h1>');
const html = template({ message: 'Hello world!' });
document.querySelector('span').innerHTML = html; */

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });
