const mongoose = require("mongoose");
const env = require("dotenv").config();

const dbUrl = `mongodb://${process.env.HOST}:${process.env.DB_PORT}/HelloDB`;

async function checkConnection(){
    try{
        await mongoose.connect(dbUrl);
        console.log("Mongoose connected"); 
    }catch(err){
        console.log(err);
    }
}

module.exports = checkConnection();
console.log("MongoDB globally connected");