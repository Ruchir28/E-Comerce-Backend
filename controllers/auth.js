 const User = require("../models/user");
const {validationResult} = require('express-validator');

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
