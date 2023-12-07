import { Router } from "express";
import ProductManager from "../dao/ProductManagerMDB.js"

const viewsRouter = Router()
const product = new ProductManager


viewsRouter.get("/", async (req,res) => {

/*     let allProducts = await product.getProducts()
    res.render("home",  {
        title: "Tienda RF",
        products: allProducts
    }) */

    let limit = parseInt(req.query.limit)

    if(!limit){
        res.render("home",  {
            title: "Tienda RF",
            products: await product.getProducts(10)
        })
    }else {
        res.render("home",  {
            title: "Tienda RF",
            products: await product.getProducts(limit)
        })
    }

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