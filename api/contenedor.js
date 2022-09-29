const fs = require("fs")

class Contenedor {
    constructor(rutaArchivo) {
        this.archivo = rutaArchivo
    }

    async save(producto) {

        const contenido = await this.getAll()
        const indice = contenido.sort((productoA, productoB) => productoB.id - productoA.id)[0].id
        producto.id = JSON.parse(indice) + 1
        contenido.push(producto)
        try {
            await fs.promises.writeFile(this.archivo, JSON.stringify(contenido, null, 2), "utf-8")
            return producto.id
        } catch (e) {
            console.log(e)
        }
    }

    async getAll() {
        try {
            let contenido = await fs.promises.readFile(this.archivo, "utf-8")
            return JSON.parse(contenido)
        } catch  {
            return []
        }
    }

    async getById(id) {
        let contenido = await this.getAll()
        let productoBuscado = contenido.filter((producto) => producto.id === id)
        return productoBuscado
    }

    async deleteById(id) {
        try {
            let contenido = await this.getAll()
            const productoBuscado = contenido.filter((producto) => producto.id !== id)
            contenido = productoBuscado
            await fs.promises.writeFile(this.archivo, JSON.stringify(contenido, null, 2), "utf-8")
        } catch {
            console.log("El id no existe")
        }
    }

    async deleteAll(){
        try {
            let contenido = await this.getAll()
            contenido = []
            await fs.promises.writeFile(this.archivo, contenido, "utf-8")
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = Contenedor;