class Usuario {
    constructor (nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }
    
    getFullName() {
        let fullname = `${this.nombre} ${this.apellido}`
        console.log(fullname)
    }

    addMascota(mascota) {
        this.mascotas.push(mascota)
    }

    countMascotas() {
        let count = this.mascotas.length
        console.log(count)
    }

    addBook(nombre, autor) {
        this.libros.push({nombre:nombre, autor:autor})
    }

    getBookNames() {
        let bookNames = this.libros.map(book => book.nombre)
        console.log(bookNames)
    }
    
}

const user1 = new Usuario('Juan Esteban','Gómez')
const user2 = new Usuario('Federico','Luppi')
const user3 = new Usuario('Diego','Capusotto')
const user4 = new Usuario('Lionel','Messi')


user1.getFullName()

console.log(user3)


user2.addMascota("cacatua")

console.log(user2.mascotas)


console.log(user2)

user2.countMascotas()


user2.addBook('El banquete', 'Platón')

console.log(user2.libros)

user2.getBookNames()