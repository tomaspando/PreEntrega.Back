import { Router } from "express";
import ProductManager from "../dao/ProductManagerMDB.js"

const productRouter = Router()
const product = new ProductManager


productRouter.get("/", async (req,res) => {
    let limit = parseInt(req.query.limit)
    if(!limit) return res.send(await product.getProducts())
    let allProducts = await product.getProducts()
    let productLimit = allProducts.slice(0,limit)
    res.send(productLimit)
    
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