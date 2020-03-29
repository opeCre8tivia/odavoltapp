const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Router = express.Router();

const User = require('../models/User');


//@route  POST  api/register
//@des save user to db and return token
//@access public

Router.post('/users', async (req,res)=>{
    //get form data
    const { name, mobile, password, client, time,ip} = req.body;

    

    // hash the hash passsword
     try {

        //check wether user withthe same mobile number exists

        const user =await  User.findOne({mobile:mobile})
        if(user){
            res.status(400).json({
                error:true,
                msg:'Account Already Exists'
            })
        }
        else{

         //create user object to save

    const user = new User({
        name:name,
        mobile:mobile,
        password:password,
        client,
        time,
        ip
    });


    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password,salt);

    // save user

    await user.save(); //note save() returns the whole user object 
    

    //create and sign a token

     const secret = 'odadotvoltdot';
    const payload = {
        user:{
            id:user._id
        }
    }

     jwt.sign(payload, secret, {expiresIn:3600}, (err,token)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json({token})
            
        }
    })
   

} //close  of else
    
     } catch (err) {
         if(err){
             console.log(err.message);
             res.status(400).json({
                 msg:'server error...'
             })
         }
     }

    

})



module.exports = Router;