import { Router } from "express";
import ProductManager from "../dao/ProductManagerMDB.js"
import CartManager from "../dao/CartManagerMDB.js";

const viewsRouter = Router()
const productManager = new ProductManager
const cartManager = new CartManager



viewsRouter.get("/", async (req,res) => {

/*     let allProducts = await product.getProducts()
    res.render("home",  {
        title: "Tienda RF",
        products: allProducts
    }) */

    if(req.session.user) {
        let limit = parseInt(req.query.limit)
    
        if(!limit){
            res.render("home",  {
                title: "Tienda RF",
                products: await productManager.getProducts(10)
            })
        }else {
            res.render("home",  {
                title: "Tienda RF",
                products: await productManager.getProducts(limit)
            })
        }

    } else {
        res.redirect("/login")
    }


})

viewsRouter.get("/realtimeproducts", async (req,res) => {
    if(req.session.user) {
        let allProducts = await productManager.getProducts()
    
        res.render("realTimeProducts", {
            title: "Prueba",
            products: allProducts
        })
    } else {
        res.redirect("/login")
    }
})

viewsRouter.get("/messages", async (req, res) => {
    res.render("chat" , {
        title: "Chat"
    })
})

viewsRouter.get("/products", async (req,res) => {
    if(req.session.user && req.session.user.admin === true) {
        const data = await productManager.getProductsPaginated(req.query.page || 1, req.query.limit || 50)
    
        data.pages = []
        for (let i = 1; i <= data.totalPages; i++) data.pages.push(i)
    
        res.render('products', {
            title: 'Listado de Productos',
            data: data,
            user: req.session.user
        })
    } else if (req.session.user) {
        res.redirect("/profile")
    }else {
        res.redirect("/login")
    }
})

viewsRouter.get("/login", async (req,res) => {
    if (req.session.user) {
        res.redirect("/profile")
    } else {
        res.render("login", {})
    }
})

viewsRouter.get("/register", async (req,res) => {
    res.render("register", {})

    //La vista que apuntarla a algun endpoint; por ejemplo de login.handlebars, el form, apunta /api/sessions/login que es el endpoint que esta en sessions.routes. Tenemos que hacer otro para el registro y apuntar la plantilla ahi. 
})

viewsRouter.get("/profile", async (req,res) => {
    if (req.session.user) {
        res.render("profile", { user: req.session.user})
    } else {
        res.redirect("/login")
    }
})

viewsRouter.get("/carts/:cid", async (req,res) => {
    const id = req.params.cid
    const cart = await cartManager.getCartById(id)

    res.render('cart', {
        title: 'Productos en carrito',
        data: cart
    })
})

viewsRouter.get('/restore', async (req, res) => {
    if (req.session.user) {
        res.redirect('/profile')
    } else {
        res.render('restore', {})
    }
})



export default viewsRouter