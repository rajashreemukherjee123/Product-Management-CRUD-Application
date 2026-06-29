const express = require("express");


const userRouter = express.Router();

//import userModel
const userModel = require("../MODEL/user.model");

//import jwt
const jwt = require("jsonwebtoken");

//import bcryptjs
const bcrypt = require("bcryptjs");

function genHashPass(input){
    let saltRound = 10;
    let hashPass = bcrypt.hashSync(input,saltRound);
    return hashPass;
}

//--------------------------------------------------------- Signup ----------------------------------------------------------
userRouter.post("/signup",async(req,res)=>{
    try{
        let userObj = await userModel.create({
            name : req.body.name,
            email : req.body.email,
            pass1 : genHashPass(req.body.pass1)
        });
        if(!userObj){
            
            res.status(404).json({"message":"Unable to signup"});
        }else{
            res.status(200).json({"message":"One user Signup successfully"});
        }
    }catch(err){
        res.status(500).json(err);
    }
});


//----------------------------------------------- Login --------------------------------------------------------------------
userRouter.post("/signin",async(req,res)=>{
    try{
        let userObj = await userModel.findOne({email : req.body.email});
        if(userObj){
            
            let dbPass = userObj.pass1;
            let pass1 = req.body.pass1;
            let isValid = bcrypt.compareSync(pass1,dbPass);
            if(isValid){
                 let token = jwt.sign({"user_id":userObj._id},process.env.JWT_SECRET,{expiresIn:"2h"});
                 res.status(200).json({"message":"Login Successfull",user:userObj,token});
            }else{
                 res.status(400).json({"message":"unable to signin"});
            }
           
        }else{
            res.status(404).json({"message":"No user found"});
        }
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = userRouter;
console.log("userRouter working");