const express = require("express");

const Router = express.Router();


const {isAdmin,isAuthenticated,isSignedin} = require("../controllers/auth");
const {getUserById,pushOrderInPurchaseList} = require("../controllers/user");
const {updateStock} = require("../controllers/product");
const {getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus} = require("../controllers/order");

Router.param("userId",getUserById);

Router.param("orderId",getOrderById);

Router.post("/order/create/:userId",isSignedin,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder);

Router.get("/order/all/:userId",isSignedin,isAuthenticated,isAdmin,getAllOrders);

Router.get("/order/status/:userId",isSignedin,isAuthenticated,isAdmin,getOrderStatus);

Router.put("/order/:orderId/status/:userId",isSignedin,isAuthenticated,isAdmin,updateStatus);


module.exports = Router;