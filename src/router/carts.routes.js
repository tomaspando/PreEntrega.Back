import { Router } from "express";
import CartManager from "../controllers/CartManager.js"

const CartRouter = Router()
const carts = new CartManager

CartRouter.post("/", async (req,res) => {
    res.send(await carts.addCart())
} )

CartRouter.get ("/:cid", async (req,res) => {
    let id = req.params.cid
    res.send( await carts.getCartById(id))
})

CartRouter.post("/:cid/products/:pid" , async (req, res) => {
    let cartId = req.params.cid 
    let productId = req.params.pid 
    res.send( await carts.addProductInCart(cartId, productId))
})

export default CartRouter