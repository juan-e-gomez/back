
let allitemsform = document.getElementById('delete-all-items-form');

allitemsform.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/products', {
        method: 'DELETE'
    }).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
    }).catch((err) => {
        console.log(err);
    })

})



let deleteitemform = document.getElementById('delete-item-form');

deleteitemform.addEventListener('submit', (e) => {
    e.preventDefault();
    let pid = document.getElementById('pid').value;
    let parsedPid = parseInt(pid);
    fetch('/products/' + parsedPid, {
        method: 'DELETE'
    }).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
    }).catch((err) => {
        console.log(err);
    }
    )})
