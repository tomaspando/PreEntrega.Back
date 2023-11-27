import mongoose from 'mongoose'

mongoose.pluralize(null)

const collection = 'carts' //La coleccion se llama products. Es coleccion tiene este esquema: 

const schema = new mongoose.Schema({
    product: { type: Array, required: true },
});

const model = mongoose.model(collection, schema)
export default model 