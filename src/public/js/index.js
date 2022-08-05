

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