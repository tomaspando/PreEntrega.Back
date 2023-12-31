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
            
            const existProduct = cart.products.find( prod => prod.id === productId)
            
            if(existProduct) {
                
                //Si el producto ya está en el carrtio, incrementa la cantidad
                existProduct.cantidad++

                //Guarda los cambios en el carrito
                await cart.save()

                return "Producto sumado al carrito"
            } else {

                //Si el producto no está en el carrito, agregalo con cantidad 1
                cart.products.push({id: product.id, cantidad: 1})

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
        try {
            const cart = await cartModel.findById(cartId)

            const cartFilter =  cart.products.filter(prod => prod._id !== productId)

            await cartModel.findByIdAndUpdate(cartId,cartFilter)

            return "Producto Eliminado"
            
        } catch (error) {
            return error.message
        }

    }

    updateCart = async (cartId, updatedProducts) => {
        try {
            const actualizacion = await cartModel.findByIdAndUpdate(cartId, updatedProducts)

            return actualizacion
        } catch (error) {
            return error.message
        }
    }

    deleteCart = async cartId => {
        try {
            const process = await cartModel.findByIdAndDelete(cartId)

            return process            
        } catch (error) {
            return error.message
        }
    }

    updateProductQuantity = async (cartId, productId, quantity) => {
        try {
            const cart = await cartModel.findById(id)

            const productInCart = cart.products.filter(prod => prod._id == productId)

            productInCart.cantidad = quantity

            await cartModel.findByIdAndUpdate(cartId, productInCart)

            return "Cantidad actualizada"
        } catch (error) {
            return error.message
        }
    
    }


    getCartPaginated = async (cartId) => {
        try {
            
        } catch (error) {
            
        }
    }

    
}

export default CartManager