import ProductManager from "./product.controller.mdb.js"
import cartModel from "../dao/models/carts.model.js"
import productModel from "../dao/models/product.model.js"
import CartService from "../services/carts.dao.js"
import TicketService from "../services/tickets.mongo.dao.js"
import CustomError from "../services/error.custom.class.js";

import ProductService from "../services/products.dao.js"

const allProducts = new ProductManager
const service = new CartService
const ticketService = new TicketService();
const productService = new ProductService()



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

    updateCart = async (cid, pid, qty) => {
        const stockData = await productService.getProductsById(pid);
        
        if (stockData === null) {
            throw new CustomError(errorsDictionary.PRODUCT_NOT_FOUND);
        } else {
            const stock = stockData.stock;
            if (stock < qty) {
                throw new CustomError({ ...errorsDictionary.INSUFFICIENT_STOCK, moreInfo: `max: ${stock} unidades` });
            } else {
                return await service.updateCart(cid, pid, qty);
            }
        }
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

    processPurchase = async (cid) => {
        const cart = await service.getCartByIdService(cid);

        if (cart === null) {
            throw new CustomError({ ...errorsDictionary.ID_NOT_FOUND, moreInfo: 'cart' });
        } else {
            let total = 0;
            let cartModified = false;

            for (const item of cart.products) {
                const pid = item.pid._id;
                const qty = item.qty;
                const stock = item.pid.stock;
                const price = item.pid.price;
                
                if (stock > 0) {
                    let newStock = 0;
    
                    if (stock >= qty) {
                        newStock = stock - qty;
                        item.qty = 0;
                        total += qty * price;
                    } else {
                        newStock = 0;
                        item.qty -= stock;
                        total += stock * price;
                    }
                    
                    await productService.updateProducts(pid, { stock: newStock });
                    cartModified = true;
                }
            }
    
            if (cartModified) {
                await cart.save();
                await ticketService.addTicket({ amount: total, purchaser: req.user._id });
                
                return cart;
            } else {
                return errorsDictionary.NO_TICKET_GENERATED.message;
            }
        }
    }

    getTickets = async () => {
        return await ticketService.getTickets()
    }

    
}

export default CartManager