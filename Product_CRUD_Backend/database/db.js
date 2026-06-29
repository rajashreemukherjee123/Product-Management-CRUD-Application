const mongoose = require("mongoose");


async function checkConnection(){
    try{
        const dbUrl = process.env.MONGO_URL;
        await mongoose.connect(dbUrl);
        console.log("Mongoose connected"); 
    }catch(err){
        console.log(err);
    }
}

module.exports = checkConnection;
console.log("MongoDB globally connected");