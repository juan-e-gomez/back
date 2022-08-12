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
    let pid = document.getElementById('delete-item-id')
    let parsedPid = parseInt(pid.value);
    fetch(`/products/${parsedPid}`, {
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