import {Router} from "express"
import userModel from "../dao/models/user.model.js"

const router = Router()

const auth = (req, res, next) => {
    try {
        if (req.session.user) {
            if (req.session.user.admin === true) {
                next()
            } else {
                res.status(403).send({ status: 'ERR', data: 'Usuario no admin' })
            }
        } else {
            res.status(401).send({ status: 'ERR', data: 'Usuario no autorizado' })
        }   
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
}

router.get("/", async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

router.get("/logout", async (req,res) => {
    try {
        req.session.destroy((error) => {
            if(error) {
                res.status(500).send({status: "Error", data: error.message})
            } else {
                //res.status(200).send({status: "Ok", data: "Sesion finalizada"})
                res.redirect("/login")
            }
        })
    } catch (error) {
        res.status(500).send({status:"Error", data: error.message})
    }
})

router.post("/login", async (req, res) => {
    try {
        const {user, pass} = req.body

        if (user === "cperren" && pass === "abc123")
        {
            req.session.user = {username: user, admin: true}
            //res.status(200).send({status: "Ok", data: "Sesion iniciada"})
            res.redirect("/profile")
        }
    } catch (error) {
        res.status(401).send({status:"Error", data: "Datos no válidos"})
    }
})

router.post("/register", async (req,res) => {
    try {
        
    } catch (error) {
        
    }
})

export default router