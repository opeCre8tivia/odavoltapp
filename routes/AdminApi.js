const express = require('express');
const router = express.Router();
const LogedInUserModel = require('../models/LogedInUserModel');

/*route  GET /api/product-logedin-order
* desc   gets all products from the db
*acess  PRIVATE
*/

router.get('/all-orders' , async (req,res)=>{
    try {
      
        const products = await LogedInUserModel.find({});
        res.status(200).json(products);
        
    } catch (err) {
        console.log(err.message)
       res.send('Server error ....') 
    }
    
}); 

module.exports = router;
