import mongoose from 'mongoose'
import mongoosePaginate from "mongoose-paginate-v2"

mongoose.pluralize(null)

const collection = 'products' //La coleccion se llama products. Es coleccion tiene este esquema: 

const schema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: false },
    code: { type: String, required: true },
    stock: { type: Number, required: true },
    owner: {type: String, required: true},
});

schema.plugin(mongoosePaginate)

const model = mongoose.model(collection, schema)
export default model 