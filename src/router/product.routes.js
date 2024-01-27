import { Router } from "express";
import ProductManager from "../controllers/product.controller.mdb.js"

const productRouter = Router()
const product = new ProductManager


productRouter.get("/", async (req,res) => {
    //Recibir por Query params un limite, una page, un sort y un query

    try {
        const limit = parseInt(req.query.limit) || 10
        
        const products = await product.getProducts(limit)
        res.status(200).send({status: "Succes", payload: products})
    
    } catch (error) {
        res.status(500).send({status: "Error", data: error.message})
    }


    /* let limit = parseInt(req.query.limit)
    if(!limit) return res.send(await product.getProducts())
    let allProducts = await product.getProducts()
    let productLimit = allProducts.slice(0,limit)
    res.send(productLimit) */
    
})

productRouter.get("/:id", async (req,res) => {
    try {
        let id = req.params.id
        res.status(200).send({status: "Ok", data: await product.getProductsById(id)()})
    } catch (error) {
        res.status(500).send({status: "ERROR", data: error.message})
    }
})

productRouter.post("/", async (req, res) => {
    try {
        //let newProduct = req.body
        //res.status(200).send({status: "Ok", data: await product.addProducts(newProduct)()})

        const { title, description, price, code, stock } = req.body;

        if (!title || !price || !code || !stock) {
            return res
                .status(400)
                .send({ status: "ERR", data: "Faltan campos obligatorios" });
        }

        const newContent = {
            title,
            description,
            price,
            thumbnail: req.file.filename,
            code,
            stock,
        };

        const normalizedProduct = new ProductDTO(newContent);
        const result = await product.addProducts(normalizedProduct);

        // Si deseamos emitir algún evento de socket.io, primero necesitamos
        // obtener el objeto que seteamos en app.js y luego hacer un emit()
        const socketServer = req.app.get("socketServer");

        res.status(200).send({ status: "OK", data: result });
    } catch (error) {
        res.status(500).send({status: "ERROR", data: error.message})
    }
} )

productRouter.put("/:id", async (req,res) => {
    try {
        let id = req.params.id
        let updateProduct = req.body 
        res.status(200).send({status: "Ok", data: await product.updateProducts(id, updateProduct)()})
    } catch (error) {
        res.status(500).send({status: "ERROR", data: error.message})
    }
})

productRouter.delete("/:id", async (req,res) => {
    try {
        let id = req.params.id
        res.status(200).send({status: "Ok", data: await product.product.deleteProducts(id)()})
    } catch (error) {
        res.status(500).send({status: "ERROR", data: error.message})
    }
})

export default productRouter