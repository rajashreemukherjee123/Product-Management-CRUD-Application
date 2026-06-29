const jwt = require("jsonwebtoken");


function checkAuth(req,res,next){
    try{
        let authHeader = req.headers["authorization"];
        
        if(!authHeader){
            return res.status(401).json({"message":"Token is not provide"});
        }else{
            let token = authHeader.split(" ")[1];
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