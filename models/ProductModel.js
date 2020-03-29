const mongoose = require('mongoose');


const ProductSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    units:{
        type:String,
        required:true
    },
    unitPrice:{
        type:Number,
        required:true
    },
    minPrice:{
        type:Number,
        required:true
    },
    count:{
        type:Number,
        default:1
    },
    instock:{
        type:Boolean,
        default:true
    },
    rating:{
        type:String,
        default:null
    },
    imageUrl:{
        type:String,
        required:true
    },
    addedOn:{
        type:Date,
        default: new Date()
    },
    deliverToDistrict:{
        type:String,
        required:true
    },
    cartegory:{
        type:String,
        default:'grocery'
    },

});

const ProductModel = mongoose.model('Products', ProductSchema);

module.exports =  ProductModel;