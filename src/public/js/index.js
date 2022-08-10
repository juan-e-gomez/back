import { Socket } from "socket.io";

let allitemsform = document.getElementById('delete-all-items-form');

allitemsform.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/products', {
        method: 'DELETE'
    })
    .then(data => {
        if (data.status === 200)
            setTimeout(() => {
                window.location.reload();
            }, 1000);
    }).catch(err => {
        console.log(err);
    }
    );
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
        if (data.status === 200) {
            setTimeout(() => {
                window.location.reload();
            }
            , 1000);
        }
    }).catch(err => {
        console.log(err);
    }
    );
}
);


