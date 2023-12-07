import ProductManager from "./ProductManagerMDB.js"
import cartModel from "./models/carts.model.js"
import productModel from "./models/product.model.js"

const allProducts = new ProductManager

class CartManager {
    constructor () {
    }

    addCart = async (cartObj) => {
        try {
            await cartModel.create({products: [], total:0})
            return "Carrito agregado"
        } catch (error) {
            return error.message
        }
    }

    getCarts = async () => {
        try {
            //const carts = await cartModel.find().lean() 
            const carts = await cartModel.find().populate({path: "products", model: productModel}).lean()
            return carts
        } catch (error) {
            error.message
        }
    }

    getCartById = async (id) => {
        try {
            const cart = await cartModel.findById(id)
            return cart === null ? "Carrito no encontrado" : cart
        } catch (error) {
            error.message
        }
    }

    addProductInCart = async (cartId, productId) => {
        try {
            
            const cart = await cartModel.findById(cartId)

            if(!cart) {
                return "El carrito no existe"
            }
            
            const product = await allProducts.findById(productId)
            
            if(!product) {
                return "El producto no existe"
            }
            
            //Verificar si el producto ya está en el carrito
            
            const existProduct = cart.product.find( prod => prod.id === productId)
            
            if(existProduct) {
                
                //Si el producto ya está en el carrtio, incrementa la cantidad
                existProduct.cantidad++

                //Guarda los cambios en el carrito
                await cart.save()

                return "Producto sumado al carrito"
            } else {

                //Si el producto no está en el carrito, agregalo con cantidad 1
                cart.product.push({id: product.id, cantidad: 1})

                //Guarda los cambios en el carrito
                await cart.save()

                return "Producto agregado al carrito"
            }
            
            
        } catch (error) {
            console.log("Error al agregar al carrito", error)

            return "Ocurrio un error al agregar producto al carrito"
        }
        
    }

    deleteProductInCart = async (cartId, productId) => {
        let cart = await this.getCartById(cartId)
        let product = await allProducts.getProductsById(productId)

        //Aca ya no se qué hacer. 
    }

    //updateCart = async (recibe algo) => {
        //No se cómo sería esta función. 
    //}

    deleteCart = async cartId => {
        try {
            const eliminacion = await cartModel.findByIdAndDelete(id)

            return eliminacion            
        } catch (error) {
            return error.message
        }
    }
}

export default CartManager