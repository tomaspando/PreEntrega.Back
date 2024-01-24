import { Router } from "express";
import CartManager from "../controllers/cart.controller.mdb.js"

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

cartRouter.put("/:cid", async (req,res) => {
    try {
        const cartId = req.params.cid
        const updatedProducts = req.body.products
        res.status(200).send({status: "Ok", data: await carts.updateCart(cartId, updatedProducts)}) 
    } catch (error) {
        res.status(500).send({status: "ERROR", data: error.message})
    }
    //Aca no tengo idea a que se refiere la consigna con "Un arrgelo de productos con el formato especificado arriba"

})

cartRouter.put("/:cid/products/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;

    try {

        // Aquí deberías tener lógica para validar la cantidad y manejar errores.
    
        // Llamas a tu función para actualizar la cantidad del producto en el carrito.
        const result = await carts.updateProductQuantity(cartId, productId, quantity);
    
        res.status(200).send(result);
    
    } catch (error) {
    
        res.status(500).send({ status: 'Error', message: 'Error al actualizar la cantidad del producto en el carrito.' });
    
    }
    
});

cartRouter.delete("/:cid", async (req,res) => {
    try {
        let id = req.params.id 
        res.status(200).send({status: "Ok", data: await carts.deleteCart(id)})        
    } catch (error) {
        res.status(500).send({status: "ERROR", data: error.message})
    }

})

cartRouter.delete("/:cid/products/:pid" , async (req,res) => {
    const cartId = req.params.cid;

    const productId = req.params.pid;

    try {

    // Llamas a tu función para eliminar el producto del carrito.

    const result = await carts.deleteProductInCart(cartId, productId);

    res.status(200).send({ status: 'OK', data: result });

    } catch (error) {

    res.status(500).send({ status: 'Error', message: 'Error al eliminar el producto del carrito.' });

    }
})



export default cartRouter