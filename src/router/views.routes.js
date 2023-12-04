import { Router } from "express";
import ProductManager from "../dao/ProductManagerMDB.js"

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

viewsRouter.get("/messages", async (req, res) => {
    res.render("chat" , {
        title: "Chat"
    })
})



export default viewsRouter