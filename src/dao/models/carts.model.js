import mongoose from 'mongoose'
import productModel from "./product.model.js"

mongoose.pluralize(null)

const collection = 'carts' //La coleccion se llama products. Es coleccion tiene este esquema: 

const schema = new mongoose.Schema({
    //products:{type: [{pid: mongoose.Schema.Types.ObjectId, qty: Number}], ref: "products"} //El profe lo tiene así por algún motivo. 
    products: { type: [mongoose.Schema.Types.ObjectId], ref: "products", required: true },
    total: {type: Number, required: true}
});

schema.pre("find", function() {
    this.populate({path: "products.pid", model: productModel})
})

schema.pre("findById", function() {
    this.populate({path: "products.pid", model: productModel})
})

const model = mongoose.model(collection, schema)
export default model 