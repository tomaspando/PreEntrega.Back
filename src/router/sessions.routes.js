import {Router} from "express"
import userModel from "../dao/models/user.model.js"
import  UserManager  from "../dao/user.controller.mdb.js"


const sessionRouter = Router()
const user = new UserManager

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

sessionRouter.get("/", async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

sessionRouter.get("/logout", async (req,res) => {
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

sessionRouter.post("/login", async (req, res) => {
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

sessionRouter.post("/register", async(req,res) => {
    try {
        const {first_name, last_name, email, password} = req.body 

        //Verificamos si el usuario ya existe

        const existingUser = await userModel.findOne({email})

        if(existingUser){
            return res.status(400).json({error: "El usuario ya existe"})
        }

        //Crear nuevo usuario

        const newUser = new userModel({first_name, last_name, email, password})

        await newUser.save()

        res.status(201).json({message: "Usuario creado exitosamente"})
    } catch (error) {
        console.error("Error al crear usuario", error)

        res.status(500).json({error:"Error interno del servidor"})
    }
} )

export default sessionRouter