import { Router } from "express";
import CartManager from "../dao/CartManagerMDB.js"

const cartRouter = Router()
const carts = new CartManager

cartRouter.post("/", async (req,res) => {
    try {
        res.status(200).send({status: "Ok", data: await carts.addCart()})
    } catch (error) {
        res.status(500).send({status: "ERROR", data: error.message})
    }
} )

cartRouter.get("/", async (req,res) => {
    try {
        res.status(200).send({status: "Ok", data: await carts.getCarts()})
    } catch (error) {
        res.status(500).send({status: "ERROR", data: error.message})
    }
})

cartRouter.get ("/:cid", async (req,res) => {
    try {
        let id = req.params.cid
        res.status(200).send({status: "Ok", data: await carts.getCartById(id)})
    } catch (error) {
        res.status(500).send({status: "ERROR", data: error.message})
    }
})

cartRouter.post("/:cid/products/:pid" , async (req, res) => {
    try {
        let cartId = req.params.cid 
        let productId = req.params.pid 
        res.status(200).send({status: "Ok", data: await carts.addProductInCart(cartId, productId)})
    } catch (error) {
        res.status(500).send({status: "ERROR", data: error.message})
    }
})

cartRouter.delete("/:cid/products/:pid", async (req,res) => {
    try {
        let cartId = req.params.cid 
        let productId = req.params.pid 
        res.status(200).send({status: "Ok", data: await carts.deleteProductInCart(cartId, productId)})
    } catch (error) {
        res.status(500).send({status: "ERROR", data: error.message})
    }
})

cartRouter.put("/carts/:cid", async (req,res) => {
    try {
        const cartId = req.params.cid
        const updatedProducts = req.body.products
        res.status(200).send({status: "Ok", data: await carts.updateCart(cartId, updatedProducts)}) 
    } catch (error) {
        res.status(500).send({status: "ERROR", data: error.message})
    }
    //Aca no tengo idea a que se refiere la consigna con "Un arrgelo de productos con el formato especificado arriba"

})

cartRouter.delete("/carts/:cid", async (req,res) => {
    try {
        let id = req.params.id 
        res.status(200).send({status: "Ok", data: await carts.deleteCart(id)})        
    } catch (error) {
        res.status(500).send({status: "ERROR", data: error.message})
    }

})

export default cartRouter