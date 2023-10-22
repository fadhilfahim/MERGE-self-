const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    supplier: {
        type : String ,
        required: true
    },
    description: {
        type: String,
        
    },
    quantity: {
        type: Number,
        required: true
    },
    reOrderLevel: {
        type: Number,
        default: function() {return Math.max(1, Math.round(this.quantity * 0.05)) }
    },
    price: {
        type: Number,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Product', productSchema)
