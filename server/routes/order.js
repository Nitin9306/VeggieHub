const express = require("express");
const Order =require("../models/Order");
const router  = express.Router();
router.post("/",async(req,res)=>{
    try
    {
         console.log("Order Data:",req.body);
        const order = await Order.create(req.body);
        console.log("Saved order",order);
        res.status(201).json({
            success:true,
            message:"Order Placed Successfully",
            order,
        });
    }
    catch (err){
       console.log("user error",err);
        res.status(500).json({
            success:false,
            message:err.message,
        });
    }


});

router.get("/",async (req,res) =>{
    try{
        const orders = await Order.find().sort({createdAt: -1});
        res.json({
            success:true,
            orders,
        });
    } catch (err){
        res.status(500).json({
            success:false,
            message:err.message,
        });
    }
});

router.put("/:id", async (req,res) =>{
    try{
        const order  = await Order.findByIdAndUpdate(req.params.id,{status: req.body.status,},
            {
                new:true,
            }
        );
        res.json({
            success:true,
            message:"Order Status updated", order,
        });
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        });
    }
});
router.get("/:userId",async (req,res)=>{
    try{
        const orders =await Order.find({
            userId: req.params.userId
        }).sort({createdAt:-1});
        res.json(orders);
    }
    catch(err){
        res.status(500).json({
            success:false,
            mesage:err.message
        });
    }
});
module.exports = router;