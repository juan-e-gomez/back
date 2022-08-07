import fs from 'fs';
import __dirname from './utils.js';


const path = __dirname + '/products.json';

export default class Contenedor {

    constructor() {
        this.path = path;
    }

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
    };

    save = async(item) => {
        let items = await this.getAll();
        if(items.length > 0){
            item.id = items[items.length-1].id + 1;
        }else{
            item.id = 1;
        }
        items.push(item);
        let content = JSON.stringify(items);
        await fs.promises.writeFile(path, content, 'utf-8');
        return item;
        
    };

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
            let items = await this.getAll();
            items = [];
            await fs.promises.writeFile(path, JSON.stringify(items, null, '\t'));
        } catch(error){
            console.log
        }
    }
}