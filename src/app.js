import usersRouter from './routes/users.router.js';
import productsRouter from './routes/products.router.js';
import { createRequire } from 'module';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js'

const require = createRequire(import.meta.url);


const express = require('express');
const { Server: HTTPServer } = require('http');
const { Server:IOServer } = require('socket.io');

const app = express();
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);
const port = 8080;

app.use(express.static(__dirname + '/public/'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const products = require('./products.json');
console.log(products);

const messages = [
    { author : 'John', message : 'Hello' },
    { author : 'Mary', message : 'Hi' },
    { author : 'Peter', message : 'How are you?' },
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
    }
    );

    socket.emit('products', products);

    socket.on('new-product', data => {
        products.push(data);
        io.sockets.emit('products', products);
    }
    );
    
});

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
// app.set('view engine','pug');

// app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
// app.set('view engine','handlebars')


app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/',viewsRouter);

app.get('/', (req, res) => {
    res.sendFile('home.ejs', {root: __dirname + '/views'});
    res.send(products);
}
);

app.get("/products", (req, res) => {
    res.send(products);
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