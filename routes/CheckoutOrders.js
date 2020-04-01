const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const CheckoutOrderModel = require('../models/CheckoutOrderModel');

/*route  GET /api/product-logedin-order
* desc   gets all products from to show inthe admin dash
*acess  PUBLIC
*/

router.get('/new-orders' , async (req,res)=>{
    try {
      
        const orders = await CheckoutOrderModel.find({});
        const newOrders = orders.filter(order => order.status === "new");
        if(newOrders){
            res.status(200).json(newOrders);
        }
        else{
            res.json({
                msg:'No new ordrs  Yet'
            })
        }
        
    } catch (err) {
        console.log(err.message)
       res.send('Server error ....') 
    }
    
}); 



//@router  POST /api/new-orders
//@desc    adds orders to the checkout table
//@acess   private.
router.post('/new-orders',auth,  async (req,res)=>{

    const user = req.user.id;
    //const userMobile = req.body.userMobile;

     //time of the order
     let date = new Date()

     let time = {
         year: date.getFullYear(),
         month:(date.getUTCMonth()+1),
         date:date.getDate(),
         hours:date.getHours(),
         minutes:date.getMinutes(),
         seconds:date.getSeconds()
     }
    
    
   
    try {
      
       const {name,mobile,orderDetails} = req.body;
       console.log(orderDetails);

       //save item to checkout document section
       const newItem = new CheckoutOrderModel({
                user,
                name,
                mobile,
                orderDetails,
                time,
               
       });
       await newItem.save(err=>{
           if(!err){
               res.json({
                   msg:"ORDER PLACED"
               })
           }
           else{
            res.json({
                msg:"ORDER NOT PLACED"
            }) 
           }
       });

    
        
    } catch (err) {
        console.log(err.message);
        res.json({
            msg:'Server error in checkout'
        })
    }

  
})


module.exports = router;
