const Product = require("../models/product");
const formidable =require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req,res,next,id)=>{
    Product.findById(id)
    .populate("category")
    .exec((err,product)=>{
        if(err)
        {
            return res.status(400).json({
                err:"Product not found"
            });
        }
        req.product = product;
        next();
    })
}

exports.createProduct = async (req,res)=>{

    let form = new formidable({keepExtensions:true});

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                err:"Please Upload the Data Correctly"
            });
        }
        const {name,description,price,category,stock} = fields;

        if(
            !name ||
            !price ||
            !description ||
            !category ||
            !stock){
                return res.status(400).json({
                    err:"Please Enter All Fields Correctly"
                });
            }

        let product = new Product(fields);

        if(file.photo){
            if(file.photo.size > (1024*1024*3)){
                return res.status(400).json({
                    err:"File Size too Big"
                });
            }
            console.log(file.photo.path);
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    err:"Saving Product Failed"
                });
            }
        });

        return res.json(product);
    })

}

exports.getProduct = (req,res)=>{
    req.product.photo=undefined;
    return res.json(req.product);
}

exports.photo=(req,res,next)=>{
    if(req.product.photo.data)
    {
        res.set("Content-Type",req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

exports.deleteProduct = (req,res) =>{
    let product = req.product;
    product.remove((err,deletedproduct)=>{
        if(err){
            return res.status(400).json({
                err:"Some Error Occured,Failed to Delete" 
            });
        }
        return res.json({
            message:"Product Deleted Succesfully",
            deletedproduct
        });
    });
}

exports.updateProduct = (req,res) =>{
    
    let form = new formidable({keepExtensions:true});

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                err:"Please Upload the Data Correctly"
            });
        }
        
        let product = req.product;

        //all the common values will be updated and new ones will be added;
        product = _.extend(product,fields);

        //product = {...product,...fields};

        product.save((err,prd)=>{
            if(err){
                return res.status(400).json({
                    err:"Updating Product Failed"
                });
            }
        });

        if(file.photo){
            if(file.photo.size > (1024*1024*3)){
                return res.status(400).json({
                    err:"File Size too Big"
                });
            }
            console.log(file.photo.path);
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
            product.save((err,prd)=>{
                if(err){
                    return res.status(400).json({
                        err:"Updating Product Failed"
                    });
                }
            });
            
        }

        return res.json(product);
    });
}


exports.getAllProducts = (req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 8; 
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Product.find()
    .select("-photo")
    .limit(limit)
    .populate("category")
    .sort([[sortBy,"ascending"]])
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                err:"Some Error Occured"
            });
        }
        return res.json(products);
    });
}

exports.updateStock = (req,res,next)=>{
    let myOperations = req.body.order.products.map((prod)=>{
        return {
            updateOne:{
                filter:{_id:prod._id},
                update:{$inc:{stock:-prod.count,sold:+prod.count}}
            }
        }
    });
    Product.bulkWrite(myOperations,{},(err,products)=>{
        if(err){
            return res.status(400).json({
                err:"Bulk Write Failed"
            });
        }
        next();
    })
}