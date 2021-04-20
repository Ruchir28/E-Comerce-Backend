var express = require('express');
const { signout, signup,signin, isSignedin } = require('../controllers/auth');
const {check,validationResult} = require('express-validator');

var router = express.Router();


router.post("/signup",[
    check("name").isLength({min:1}).withMessage("Name should not be empty"),
    check("email").isEmail().withMessage("Email is required"),
    check("password",).isLength({min:3}).withMessage("Password should be atleast of length 3"),

],signup);


router.post("/signin",[
    check("email").isEmail().withMessage("Email is required"),
    check("password",).isLength({min:3}).withMessage("Password should be atleast of length 3"),

],signin);

router.get('/signout',signout);

router.get('/testroute',isSignedin,(req,res)=>{
    console.log(req.auth);
    return res.json({
        message:"A Protected Route"
    })
})

module.exports = router;