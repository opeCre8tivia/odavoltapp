const mongoose = require('mongoose');


const LogedinUserSchema = mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
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
   
    count:{
        type:Number,
        default:1
    },
    minPrice:{
        type:Number,
        required:true
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
    time:{
        type:Object
    },
    status:{
        type:String,
        default:"new"
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

const LogedinUserModel = mongoose.model('LogedinuserOrders', LogedinUserSchema);

module.exports =  LogedinUserModel;