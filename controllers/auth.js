 const User = require("../models/user");
const {validationResult} = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
exports.signout = (req,res)=>{
    return res.json({
        message:"User Signed Out"
    });
}

exports.signup = (req,res)=>{

    const errors = validationResult(req);
    // console.log(typeof(result['errors']));
    // console.log(Object.keys(result['errors']).map((obj)=>console.log(result.errors[obj].msg)));
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            err:[...errors.array().map((e)=>e.msg)],
            message:"Fill The Information correctly"
        });
    }
    const user = new User(req.body);
    user.save((err,user)=>{
        console.log(user.password);
        if(err){
            //console.log(err);
            return res.status(400).json({
                err:"Not able to save user , Try Again"
            })
        }
        return res.json({
         message:"User Created Succesfully",
         user   
        });
    })
}

exports.signin = (req,res) => {
    const {email,password} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            err:[...errors.array().map((e)=>e.msg)],
            message:"Fill The Information correctly"
        });
    }
    User.findOne({email},(err,user)=>{
        if(err){
            res.status(400).json({
                error:"User Doesn't Exists"
            })
        }
        if(user.authenticate(password))
        {
            //create token 
            const token = jwt.sign({_id:user._id},process.env.SECRET);
            const {name,email,_id,role} = user;
            return res.json({
                message:"Signed In",
                user:{name,email,_id,role},
                token
            });
        }
        return res.status(401).json({
            err:"Email/Password do not match"
        })


    })
}

exports.isSignedin = expressJwt({
    secret:process.env.SECRET,
    userProperty:"auth",
    algorithms: ['HS256']
});

exports.isAuthenticated = (req,res,next) => { 
    // console.log(typeof(req.profile._id));
    // console.log(typeof(req.auth._id));

    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker)
    {
        return res.status(403).json({
            error:"Access Denied"
        });
    }
    next();
}

exports.isAdmin = (req,res,next) => {
    if(req.profile.role === 0)
    {
        return res.status(403).json({
            error:"Access Denied"
        });
    }
    next();
    
}