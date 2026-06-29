const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true,"Name is required"],
        validate:{
            validator:(nameValue)=>{
                return (/^(?=.{3,100}$)[A-Za-z]+(?:\s[A-Za-z]+)+$/).test(nameValue);
            },
            message : (prop)=>`${prop.value}Name length gretter than 3 char and gap between name and surname`
        }
    },
    email : {
        type : String,
        required : [true,"Email is required"],
        unique: true,
        validate:{
            validator:(emailValue)=>{
                return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(emailValue);
            },
            message : (prop)=>`${prop.value} @ maintion in email`
        }
    },
    pass1 : {
        type : String,
        required : [true,"Password is required"]
    },
    created : {
        type : Date,
        default : new Date()
    }
},{versionKey:false});

module.exports = mongoose.model("userModel",userSchema,"users");  
console.log("userModel is ready to use");