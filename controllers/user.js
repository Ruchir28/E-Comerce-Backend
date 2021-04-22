const User = require("../models/user");
const Order = require("../models/order");
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

exports.updateUser = (req,res) => {
    User.findByIdAndUpdate(req.profile._id,{$set:req.body},{new:true,useFindAndModify:false},(err,user)=>{
        if(err)
        {
            return res.status(400).json({
                err:"Update Failed,Some error occured"
            });
        }
        user.encry_password=undefined;
        user.salt=undefined;
        return res.json(user);

    });
}

exports.userPurchaseList = (req,res)=>{
    //TODO: Try to do it by user schema's user purchase list 
    //by populating orders in that purchaselist
    Order.find({user:req.profile._id})
    .populate("user","_id name")
    .exec((err,orders)=>{
        if(err)
        {
            return res.status(400).json({
                err:"You Have No Orders"
            })
        }
        return res.json(orders);
    });

}

exports.pushOrderInPurchaseList = (req,res,next)=>{
    //TODO: 8.10
    let purchases = [];
    req.body.order.products.forEach((product)=>{
        purchases.push({
            _id:product._id,
            name:product.name,
            description:product.description,
            category:product.category,
            quantity:product.quantity,
            amount:req.body.order.amount,
            transaction_id:req.body.order.transaction_id
        });
    });
    User.findOneAndUpdate(req.profile_id,{$push:{purchases:purchases}},{new:true},(err,user)=>{
        if(err)
        {
            return res.status(400).json({
                err:"Access Denied"
            });
        }

    })
    next();
}