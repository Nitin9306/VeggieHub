const express=require("express");
const router =express.Router();
const Wishlist = require("../models/Wishlist");
router.post("/",async (req,res)=>{
    try{
        const {userId,productId}=req.body;
        const exist =await Wishlist.findOne({userId,productId});
        if(exist){
            return res.json({
                success:false,
                message:"Already in wishlist",
            });
        }
        const wishlist  = new Wishlist(req.body);
        await wishlist.save();
        res.json({
            success:true,
            message:"Added to Wishlist",wishlist,
        });
    } catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
});
router.get("/:userId",async (req,res)=>{
    try{
           const wishlist =await Wishlist.find({
            userId:req.params.userId,
           });
           res.json(wishlist);
    } catch(error){
        res.status(500).json({
            message:error.message,
        });
    }
});
router.delete("/:id",async (req,res)=>{
    try{
        await Wishlist.findByIdAndDelete(req.params.id);
        res.json({
            success:true,
            message:"Removed Successfully",
        });
    } catch (error){
        res.status(500).json({
            message:error.message,
        });
    }
});
module.exports= router;