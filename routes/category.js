const express = require("express");
const { isSignedin, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getCategoryById, getaCategory,createCategory, upDateCategory,removeCategory } = require("../controllers/category");
const { getUserById } = require("../controllers/user");
const router = require("./user");

const Router = express.Router();

router.param("userId",getUserById);

router.param("categoryId",getCategoryById);

router.post("/category/create/:userId",isSignedin,isAuthenticated,isAdmin,createCategory);

router.get("/category/:categoryId/:userId",isSignedin,isAuthenticated,isAdmin,getaCategory);

router.put("/category/:categoryId/:userId",isSignedin,isAuthenticated,isAdmin,upDateCategory);

router.delete("/category/:categoryId/:userId",isSignedin,isAdmin,isAuthenticated,removeCategory);

module.exports = Router;