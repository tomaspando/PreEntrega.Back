import { Router } from "express";
import CartManager from "../dao/CartManagerMDB.js"

const cartRouter = Router()
const carts = new CartManager

cartRouter.post("/", async (req,res) => {
    res.send(await carts.addCart())
} )

cartRouter.get("/", async (req,res) => {
    res.send(await carts.readCarts())
})

cartRouter.get ("/:cid", async (req,res) => {
    let id = req.params.cid
    res.send( await carts.getCartById(id))
})

cartRouter.post("/:cid/products/:pid" , async (req, res) => {
    let cartId = req.params.cid 
    let productId = req.params.pid 
    res.send( await carts.addProductInCart(cartId, productId))
})

export default cartRouter