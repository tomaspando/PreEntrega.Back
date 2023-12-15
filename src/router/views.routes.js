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

viewsRouter.get("/products", async (req,res) => {
    const data = await product.getProductsPaginated(req.query.page || 1, req.query.limit || 50)

    data.pages = []
    for (let i = 1; i <= data.totalPages; i++) data.pages.push(i)

    res.render('products', {
        title: 'Listado de Productos',
        data: data
    })
})

viewsRouter.get("/login", async (req,res) => {
    res.render("login", {})
})

viewsRouter.get("/carts/:cid", async (req,res) => {

})



export default viewsRouter