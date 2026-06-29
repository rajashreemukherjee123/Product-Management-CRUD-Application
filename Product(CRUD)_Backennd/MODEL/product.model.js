const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productName : {
        type : String,
        required : [true,"productName is required"]
    },
    price : {
        type : Number,
        required : [true,"price is required"]
    },
    description : {
        type : String,
        required : [true,"Description is required"],
        validate : {
            validator : (desValue)=>{
                if(desValue.length<=120){
                    return true
                }else{
                    return false
                }
            },
            message : ()=>`Description must be within 120 chars only`
        }
    },
    userId : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : "userModel" 
    },                   
    created : {
        type : Date,
        default : new Date()
    }

},{versionKey:false});

module.exports = mongoose.model("productModel",productSchema,"products");
console.log("produtModel is ready to use");