import express from "express"
import mongoose from "mongoose"
import handlebars from "express-handlebars"
import {Server} from "socket.io"
import session from "express-session"
import FileStore  from "session-file-store"
import MongoStore from "connect-mongo"

import productRouter from "./router/product.routes.js"
import cartRouter from "./router/carts.routes.js"
import viewsRouter from "./router/views.routes.js"
import sessionsRouter from "./router/sessions.routes.js"

import { __dirname } from "./utils.js"
import chatModel from "./dao/models/messages.model.js"

const app = express()
const PORT = 8080
const MONGOOSE_URL = "mongodb+srv://tomas_pando:poker1994@coder.wds0shg.mongodb.net/ecommerce"




app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Instancia para almacenamiento de sesiones en Archivo
const fileStorage = FileStore(session)
app.use(session({
    //store: new fileStorage({path:"./sessions", ttl: 60, retries: 0}),
    store: MongoStore.create({mongoUrl: MONGOOSE_URL, mongoOptions: {}, ttl: 60, clearInterval: 5000}),//Datos de sesion a MongoDB; TTL: Tiempo de vida de la sesion en segundos.
    secret: "abd123",
    resave: false,
    saveUninitialized: false
}))

app.engine("handlebars", handlebars.engine())
app.set("views", `${__dirname}/views`)
app.set("view engine", "handlebars")

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use("/api/sessions", sessionsRouter)
app.use("/", viewsRouter)

app.use("/static", express.static(`${__dirname}/public`))

try {
    await mongoose.connect(MONGOOSE_URL);    

    mongoose.connection.on("connected", () => {

        console.log("Conexión a MongoDB establecida con éxito");
    })

    mongoose.connection.on("disconnected", () => {

        console.log("Conexión a MongoDB desconectada");
        
        });

    const httpServer = app.listen(PORT, () => {
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

