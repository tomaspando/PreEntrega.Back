import ProductManager from "./ProductManagerMDB.js"
import cartModel from "./models/carts.model.js"
import productModel from "./models/product.model.js"
import { addCartService, getCartsService, getCartByIdService, addProductInCartService, deleteProductInCartService, updateCartService, deleteCartService, updateProductQuantityService } from "../services/carts.services.js"

const allProducts = new ProductManager

class CartManager {
    constructor () {
    }

    addCart = async (cartObj) => {
        return await addCartService(cartObj)
    }

    getCarts = async () => {
        return await getCartsService()
    }

    getCartById = async (id) => {
        return await getCartByIdService(id)
    }

    addProductInCart = async (cartId, productId) => {
        return await addProductInCartService(cartId, productId)
    }

    deleteProductInCart = async (cartId, productId) => {
        return await deleteProductInCartService(cartId, productId)
    }

    updateCart = async (cartId, updatedProducts) => {
        return await updateCartService(cartId,updatedProducts)
    }

    deleteCart = async cartId => {
        return await deleteCartService(cartId)
    }

    updateProductQuantity = async (cartId, productId, quantity) => {
        return await updateProductQuantityService(cartId, productId, quantity)
    }


    getCartPaginated = async (cartId) => {
        try {
            
        } catch (error) {
            
        }
    }

    
}

export default CartManager