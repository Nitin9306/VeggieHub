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

router.post("/apply", async (req, res) => {
    try {

        const { code, amount } = req.body;

        if (!code) {
            return res.status(400).json({
                success: false,
                message: "Coupon code is required"
            });
        }

        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid order amount"
            });
        }

        const coupon = await Coupon.findOne({
            code: code.trim().toUpperCase()
        });

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Invalid coupon code"
            });
        }

        if (!coupon.active) {
            return res.status(400).json({
                success: false,
                message: "This coupon is inactive"
            });
        }

        const today = new Date();

        if (today > new Date(coupon.expiry)) {
            return res.status(400).json({
                success: false,
                message: "This coupon has expired"
            });
        }

        const discountAmount = Math.round(
            (amount * coupon.discount) / 100
        );

        const finalAmount = amount - discountAmount;

        res.json({
            success: true,
            message: "Coupon applied successfully",
            coupon: coupon.code,
            discountPercent: coupon.discount,
            discountAmount: discountAmount,
            finalAmount: finalAmount
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
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