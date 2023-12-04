import productModel from "./models/product.model.js"

class ProductManager {
    constructor() {
    }

    /* readProducts = async () => {
        let products = await fs.readFile(this.path, "utf-8")
        return JSON.parse(products)
    }

    writeProducts = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(product))
    }

    exist = async id => {
        let products = await this.readProducts()
        return products.find( prod => prod.id === id)
    } */

    addProducts = async (product) => {
        try {
            await productModel.create(product)
            return "Producto agregado"
        } catch (error) {
            return error.message 
        }
    }

    getProducts = async () => {
        try {
            const products = await productModel.find({ /* title: `Computadora` */}).lean()
            return products
        } catch (error) {
            return error.message
        }
    }

    getProductsById = async (id) => {
        try {
            const product = await productModel.findById(id)
            return product === null ? "Producto no encontrado" : product
        } catch (error) {
            return error.message
        }
    }



    updateProducts = async (id, product) => {
        try {
            const actualizacion = await productModel.findByIdAndUpdate(id, product)

            return actualizacion
        } catch (error) {
            return error.message
        }
    }

    deleteProducts = async id => {
        try {
            const eliminacion = await productModel.findByIdAndDelete(id)

            return eliminacion            
        } catch (error) {
            return error.message
        }
    }
}


export default ProductManager
