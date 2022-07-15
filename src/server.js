import express from "express";
import moment from "moment";

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const productos = require('../productos.json');



const app = express();
const port = 8080;
let counter = 0;

const connectedserver = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }
);

app.get("/", (req, res) => {
    res.send("<h1>Bienvenido al servidor Express</h1>");
}
);

app.get("/visitas", (req, res) => {
    counter++;
    res.send(`<h1>Visitas: ${counter}</h1>`);
}
);

app.get("/fyh", (req, res) => {
    let currenttime = moment();
    res.send(currenttime.format("DD/MM/YYYY HH:mm:ss"));
}
);

app.get("/productos", (req, res) => {
    res.send(productos);
}
);
    
app.get("/randomproduct", (req, res) => {
    let random = Math.floor(Math.random() * productos.length);
    res.send(productos[random]);
}
);



connectedserver.on("error", (err) => {
    console.log(err)
}
);

