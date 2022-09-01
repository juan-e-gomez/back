import usersRouter from './routes/users.router.js';
import productsRouter from './routes/products.router.js';
import viewsRouter from './routes/views.router.js'
import cartsRouter from './routes/carts.router.js';
import { createRequire } from 'module';
import __dirname from './utils.js';
import sqlite3db from '../knex/options/sqlite3.js';
import mysqldb from '../knex/options/mysql.js';


const require = createRequire(import.meta.url);

const express = require('express');
const { Server: HTTPServer } = require('http');
const { Server:IOServer } = require('socket.io');

const app = express();
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);
const port = 8080;
const admin = false;

app.use(express.static(__dirname + '/public/'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const messages = [
    { author : 'john@gmail.com', text : 'Hello' },
    { author : 'mary@gmail.com', text : 'Hi' },
    { author : 'peter@gmail.com', text : 'How are you?' },
];

httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

io.on('connection', function(socket) {
    console.log('User connected');
    socket.emit('messages', messages);

    socket.on('new-message', data => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });});

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);
app.use('/',viewsRouter);

app.get('/', (req, res) => {
    res.sendFile('home.ejs', {root: __dirname + '/views'});
    res.send(products, carts);
});

app.get("/products",async (req, res) => {
    try{
        const products = await ProductsManager.getProducts();
        res.send(products);
    } catch(err) {
        console.log(err);
    } finally {
        ProductsManager.db.destroy();
    }
});







app.get("/carts", (req, res) => {
    res.send(carts);
});

app.get("/randomproduct", (req, res) => {
    let random = Math.floor(Math.random() * products.length);
    res.send(products[random]);
});

app.get('/urlparam', (req, res) => {
    res.send(req.query);
});
