const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ProductModel = require('../models/ProductModel');
const AnonModel = require('../models/AnonModel');




/*route  GET /api/product-cart
* desc   gets all products from the db
*acess  public
*/

router.get('/product-cart', async (req,res)=>{
    try {

        const products = await AnonModel.find({});
        res.status(200).json(products);
        
    } catch (err) {
       res.send(err.message) 
    }
});


/*route  GET /api/product-cart
* desc   gets ONE products from the db
*acess  public
*/

router.get('/product-cart/:id', async(req,res)=>{
    try {
        
        const found = await ProductModel.findOne(req.params.id);
        res.json(found);

    } catch (err) {
        res.send(err.message)
    }
});


//@router  GET /api/product-cart
//@desc    adds anonymous orders to Anon document in the db
//@acess   private.
router.post('/product-cart', async (req,res)=>{

    const id = req.body.id;
    const anonUserToken = req.body.anonUserToken.toString();
   
    try {
        //use id in params to load item data
       const loadedItem = await ProductModel.findById({_id:id});
       const {name,description,units,unitPrice,minPrice,count,deliverToDistrict,imageUrl} = loadedItem;
       //save item to anonymous section
       const newAnonItem = new AnonModel({
                anonUserToken,
                name,
                description,
                units,
                unitPrice,
                minPrice,
                count,
                deliverToDistrict,
                imageUrl
       });
       await newAnonItem.save(err=>{
           if(!err){
               res.json({
                   msg:"Item added"
               })
           }
       });
        
    } catch (err) {
        console.log(err.message);
        res.json({
            msg:'Server error in anon'
        })
    }

  
})




/*route  PUT /api/product-cart
* desc   updates a product
*acess  public
*/
router.put('/product-cart/:id', async(req,res)=>{
    try {
        
        const response = await AnonModel.findOneAndUpdate({name:req.body.name, anonUserToken:req.body.anonUserToken}, req.body);
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

router.delete('/product-cart/:id', async(req,res)=>{
                //trim and split to reformat the id
                let datax= req.params.id.trim();
                let datax2 = datax.split(":");
                let id = datax2[1];

            try {
                const response = await AnonModel.findByIdAndDelete({_id:id});
                if(response){
                    res.json({
                        ov_err:false,
                        msg:'Item Deleted Successfully'
                    })
                }
                else{
                    res.json({
                        ov_err:true,
                        msg:'Item Not Deleted'
                    })  
                }
                
            } catch (err) {
                res.send(err.message)
            }
       
}) 
    
         

module.exports = router;

