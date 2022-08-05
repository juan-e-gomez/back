import express from 'express';
import usersRouter from './routes/users.router.js';
import productsRouter from './routes/products.router.js';
import { createRequire } from 'module';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';


const require = createRequire(import.meta.url);
const products = require('./products.json');


const app = express();
const port = 8080;

app.use(express.static(__dirname + '/public/'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
// app.set('view engine','pug');


app.use('/users', usersRouter);
app.use('/products', productsRouter);


app.get("/", (req, res) => {
    res.render("home.ejs", {
        products: products
    });
}
);

app.get("/products", (req, res) => {
    res.render("products.ejs", {
        products: products
    });
});
    
app.get("/randomproduct", (req, res) => {
    let random = Math.floor(Math.random() * products.length);
    res.send(products[random]);
});

app.get('/hello', (req, res) => {
    res.render('hello.pug', {
        message: 'Probando pug'
    });
});

app.get('/urlparam', (req, res) => {
    res.send(req.query);
});

/* const template = handlebars.compile('<h1>{{message}}</h1>');
const html = template({ message: 'Hello world!' });
document.querySelector('span').innerHTML = html; */

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });