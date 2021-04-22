const Category = require("../models/category");

exports.getCategoryById = (req,res,next,id)=>{

    Category.findById(id).exec((err,category)=>{
        if(err){
            return res.status(400).json({
                err:"Category Not Found"
            });
        }
        req.category = category;
    });
    next();
}
exports.createCategory = (req,res)=>{
    const category = new Category(req.body);
    category.save((err,categoryN)=>{
        if(err){
            return res.status(400).json({
                err:"Not Able to Create Category"
            });
        } 
        return res.json({
            message:'Category Created',
            category:categoryN
        });  
    });
}

exports.getaCategory = (req,res)=>{
    return res.json(req.category);
}

exports.getAllCategory = (req,res) =>{
    Category.find().exec((err,categories)=>{
        if(err){
            return res.json({
                err:'No Categories Found'
            });
        }
        return res.json(categories);
    })
}

exports.upDateCategory=(req,res)=>{
    const category = req.category;
    category.name = req.body.name;
    category.save((err,cat)=>{
        if(err)
        {
            return res.status(400).json({
                error:"Failed to update Category"
            });
        }
        return res.json(cat);
    });
}

exports.removeCategory = (req,res)=>{
    const category = req.category;

    category.remove((err,cat)=>{
        if(err)
        {
            return res.status(400).json({
                err:"Failed to delete category"
            });
        }
        return res.json({
            message:"Category Deleted succesfully",
            cat
        });
    })
}