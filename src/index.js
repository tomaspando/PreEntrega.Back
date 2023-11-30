import express from "express"
import mongoose from "mongoose"
import handlebars from "express-handlebars"
import {Server} from "socket.io"

import productRouter from "./router/product.routes.js"
import cartRouter from "./router/carts.routes.js"
import viewsRouter from "./router/views.routes.js"
import { __dirname } from "./utils.js"

const app = express()
const PORT = 8080
const MONGOOSE_URL = "mongodb+srv://tomas_pando:poker1994@coder.wds0shg.mongodb.net/ecommerce"




app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine("handlebars", handlebars.engine())
app.set("views", `${__dirname}/views`)
app.set("view engine", "handlebars")

app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)
app.use("/", viewsRouter)

app.use("/static", express.static(`${__dirname}/public`))

try {
    await mongoose.connect(MONGOOSE_URL)
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

        socket.on("message", data => {
            console.log(data)
            socket.emit("confirmation", "Esta es la confirmación")
        }) //Aca el SERVIDOR escucha y luego con el Emit, emite. 

        socket.on("new_message", data => {
        socketServer.emit("message_added", data)
        })

        socket.on("message", data => {
            socket.on("message", data => {
                chat_messages.push(data)
                socketServer.emit("messageLogs", chat_messages)
            })
        })
    })
    /* app.listen(PORT, () => {
        console.log("Backend activo y conectado a BBDD")
    }) */
} catch (error) {
    console.log("No se puede conectar con bbdd", error.message)
}

