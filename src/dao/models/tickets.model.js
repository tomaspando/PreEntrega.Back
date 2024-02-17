import mongoose, { Schema } from 'mongoose' 
import bcrypt from "bcrypt"

mongoose.pluralize(null)

const collection = 'tickets' 

const schema = new mongoose.Schema({
    code: { type: String, default: () => bcrypt.genSaltSync(8) },
    purchase_datetime: {type: Date, default: new Date().toISOString()},
    amount: {type: Number, default: 0},
    purchaser:{type: Schema.Types.ObjectId, required: true},
});

const model = mongoose.model(collection, schema)
export default model 