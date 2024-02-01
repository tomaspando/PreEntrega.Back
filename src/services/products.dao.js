import productModel from "../dao/models/product.model.js"
import {faker} from "@faker-js/faker"

class ProductService {
    constructor() {

    }

    addProducts = async (product) => {
        try {
            await productModel.create(product)
            return "Producto agregado"
        } catch (error) {
            return error.message 
        }
    }

    getProducts = async (limite) => {
        try {
            /* const process = await productModel.aggregate([
                {$limit : limite},
                {$sort: {price: 1}}
            ]) */

/*             return process
 */         const products = await productModel.find({}).lean()
            return products 

            /* const process = await productModel.paginate(
                {title:"Computadora"},
                {offset: 0, limit: limite, lean: true}
            )

            return process */

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

    getProductsPaginated = async (page, limit) => {
        try {
            return await productModel.paginate(
                {},
                {offset: (page * limit) -limit, limit: limit, lean: true}
            )
        } catch (error) {
            return error.message
        }
    }

    generateMockProducts = async () => {
        const mockProducts = []

        for(let i = 0;  i < 100; i++ ) {
            const product = {
                _id: faker.database.mongodbObjectId(),
                title: faker.commerce.productName(),
                description: faker.commerce.productAdjective(),
                price: faker.commerce.price(),
                thumbnail: faker.image.avatar() ,
                code: faker.number.int(15) +1,
                stock: faker.datatype.number()
            }
            mockProducts.push(product)
        }

        return mockProducts
    }

}

export default ProductService;