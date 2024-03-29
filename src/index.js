import express from "express"
import mongoose from "mongoose"
import handlebars from "express-handlebars"
import {Server} from "socket.io"
import cookieParser from "cookie-parser"
import session from "express-session"
import FileStore  from "session-file-store"
import MongoStore from "connect-mongo"
import passport from "passport"
import cors from "cors"

import productRouter from "./router/product.routes.js"
import cartRouter from "./router/carts.routes.js"
import viewsRouter from "./router/views.routes.js"
import cookiesRouter from "./router/cookies.routes.js"
import sessionsRouter from "./router/sessions.routes.js"
import errorsDictionary from './services/error.dictionary.js';
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUiExpress from "swagger-ui-express"


import chatModel from "./dao/models/messages.model.js"
import config from "./config.js"
import MongoSingleton from "./services/mongo.singleton.js"
import addLogger from "./services/winston.logger.js"
import cluster from "cluster"
import os from "os"

const app = express()
//const MONGOOSE_URL = "mongodb+srv://tomas_pando:poker1994@coder.wds0shg.mongodb.net/ecommerce"


const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentacion Tienda",
            description: "Documentación sobre el proyecto final"
        },
    },
    apis: ["./src/docs/**/*.yaml"],
}
const specs = swaggerJSDoc(swaggerOptions)

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    next()
})
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({origin: "*", methods: "GET, POST, PUT, PATCH, DELETE"}))
app.use(cookieParser('secretKeyAbc123')) 
/* app.all('*', (req, res, next)=>{
    res.status(404).send({ status: 'ERR', data: errorsDictionary.PAGE_NOT_FOUND.message });
}); */ //Si uso esto la app deja de funcionar, no se por qué. 


//Instancia para almacenamiento de sesiones en Archivo
const fileStorage = FileStore(session)
app.use(session({
    //store: new fileStorage({path:"./sessions", ttl: 60, retries: 0}),
    store: MongoStore.create({mongoUrl: config.MONGOOSE_URL, mongoOptions: {}, ttl: 60, clearInterval: 5000}),//Datos de sesion a MongoDB; TTL: Tiempo de vida de la sesion en segundos.
    secret: "abd123",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.engine("handlebars", handlebars.engine())
app.set("views", `${config.__DIRNAME}/views`)
app.set("view engine", "handlebars")

app.use(addLogger)
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use("/api/sessions", sessionsRouter)
app.use("/", viewsRouter)
app.use("/api/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs) )

app.use("/static", express.static(`${config.__DIRNAME}/public`))

app.use((error, req,res,next) => {
    const code = error.code || 500;
    res.status(code).send({status: "Error", data: error.message})

})

app.all("*", (req,res, next) => {
    res.status(404).send({status: "Error", data: "Pagina no encontrada"})
})

try {
    //await mongoose.connect(config.MONGOOSE_URL); 
    MongoSingleton.getInstance()   

    mongoose.connection.on("connected", () => {

        console.log("Conexión a MongoDB establecida con éxito");
    })

    mongoose.connection.on("disconnected", () => {

        console.log("Conexión a MongoDB desconectada");
        
        });

    const httpServer = app.listen(config.PORT, () => {
        console.log("Servidor activo y conectado a BBDD")
    })

    const chat_messages = []
    const socketServer = new Server(httpServer, {
        cors: {
            origin:"*",
            methods: ["PUT","GET","POST","DELETE","OPTIONS"],
            credentials: false
        }
    })
    socketServer.on("connection", socket => {
        console.log(socket.id)

        socket.on("new_message", async data => {
            const message = new chatModel(data)
            await message.save()
            socketServer.emit("new_message", data)
        })

        socket.on("message", data => {
            chat_messages.push(data)
            socketServer.emit("messageLogs", chat_messages)
        })
        
    })
    /* app.listen(PORT, () => {
        console.log("Backend activo y conectado a BBDD")
    }) */
} catch (error) {
    console.log("No se puede conectar con bbdd", error.message)
}

process.on('SIGINT', async () => {

    try {
   
     // Realizar tareas de limpieza antes de cerrar la aplicación
   
     await mongoose.disconnect();
   
     console.log('Conexión a MongoDB cerrada correctamente');
   
   
   
     // Otros códigos de limpieza pueden ir aquí
   
   
   
     process.exit(0); // Salir del proceso con código de salida 0 (éxito)
   
    } catch (error) {
   
     console.error('Error al realizar tareas de limpieza:', error);
   
     process.exit(1); // Salir del proceso con código de salida 1 (error)
   
    }
   
});

