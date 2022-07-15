import fs from 'fs';

const path = 'productos.json';

class Contenedor {

    getAll = async() => {
        try{
            if(fs.existsSync(path)){
                let content = await fs.promises.readFile(path, 'utf-8')
                let objetos = JSON.parse(content)
                return objetos;
            }else{
                return [];
            }
        }catch(error){
            console.log(error);
        }
    }

    save = async(objeto) => {
        try{
            let objetos = await this.getAll();
            if(objetos.length===0){
                objeto.id=1;
                objetos.push(objeto);
                await fs.promises.writeFile(path, JSON.stringify(objetos, null, '\t'));
            }else{
                objeto.id = objetos[objetos.length-1].id+1;
                objetos.push(objeto);
                await fs.promises.writeFile(path, JSON.stringify(objetos, null, '\t'));
            }
        }catch(error){
            console.log(error);
        }
    }       

    getById = async(id) => {
        try{
            let objetos = await this.getAll();
            let objeto = objetos.find(obj => obj.id === id);
            return objeto;
        }catch(error){
            console.log(error);
    }}


    deleteById = async(id) => {
        try{
            let objetos = await this.getAll();
            let objeto = objetos.find(obj => obj.id === id);
            let index = objetos.indexOf(objeto);
            
            console.log(`Deleting ${id}`)
        
            objetos.splice(index, 1);
            await fs.promises.writeFile(path, JSON.stringify(objetos, null, '\t'));
        }catch(error){
            console.log(error);

        }
    }

    deleteAll = async() => {
        try{
            await fs.promises.writeFile(path, JSON.stringify([], null, '\t'));
        }catch(error){
            console.log(error);
        }
    }
}

const prodUpdate = new Contenedor();
const env = async() => {
    console.log('Obteniendo todos los productos');
    let productos = await prodUpdate.getAll();
    console.log(productos);

    console.log('Agregando un nuevo producto');
    let objeto = {
        title: 'Nuevo producto 54',
        price: 900,
        thumbnail: 'https://picsum.photos/200/300',
        id: 4  
    }

    await prodUpdate.save(objeto);
}

env();

/* const prodDelete = new Contenedor();
const env2 = async() => {
    console.log('Obteniendo todos los productos');
    let productos = await prodDelete.getAll();
    console.log(productos);

    console.log('Borrando un producto');
    await prodDelete.deleteById(1);
}

// env2();

const prodDeleteAll = new Contenedor();
const env3 = async() => {
    console.log('Obteniendo todos los productos');
    let productos = await prodDeleteAll.getAll();
    console.log(productos);

    console.log('Borrando todos los productos');
    await prodDeleteAll.deleteAll();
}

// env3();
 */

export default Contenedor;
