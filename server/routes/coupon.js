const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");
router.get("/", async (req,res)=>{
    try{
        const coupons = await Coupon.find().sort({createdAt: -1});
        res.json({
            success:true,
            coupons:coupons,
        });
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        });
    }
}),
router.post("/", async (req,res)=>{
    try{
        const coupon =  new Coupon(req.body);
        await coupon.save();
        res.status(201).json({
            success:true,
            message:"Coupon Added Successfully",
            coupon,
        });
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        });
    }
});
router.delete("/:id" ,async (req,res)=>{
    try{
        await Coupon.findByIdAndDelete(req.params.id);
        res.json({
            success:true,
            message:"Coupon Deleted Successfully",
        });
    } catch (err){
        res.status(500).json({
            success:false,
            message:err.message,
        });
    }
});
module.exports = router;