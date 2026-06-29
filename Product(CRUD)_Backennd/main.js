const express = require("express");
const cors = require("cors");
const env = require("dotenv").config();

const host = process.env.HOST;
const port = process.env.PORT;

//import database,userModel,productModel
const db = require("./database/db");
const userModel = require("./MODEL/user.model");
const productModel = require("./MODEL/product.model");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("<h1>Welcome MongoDB</h1>")
});

// import userRouter
const userRouter = require("./router/user.route");
app.use("/api/users",userRouter);

// import productRouter
const productRouter = require("./router/product.route");
app.use("/api/product",productRouter);

app.listen(port,host,()=>{
    console.log(`Server has started http://${host}:${port}/`);
})

