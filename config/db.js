const mongoose = require('mongoose');
const config = require('config');

const db = config.get('MONGODB_URI');

const connectDB = () =>{
    mongoose
    .connect(db,  {
        useNewUrlParser : true,
        useUnifiedTopology: true,
        useFindAndModify:false
    })
    .then(()=> console.log('odavolt db connected'))
    .catch(err =>{
        console.log(err.message);
        process.exit(1);
    })
}

module.exports = connectDB;