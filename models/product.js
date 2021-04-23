const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    description:{
        type:String,
        trim:true,
        required:true,
        maxlength:2000
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Category",
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    sold:{
        type:Number
    },
    photo:{
        data:Buffer,
        contentType:String
    }
});


module.exports = mongoose.model("Product",productSchema);