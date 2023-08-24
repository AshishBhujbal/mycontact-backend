const mongoose = require('mongoose');

const connectDb =async()=>{
    try{
        const connect= await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Connected to Databse ","Host : ",connect.connection.host," Database : ",connect.connection.name);
    }
    catch(error)
    {
        console.log(error);
        process.exit(1);
    }
    
}

module.exports= connectDb