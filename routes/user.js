var express = require('express');
const { isSignedin, isAuthenticated } = require('../controllers/auth');
const { getUserById, getUser, updateUser, userPurchaseList } = require('../controllers/user');

var router = express.Router();

//will always be called first before any handler having this param
router.param("userId",getUserById);

router.get("/user/:userId",isSignedin,isAuthenticated,getUser);

router.put("/user/:userId",isSignedin,isAuthenticated,updateUser);

router.get("/orders/user/:userId",isSignedin,isAuthenticated,userPurchaseList);



module.exports = router;