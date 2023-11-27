import {promises as fs} from "fs"
import  {nanoid}  from "nanoid"
import ProductManager from "./ProductManager.js"

const allProducts = new ProductManager

class CartManager {
    constructor () {
        this.path = "./src/models/carts.json"
    }

    readCarts = async () => {
        let carts = await fs.readFile(this.path, "utf-8")
        return JSON.parse(carts)
    }

    writeCarts = async (cart) => {
        await fs.writeFile(this.path, JSON.stringify(cart))
    }

    exist = async id => {
        let carts = await this.readCarts()
        return carts.find(cart => cart.id === id)
    }

    addCart = async () => {
        let cartsOld = await this.readCarts()
        let id = nanoid() 
        let cartsConcat = [{id: id, products: []},... cartsOld]
        await this.writeCarts(cartsConcat)
        return "Carrito agregado"
    }

    getCartById = async (id) => {
        let cartById = await this.exist(id)
        if(!cartById) {
            return "El carrito no existe"
        }
        return cartById
    }

    addProductInCart = async (cartId, productId) => {
        let cartById = await this.exist(cartId)
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
        return "Producto agregado al carrito"
    }
}

export default CartManager