const User  = require("../models/User");
const Product =require ("../models/Product");
const Order = require ("../models/Order");
const express = require("express");
const router = express.Router();

router.post("/login",(req,res)=>{
    res.json({
        success:true,
        message:"Admin route working"
    });
});

router.get("/stats", async (req,res)=>{
    try{
        const totalUser = await User.countDocuments();
        const totalProduct = await Product.countDocuments();
        const totalOrders  = await Order.countDocuments();
        const deliveryOrders = await Order.find({
            status:"Delivered",
        });
        let totalRevenue = 0;
        deliveryOrders.forEach((order)=>{

            totalRevenue +=order.total;
        });
        res.json({
            totaluser,
            totalProduct,
            totalOrders,
            totalRevenue,
        });
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        });
    }
});

router.get("/recent-orders", async (req,res)=>{
    try{
        const orders = await Order.find()
        .sort({createdAt: -1})
        .limit(5);
        res.json(orders);
    } catch (err){
        res.status(500).json({
            success:false,
            message:err.message,
        });
    }
});

router.get("/users", async (req,res) =>{
    try{
        const users = await User.find({},"-password").sort({createdAt: -1});
        res.json(users);
    } catch (err){
        res.status(500).json({
            success: false,
            message:err.message,
        });
    }
});

router.delete("/users/:id", async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.json({
            success:true,
            message:"User Deleted Successfully",
        });
    } catch (err){
        res.status(500).json({
            success:false,
            message:err.message,
        });
    }
});
module.exports = router;