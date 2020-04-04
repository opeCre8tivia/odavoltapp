const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


//product model
const ProductModel = require('../models/ProductModel')





/*route  GET /api/products
* desc   gets all products from the db
*acess  public
*/

router.get('/product', async (req,res,next)=>{
        try {

            const products = await ProductModel.find({});
            res.status(200).json(products);
            
        } catch (err) {
           res.send(err.message) 
        }
});




/*route  GET /api/products
* desc   gets one products from the db
*acess  public
*/

router.get('/product/:id', async(req,res,next)=>{
        try {
            
            const found = await ProductModel.findById({_id:req.params.id});
            res.json(found);

        } catch (err) {
            res.send(err.message)
        }
});


/*route  POST /api/products
* desc   adds products to the db
*acess  private
*/
router.post('/product', async (req,res)=>{
        const imageUrl = '';
    //capture uploaded image info
    if(req.files === null){
        return res.json({
            msg:'No file selected'
        })
    }
    console.log(req.files)
    const file = req.files.file;
        file.mv(`${__dirname}/client/public/uploads${file.name}`, (err)=>{
        if(err){
            console.log(err);
            return res.status(400).send(err)
        }

        //assign to variables
        imageUrl = `/uploads/${file.name}`


    })
    
    
    //get form data
    const {name,description,units,unitPrice,minPrice,deliverToDistrict} = req.body;
    
    try {

        //check if similar product doesnt exist
    const isExist = await ProductModel.findOne({name:name})
      
   if(isExist){
    res.json({
        ov_err:true,
        msg:'Product  already added'
    })
   }
   else{

    //create an object to save
    const newProduct = new ProductModel({
        name,
        description,
        units,
        unitPrice,
        minPrice,
        deliverToDistrict,
        imageUrl
    })

    //call  save method 
    await newProduct.save(err =>{
        if(err){
            console.log(err.message);
            res.status(400).json({
                ov_err:true,
                msg:'Product not added'
            })
        }
        else{
            res.status(200).json({
                ov_err:false,
                msg:'Product added sucessfully',
                
            })
        }
    })
    }
        
    } catch (err) {
        res.send(err.message)
    }
    
})





/*route  PUT /api/products
* desc   updates a product
*acess  public
*/
router.put('/product/:id', async(req,res,next)=>{
    try {
        
        const response = await ProductModel.findByIdAndUpdate({_id:req.params.id}, req.body);
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



/*route  DELETE /api/products
* desc   deletes a product
*acess  public
*/

router.delete('/product/:id', async(req,res)=>{
    console.log(typeof(req.params.id));
    try {
        
        const response = await ProductModel.findByIdAndDelete({_id:req.params.id});
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



module.exports = router;












