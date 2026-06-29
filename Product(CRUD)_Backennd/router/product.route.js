const express = require("express");

const productRouter = express.Router();

//import productModel
const productModel = require("../MODEL/product.model");

//import middleware
const checkAuth = require("../middleware/auth");


//--------------------------------------------- add product ---------------------------------------------
productRouter.post("/add",checkAuth, async(req,res)=>{
    try{
        let productObj = await productModel.create({
        productName : req.body.productName,
        price : req.body.price,
        description : req.body.description,
        userId : req.user.user_id, // req.user eita asche middleware theke.. eikhane middleware a j varifytoken ta hochhe setar moddhe j userId ta ache sei ta k nichhe... last er user_id ta userRouter er jwt token er payload theke newa hoyeche....

        });
        if(!productObj){
            return res.status(400).json({"message":"Unable to add product"});
        }else{
            res.status(200).json({"message":"Product added successfully"});
        }
    }catch(err){
        res.status(500).json(err);
    }
})


// --------------------------------------------- Show login user's product ---------------------------------------------
productRouter.get("/my_product",checkAuth, async(req,res)=>{
    try{
        let productObj = await productModel
        .find({
            userId : req.user.user_id 
        }).populate("userId","name"); /// schema field te j userId lekha seta likhte hbe 
        if(productObj.length==0){
            return res.status(404).json({message:"No product found"});
            
        }else{
            res.status(200).json(productObj);
        }
    }catch(err){
        res.status(401).json(err);
    }
})


//----------------------------------------------- Update Product -------------------------------------
productRouter.put("/update/:uid",checkAuth,async(req,res)=>{
    try{
        let productObj = await productModel.updateOne(
            {_id: req.params.uid,
                userId : req.user.user_id
            },
            {$set : {
                productName : req.body.productName,
                price : req.body.price,
                description : req.body.description
                }
            }
        );

        if(productObj.matchedCount === 0){    //matchedCount === 0  no product hear or other user's product
            res.status(403).json({"message":"Product not found or not yours"});
        }else if(productObj.modifiedCount === 0){
            res.status(200).json({"message":"Nothing changed"});
        }else{
            res.status(200).json({"message":"Product updated successfully"});
        }

    }catch(err){
        console.log("ERROR:", err)
        res.status(401).json(err);
    }
})

//----------------------------------------------- Delete Product -------------------------------------
productRouter.delete("/delete/:uid",checkAuth,async(req,res)=>{
    try{
        let productObj = await productModel.deleteOne(
            {_id : req.params.uid,
            userId : req.user.user_id});

        if(productObj.deletedCount === 0 ){
            res.status(403).json({"message":"Product not found or not yours"});
        }else{
            res.status(200).json({"message":"One product deleted successfully"});
        }

    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = productRouter;
console.log("productRouter is ready to work");