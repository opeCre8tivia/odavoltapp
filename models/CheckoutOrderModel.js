const mongoose = require('mongoose');


const CheckoutOrderSchema = mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    orderDetails:{
        type:Array,
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
        default:'SOROTI'
    }
});

const CheckoutOrderModel = mongoose.model('CheckoutOrders', CheckoutOrderSchema);

module.exports =  CheckoutOrderModel;