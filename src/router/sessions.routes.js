import {Router} from "express"
import { createHash, isValidPassword, generateToken } from "../utils.js"
import userModel from "../dao/models/user.model.js"
import  UserManager  from "../dao/user.controller.mdb.js"
import passport from "passport"
import initPassport from "../config/passport.config.js"

//Inicializamos instancia de estrategia
initPassport()

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

// Este mid de autorización nos permite comenzar a manejar el tema de roles, es decir,
// niveles de permisos de usuario
const authorization = role => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send({ status: 'ERR', data: 'No autenticado' });
        if (req.user.user.role !== role) return res.status(403).send({ status: 'ERR', data: 'Sin permisos suficientes' });
        next();
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

sessionRouter.get('/failregister', async (req, res) => {
    res.status(400).send({ status: 'ERR', data: 'El email ya existe o faltan datos obligatorios' })
})

sessionRouter.get('/github', passport.authenticate('githubAuth', { scope: ['user:email'] }), async (req, res) => {
})

sessionRouter.get('/githubcallback', passport.authenticate('githubAuth', { failureRedirect: '/login' }), async (req, res) => {
    req.session.user = { username: req.user.email, admin: true }
    // req.session.user = req.user
    res.redirect('/profile')
})

sessionRouter.get("/current", (req, res) => {

    if (req.user) {
    
    const user = req.user
    
    res.status(200).send({ message: "Inicio de sesión exitoso", user })
    
    } else {
    
    res.redirect("/login");
    
    }
    
    })


sessionRouter.post("/login", async (req, res) => {
    try {
        const {email, pass} = req.body

        //FindOne nos devuelve el primero que coincida
        const userInDb = await userModel.findOne({email: email})

        if(userInDb !== null && isValidPassword(userInDb, pass)){
            //Usando Sessions:

            req.session.user = {username: email, admin: true}
            //res.status(200).send({status: "Ok", data: "Sesion iniciada"})
            res.redirect("/profile")

            //Usando Tokens JWT:

            //const access_token = generateToken({username: email, role: "user"}, "1h")
            //res.cookie("codertoken", access_token, {maxAge: 60 * 60 *1000, httpOnly: true})
            //res.status(200).send({status: "OK", data: {access: "authorized", token: access_token}} )
        }
    } catch (error) {
        res.status(401).send({status:"Error", data: "Datos no válidos"})
    }
})

sessionRouter.post('/register', passport.authenticate('registerAuth', { failureRedirect: '/api/sessions/failregister' }), async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: 'Usuario registrado' })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

/* sessionRouter.post("/register", async(req,res) => {
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
} ) */

sessionRouter.post('/restore', passport.authenticate('restoreAuth', { failureRedirect: '/api/sessions/failrestore' }), async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: 'Clave actualizada' })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

export default sessionRouter