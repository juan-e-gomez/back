
let productform = document.getElementById('product-form');

const handleSubmit = (evt,form,route) => {
    evt.preventDefault();
    let formdata = new FormData(form);
    let obj = {};
    formdata.forEach((value,key) => obj[key] = value);
    
    fetch(route, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(data => {
        console.log(data);
    }
    )
    .catch(error => console.log(error));
}

productform.addEventListener('submit',(e) => handleSubmit(e,e.target,'/products'));



let deleteItemBox = document.getElementById('delete-item-box');


const deleteItem = (evt,route) => {
    evt.preventDefault();
    let formdata = new FormData(deleteItemBox);
    let obj = {};
    formdata.forEach((value,key) => obj[key] = value);
    
    fetch(route, {
        method: 'DELETE',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(data => {
        console.log(data);
    }
    )
    .catch(error => console.log(error));
}


deleteItemBox.addEventListener('submit',(e) => deleteItem(e,'/products/'+e.target.elements.id.value));