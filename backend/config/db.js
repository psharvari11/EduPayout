const mongoose=require("mongoose")
require("dotenv").config();
const MONGO_URI=process.env.MONGO_URI
const connectdb=async()=>{
    try{
        await mongoose.connect(MONGO_URI)
        console.log("Connected to Db")
    }
    catch(err){
        console.log("error connecting to Mongo Db:",err)
          process.exit(1);
    }
    
}
module.exports=connectdb;