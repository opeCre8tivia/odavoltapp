const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const ProductModel = require('../models/ProductModel');
const LogedInUserModel = require('../models/LogedInUserModel');



//@router  GET /api/product-cart
//@desc    adds orders in the db
//@acess   private.
router.post('/product-logedin-order',auth,  async (req,res)=>{

    const id = req.body.id;
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
        //use id in params to load item data
        const loadedItem = await ProductModel.findById({_id:id});
       const {name,description,units,unitPrice,minPrice,count,deliverToDistrict,imageUrl} = loadedItem;

       //save item to anonymous section
       const newItem = new LogedInUserModel({
                user,
                name,
                description,
                units,
                unitPrice,
                minPrice,
                count,
                time,
                deliverToDistrict,
                imageUrl
       });
       await newItem.save(err=>{
           if(!err){
               res.json({
                   msg:"Item added"
               })
           }
           else{
            res.json({
                msg:"Item not added"
            }) 
           }
       });

    
        
    } catch (err) {
        console.log(err.message);
        res.json({
            msg:'Server error in logedin user route'
        })
    }

  
})




/*route  GET /api/product-logedin-order
* desc   gets all products from the db
*acess  PRIVATE
*/

router.get('/product-logedin-order' ,auth, async (req,res)=>{
    try {
      
        const products = await LogedInUserModel.find({user:req.user.id});
        res.status(200).json(products);
        
    } catch (err) {
        console.log(err.message)
       res.send('Server error ....') 
    }
    
});  



/*route  PUT /api/product-cart
* desc   updates a product
*acess  public
*/
router.put('/product-logedin-order/:id', auth, async(req,res)=>{
    try {
        
        const response = await LogedInUserModel.findOneAndUpdate({name:req.body.name}, req.body);
        if(response){
            res.json({
                ov_err:false,
               msg: 'Product Updated Successfully'
            })
    
        }
        else{
            res.json({
                ov_err:true,
               msg: 'Product Update Failed!'
            })
    
        }
    } catch (err) {
        res.send(err.message)
    }
});



/*route  DELETE /api/product-cart
* desc   delete products from the db
*acess  public
*/

router.delete('/product-logedin-order/:id', async (req,res,next)=>{

    //trim and split to reformat the id
        let datax= req.params.id.trim();
        let datax2 = datax.split(":");
        console.log(datax2);
        let id = datax2[1];
    try {
        
        const response = await LogedInUserModel.findByIdAndDelete({_id:id});
        if(response){
            res.json({
                ov_err:false,
               msg: 'Product Deleted Successfully'
            })
            
    
        }
        else{
            res.json({
                ov_err:true,
               msg: 'Product  Not Deleted'
            })
    
        }

        } catch (err) {
            res.send(err.message)
        }
    });   
        


/*route  DELETE ALL /api/product-cart
* desc   delete products from the db
*acess  public
*/

router.delete('/product-logedin-delete-all', auth, async (req,res,next)=>{

    
    try {
        
        const response = await LogedInUserModel.deleteMany({user:req.user.id});
        if(response){
            res.json({
                msg:'Cart cleared'
            })
        }
        
       

        } catch (err) {
            res.send(err.message)
        }
    });   

module.exports = router;

