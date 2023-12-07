import { Router } from "express";
import CartManager from "../dao/CartManagerMDB.js"

const cartRouter = Router()
const carts = new CartManager

cartRouter.post("/", async (req,res) => {
    res.send(await carts.addCart())
} )

cartRouter.get("/", async (req,res) => {
    res.send(await carts.getCarts())
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

cartRouter.delete("/:cid/products/:pid", async (req,res) => {
    let cartId = req.params.cid 
    let productId = req.params.pid 

    res.send(await carts.deleteProductInCart(cartId, productId)) 
})

cartRouter.put("/carts/:cid", async (req,res) => {
    let id = req.params.id
    //Aca no tengo idea a que se refiere la consigna con "Un arrgelo de productos con el formato especificado arriba"

    //Aca llamaria a una funcion para actualizar pero no tengo idea que pasarle ni tampoco cómo sería esa función. 
})

cartRouter.delete("/carts/:cid", async (req,res) => {
    let id = req.params.id 

    res.send(await carts.deleteCart(id))
})

export default cartRouter