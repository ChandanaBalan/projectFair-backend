//import mongoose
const mongoose = require('mongoose')

connectionString = process.env.DataBase
mongoose.connect(connectionString).then((res)=>{
    console.log('MongoDB connection successfull');
    
}).catch((err)=>{
    console.log(`MongoDB connection Failed ${err}`);
    
})