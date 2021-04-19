const mongoose = require("mongoose");

const productCartSchema = new mongoose.Schema({
    product:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Product"
    },
    name:String,
    count:Number,
    price:Number
});

const ProductCart = mongoose.model("ProductCart",productCartSchema);


const orderSchema = new mongoose.Schema({
    products : [ProductCartSchema],
    transaction_id:{},
    amount:{type:Number},
    address:String,
    updated:Date,
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    }
},{timestamps:true});

const Order = mongoose.model("Order",orderSchema);


module.exports = {Order,ProductCart} ;