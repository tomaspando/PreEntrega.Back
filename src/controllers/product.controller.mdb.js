import ProductService from "../services/products.dao.js"

const service = new ProductService()

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
            await service.addProducts(product)
            return "Producto agregado"
        } catch (error) {
            return error.message 
        }
    }

    getProducts = async (limite) => {
        try {
            const process = await service.getProducts(limite)
            return process
        } catch (error) {
            return error.message
        }
    }

    getProductsById = async (id) => {
        try {
            const process = await service.getProducts(id)
            return process
        } catch (error) {
            return error.message
        }
    }

    updateProducts = async (id, product) => {
        try {
            const process = await service.updateProducts(id, product)

            return process
        } catch (error) {
            return error.message
        }
    }

    deleteProducts = async id => {
        try {
            const process = await service.deleteProducts(id)

            return process            
        } catch (error) {
            return error.message
        }
    }

    getProductsPaginated = async (page, limit) => {
        try {
            return await service.getProductsPaginated(page,limit)
        } catch (error) {
            return error.message
        }
    }
}


export default ProductManager
