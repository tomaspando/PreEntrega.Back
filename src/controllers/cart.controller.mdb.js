import ProductManager from "./product.controller.mdb.js"
import cartModel from "../dao/models/carts.model.js"
import productModel from "../dao/models/product.model.js"
import CartService from "../services/carts.dao.js"

const allProducts = new ProductManager
const service = new CartService


class CartManager {
    constructor () {
    }

    addCart = async (cartObj) => {
        return await service.addCartService(cartObj)
    }

    getCarts = async () => {
        return await service.getCartsService()
    }

    getCartById = async (id) => {
        return await service.getCartByIdService(id)
    }

    addProductInCart = async (cartId, productId) => {
        return await service.addProductInCartService(cartId, productId)
    }

    deleteProductInCart = async (cartId, productId) => {
        return await service.deleteProductInCartService(cartId, productId)
    }

    updateCart = async (cartId, updatedProducts) => {
        return await service.updateCartService(cartId,updatedProducts)
    }

    deleteCart = async cartId => {
        return await service.deleteCartService(cartId)
    }

    updateProductQuantity = async (cartId, productId, quantity) => {
        return await service.updateProductQuantityService(cartId, productId, quantity)
    }


    getCartPaginated = async (cartId) => {
        try {
            
        } catch (error) {
            
        }
    }

    
}

export default CartManager