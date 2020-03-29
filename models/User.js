const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePix:{
        type:String,
        default:"/user-icon.png"
    },
    client:{
      
        type:String,
        default:'client-'
  
    },
    ip:{
      
        type:String,
        default:'0'
  
    },
    time:{
        type:Object,
        
        default:new Date()
    }
   
});

const User = mongoose.model("Users", UserSchema);

module.exports = User;