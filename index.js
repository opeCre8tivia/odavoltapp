const express = require('express');
const path  =  require('path');
const mongoose = require('mongoose');
const cors = require('cors');


//init the app

const app = express();
const PORT = process.env.PORT || 5000;

//connecting to mongodb

//mongodb+srv://opeodavolt:<password>@cluster0-u4gqc.mongodb.net/test?retryWrites=true&w=majority
//mongodb://localhost:27017/ordervolt

mongoose.connect(process.env.MONGOLAB_ROSE_URI || 'mongodb://localhost:27017/ordervolt',  {useNewUrlParser : true,useUnifiedTopology: true, useFindAndModify:false}, (err)=>{
    if(err === true){
        console.log('Not Connected to db');
    }
    else{
        console.log('Connected to db');
    }
});

// body parser middleware

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//cors middle ware to allow requests from diffrent domain name

app.use(cors());


//routes
app.use('/api', require('./routes/Register'));
app.use('/api', require('./routes/Auth'));
app.use('/api', require('./routes/Products'));
app.use('/api', require('./routes/Orders'));
app.use('/api', require('./routes/LogedinUserOrder'));
app.use('/api', require('./routes/CheckoutOrders'));



//step 3 heroku deploy => make sure its under routes

if(process.env.NODE_ENV === 'production'){
    //check if in production run the build react folder
    app.use(express.static('client/build'));

    //redirect all other routes to index
    app.get('*', (req,res)=>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')) //relative path
    })
}



// listen on port
app.listen(PORT,  (req, res)=>{
    console.log(`Ov Server started at port ${PORT}`)
} );

