const express = require("express");

const Router = express.Router();

const {isAdmin,isAuthenticated,isSignedin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");
const { getProductById,createProduct,getProduct, photo, deleteProduct, updateProduct, getAllProducts } = require("../controllers/product");
const {} = require("../controllers/category");

Router.param("userId",getUserById);
Router.param("productId",getProductById);

//create
Router.post("/product/create/:userId",isSignedin,isAuthenticated,isAdmin,createProduct);

//read
Router.get('/product/getAllproducts',getAllProducts);

Router.get("/product/:productId",getProduct);
Router.get("/product/photo/:productId",photo);



//delete 
Router.delete('/product/:productId/:userId',isSignedin,isAuthenticated,isAdmin,deleteProduct);

//update
Router.put('/product/:productId/:userId',isSignedin,isAuthenticated,isAdmin,updateProduct);




module.exports = Router;


