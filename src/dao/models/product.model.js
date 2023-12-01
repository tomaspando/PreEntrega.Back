import mongoose from 'mongoose'

mongoose.pluralize(null)

const collection = 'products' //La coleccion se llama products. Es coleccion tiene este esquema: 

const schema = new mongoose.Schema({
    title: { type: String, required: true /* index: true */ },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: false },
    code: { type: String, required: true },
    stock: { type: Number, required: true }
});

const model = mongoose.model(collection, schema)
export default model 