const User = require("../models/user");

exports.getUserById = (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || (!user))
        {
            return res.status(400).json({
                err:"No user was found"
            });
        }
        
        req.profile = user;
        req.profile.salt = undefined;
        req.profile.encry_password = undefined;
        next();
    });
}

exports.getUser = (req,res)=>{
    return res.json({
        user:req.profile
    })  
}