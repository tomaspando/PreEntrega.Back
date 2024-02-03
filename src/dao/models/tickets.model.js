import mongoose from 'mongoose'

mongoose.pluralize(null)

const collection = 'tickets' 

const schema = new mongoose.Schema({
    code: { type: String, required: true },
    purchase_datetime: Date.now(),
    amount: {type: Number, required: true},
    purchaser:"",
});

const model = mongoose.model(collection, schema)
export default model 