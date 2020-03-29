//since its database we need mongoose
//we are to usemongoose.Schema and mongoose.model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    nearestPoint:{
        type:String,
        default:'not filled'
    },
    OrderNumber:{
        type:Number,
        default:Math.random(),
        required:true
    },
    client:{
      
        type:String,
        default:'client-'
  
    },
    orderDetails:{
       type:Array
    },
    orderTotal:{
        type:String
    },
    geolocation:{
        latitude:{
            type:Number,
            default:0
        },
        longitude:{
            type:Number,
            default:0
        }
    },
    time:{
        type:Object,
        
        default:new Date()
    },
    newOrder:{
        type:Boolean,
        default:true
    },
});

const OrderModel = mongoose.model("CustomerOrders", OrderSchema);

module.exports = OrderModel;