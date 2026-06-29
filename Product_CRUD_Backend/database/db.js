const mongoose = require("mongoose");
const env = require("dotenv").config();

const dbUrl = process.env.MONGO_URL;

async function checkConnection(){
    try{
        await mongoose.connect(dbUrl);
        console.log("Mongoose connected"); 
    }catch(err){
        console.log(err);
    }
}

module.exports = checkConnection;
console.log("MongoDB globally connected");