var express = require('express');
const { signout, signup } = require('../controllers/auth');
const {check,validationResult} = require('express-validator');

var router = express.Router();


router.post("/signup",[
    check("name").isLength({min:1}).withMessage("Name should not be empty"),
    check("email").isEmail().withMessage("Email is required"),
    check("password",).isLength({min:3}).withMessage("Password should be atleast of length 3"),

],(req,res,next)=>{console.log('passed');next();},signup);

router.get('/signout',signout);


module.exports = router;