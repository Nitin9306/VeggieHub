const express = require("express");
const router = express.Router();
const Product  =require ("../models/Product");
router.get("/", async (req , res)=>{
    try{
        const products = await Product.find();
        res.json({
            success:true,
            products,
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:err.message,
        });
    }
});
router.post("/", async (req , res)=>{
    try{
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({
            success:true,
            message:"product added successfully",
            product,
        });
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        });
    }
});
router.delete("/:id", async (req , res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.json({
            success:true,
            message:"product deleted successfully",
        });
    } catch (err){
        res.status(500).json({
            success:false,
            message:err.message,
        });
    }
});
router.put("/:id", async (req , res)=>{
    try{
        const product = await Product.findByIdAndUpdate(req.params.id,
            req.body,
            {new:true}
        );
        res.json({
            success:true,
            message:"product updated successfully",
            product,
        });
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        });
    }
});


module.exports =router;