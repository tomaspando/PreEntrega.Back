import { Router } from "express";
import ProductManager from "../dao/ProductManagerMDB.js"

const productRouter = Router()
const product = new ProductManager


productRouter.get("/", async (req,res) => {
    //Recibir por Query params un limite, una page, un sort y un query

    try {
        let limit = parseInt(req.query.limit)
    
        if(!limit){
            const products = await product.getProducts(10)
            res.status(200).send({status: "Succes", payload: products})
        }else {
            const products = await product.getProducts(limit)
            res.status(200).send({status: "Succes", payload: products})
        }
        
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
    let id = req.params.id
    res.send(await product.getProductsById(id))
})

productRouter.post("/", async (req, res) => {
    let newProduct = req.body
    res.send(await product.addProducts(newProduct) )
} )

productRouter.put("/:id", async (req,res) => {
    let id = req.params.id
    let updateProduct = req.body 
    res.send(await product.updateProducts(id, updateProduct))
})

productRouter.delete("/:id", async (req,res) => {
    let id = req.params.id
    res.send(await product.deleteProducts(id) )
})

export default productRouter