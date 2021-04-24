const {Order,ProductCart} = require('../models/order');

exports.getOrderById = (req,res,next,id)=>{
    Order.findById(id)
    .populate("products.product","name price")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                err:"No order found"
            });
        }
        req.order = order;
        next();
    })
}

exports.createOrder = (req,res)=>{
    req.body.order.user = req.profile._id;
    const order = new Order(req.body.order);
    order.save((err,orderM)=>{
        if(err){
            return res.status(400).json({
                err:"Not able to Order, Try Again Later"
            })
        }
        return res.json(orderM);
    })
}

exports.getAllOrders = (req,res)=>{
    //TODO:I think we need to get orders which are ordered to this particular seller
    Order.find()
    .populate("user","_id name")
    .exec((err,orders)=>{
        if(err){
            return res.status(400).json({
                err:"No orders Found"
            });
        }
        return res.json(orders);
    });
}


exports.getOrderStatus = (req,res)=>{
    return res.json(Order.schema.path("status").enumValues);
}

exports.updateStatus = (req,res)=>{
    Order.findOneAndUpdate(req.body.orderId,
        {$set:{status:req.body.status}},
        (err,order)=>{
            if(err){
                return res.status(400).json({
                    err:"Cannot Update Order Status"
                });
            }
            return res.json(order);
    });
}