const jwt = require("jsonwebtoken");
const env = require("dotenv").config();

function checkAuth(req,res,next){
    try{
        let authHeader = req.headers["authorization"];//Bearer token
        
        if(!authHeader){
            return res.status(401).json({"message":"Token is not provide"});
        }else{
            let token = authHeader.split(" ")[1];//Bearer token theke kete sudhu token ta nichhe.. o te ache bearer r 1 a ache token tai 1 a thaka token ta sudhu nichhi
            let varifyToken = jwt.verify(token,process.env.JWT_SECRET);
            req.user = varifyToken;
            next();
        }
    }catch(err){
        res.status(403).json({"message":"Invalide jwt token or expaire"});
    }
}


module.exports = checkAuth;
console.log("ChectAuth working");