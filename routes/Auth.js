const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Router = express.Router();


const User = require('../models/User')


//@route  POST  api/auth
//@des authenticate user info and return token
//@access public

Router.post('/auth', async (req,res)=>{
    const {mobile, password} = req.body;

    try {
         //check if user exists
    const user = await User.findOne({mobile:mobile})
    if(!user){
        res.json({
            ov_err:true,
            msg:'Account Does Not Exist'
        })
    }

    else{

        const isMatch =await bcrypt.compare(password,user.password)
        console.log(isMatch)

        //set token
        if(isMatch){
            const payload = {
                user:{
                    id:user.id
                }
            }
        
            const secret = 'dotodavoltdot';
        
            jwt.sign(payload,secret, {expiresIn:36000}, (err, token)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.send(token);
                    }
            })
        }
        else{
            res.json({
                ov_err:true,
                msg:'Wrong Password'
            }) 
        }
       
        }
        
    } catch (err) {
        if(err){
            console.log(err.message)
            res.status(400).json({
                msg:'Server error ....'
            })
        }
    }
   

    
})



//@route  GET  api/auth
//@des can only be accessed with a token => return user data
//@access Private

Router.get('/auth', auth, async(req,res)=>{
    try {
        //find user by the id in req.user.id
        const id = req.user.id  
     const user = await  User.findById({_id:id})

     if(user){
         res.status(200).json({
             name:user.name,
             mobile:user.mobile,
             id:user._id,
             profilePix:user.profilePix

         })
     }
     else{
         res.status(400).json({
             msg:'Tech problem'
         })
     }



    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            msg:'Server Error'
        })
    }                         
    
})

module.exports = Router;