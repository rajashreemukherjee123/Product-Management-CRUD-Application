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
        ref : "userModel" //// eikhane model er name likhte hoy (userId chaichi seta userModel er moddhe ache tai userModel hbe.... collection er name likhle kin2 hbe na) 
    },                   ////  populate() model er naam diye kaj kore, collection er naam diye na। Tai ref: "users" dile populate kichhu khuje payna, blank object {} return kore।
    created : {
        type : Date,
        default : new Date()
    }

},{versionKey:false});

module.exports = mongoose.model("productModel",productSchema,"products");
console.log("produtModel is ready to use");