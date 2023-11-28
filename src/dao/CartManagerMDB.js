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
            const cartById = await cartModel.findById(id)
            if(!cartById) return "El carrito no existe"
            const productById = await allProducts.findById(id)
            if(!productById) return "El producto no existe"
            let allCarts = await this.getCarts()
            let cartFilter = allCarts.filter(cart => cart.id !== cartId)

            if(cartById.product.some(prod => prod.id === productId)) {
                let productInCart = cartById.product.find(prod => prod.id === productId)
                productInCart.cantidad++
                let cartsConcat = [productInCart, ...cartFilter]
                //Aca ya no se que hacer
            }

        } catch (error) {
            
        }
        /* let cartById = await this.exist(cartId)
        if(!cartById) return "El carrito no existe"
        let productById = await allProducts.exist(productId)
        if(!productById) return "El producto no existe"
        let allCarts = await this.readCarts()
        let cartFilter = allCarts.filter(cart => cart.id !== cartId)
        
        if(cartById.products.some(prod => prod.id === productId)){
            let addProductInCart = cartById.products.find(prod => prod.id === productId)
            addProductInCart.cantidad++
            let cartsConcat = [productInCart,...cartFilter]
            await this.writeCarts(cartsConcat)

            return "Producto Sumado al Carrito"
        }

        cartById.products.push({id: productById.id, cantidad: 1})


        let cartsConcat = [cartById, ...cartFilter]
        await this.writeCarts(cartsConcat)
        return "Producto agregado al carrito" */
    }
}

export default CartManager