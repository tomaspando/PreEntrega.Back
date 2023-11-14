import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js"

const viewsRouter = Router()
const product = new ProductManager


viewsRouter.get("/", async (req,res) => {
    let allProducts = await product.getProducts()
    res.render("home",  {
        title: "Tienda RF",
        products: allProducts
    })
})

viewsRouter.get("/realtimeproducts", async (req,res) => {
    let allProducts = await product.getProducts()

    res.render("realTimeProducts", {
        title: "Prueba",
        products: allProducts
    })
})

export default viewsRouter