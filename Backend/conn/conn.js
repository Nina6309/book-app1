const mongoose = require("mongoose");
const conn = async()=>{
    try {
       const  response = await mongoose.connect(
        `${process.env.Mongo_URI}`
       );
       if (response){
        console.log("connected to db")
       }
         
        
    } catch (error) {
        console.log("error was found",error)
        
    }
};
module.exports = conn;