import fs from 'fs';

const path = '../products.json';

class Contenedor {

    getAll = async() => {
        try{
            if(fs.existsSync(path)){
                let content = await fs.promises.readFile(path, 'utf-8')
                let items = JSON.parse(content)
                return items;
            }else{
                return [];
            }
        }catch(error){
            console.log(error);
        }
    }

    save = async(item) => {
        try{
            let items = await this.getAll();
            if(items.length===0){
                item.id=1;
                items.push(item);
                await fs.promises.writeFile(path, JSON.stringify(items, null, '\t'));
            }else{
                item.id = items[items.length-1].id+1;
                items.push(item);
                await fs.promises.writeFile(path, JSON.stringify(items, null, '\t'));
            }
        }catch(error){
            console.log(error);
        }
    }       

    modify = async(item) => {
        try{
            let items = await this.getAll();
            let index = items.findIndex(p => p.id === item.id);
            if(index>-1){
                items[index] = item;
                await fs.promises.writeFile(path, JSON.stringify(items, null, '\t'));
            }
        }catch(error){
            console.log(error);
        }
    }
    

    getById = async(id) => {
        try{
            let items = await this.getAll();
            let searchedItem = items.find(p => p.id === id);
            if(!searchedItem){
                return 'Producto no encontrado';
            }
            return searchedItem;
        }
        catch(error){
            console.log(error);
        }
    }


    deleteById = async(id) => {
        try{
            let items = await this.getAll();
            let deleteItem = items.find(p => p.id === id);
            if(!deleteItem){
                return 'Producto no encontrado';
            }
            let index = items.indexOf(deleteItem);

            console.log(`Deleting ${id}`)

            items.splice(index,1);
            await fs.promises.writeFile(path, JSON.stringify(items, null, '\t'));
        } catch(error){
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



export default Contenedor;
