import ProductManager from "./ProductManagerMDB.js"
import cartModel from "./models/carts.model.js"

const allProducts = new ProductManager

class CartManager {
    constructor () {
    }

   /*  readCarts = async () => {
        let carts = await fs.readFile(this.path, "utf-8")
        return JSON.parse(carts)
    }

    writeCarts = async (cart) => {
        await fs.writeFile(this.path, JSON.stringify(cart))
    }

    exist = async id => {
        let carts = await this.readCarts()
        return carts.find(cart => cart.id === id)
    } */

    addCart = async () => {
        try {
            await cartModel.create()
            return "Carrito agregado"
        } catch (error) {
            return error.message
        }
    }

    getCarts = async () => {
        try {
            const carts = await cartModel.find().lean()
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
}

export default CartManager