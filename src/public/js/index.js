

let allitemsform = document.getElementById('delete-all-items-form');

allitemsform.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/products', {
        method: 'DELETE'
    })
    .then(data => {
        console.log(data);
    }
    )
}
);


let deleteitemform = document.getElementById('delete-item-form');

deleteitemform.addEventListener('submit', (e) => {
    e.preventDefault();
    let id = document.getElementById('delete-item-id')
    let parsedId = parseInt(id.value);
    fetch(`/products/${parsedId}`, {
        method: 'DELETE'
    })
    .then(data => {
        console.log(data);
    }
    )
}
);


/// websockets

let socket = io({
    autoConnect:false
})
let productTable = document.getElementById('product-table');




socket.connect();

socket.on('connect', () => {
    console.log('Conectado al servidor');
    socket.emit('getProducts');
}
);
    
socket.on('disconnect', () => {
    console.log('Desconectado del servidor');});

socket.on('products', (data) => {
    console.log(data);});

socket.on('log', (data) => {
    console.log(data);
    let log = document.getElementById('log');
    log.innerHTML = data;
}
);
