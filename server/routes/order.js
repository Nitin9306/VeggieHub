const express = require("express");
const Order =require("../models/Order");
const router  = express.Router();
const mongoose = require("mongoose");


router.post("/",async(req,res)=>{
    console.log("POST/api/ordersHIT");
    console.log(req.body);
    try 
    {
         console.log("Order Data:",req.body);
         const now  = new Date();
         const date = now.getFullYear().toString() + String(now.getMonth()+ 1).padStart(2, "0") +
         String(now.getDate()).padStart(2, "0");
         const random = Math.floor(1000+Math.random() * 9000);
         const orderId = `VH${date}${random}`;
         const invoiceNo = `INV${date}${random}`;
        const order = await Order.create({...req.body,
            orderId,
            invoiceNo,
            status:"Order Confirmed",
            trackingStep:1,
            estimatedDelivery:30,
            deliveryBoy:"",
            deliveryBoyPhone:"",
        });
        console.log("Saved order",order);
        res.status(201).json({
            success:true,
            message:"Order Placed Successfully",
            order,
            orderId:order.orderId,
            invoiceNo:order.invoiceNo,
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

router.get("/tracking/:orderId", async (req, res) => {

    console.log("===== TRACKING ROUTE HIT =====");

    console.log("Order ID:", req.params.orderId);

    try {

        let order;

   
        order = await Order.findOne({
            orderId: req.params.orderId
        });

      
        if (
            !order &&
            mongoose.Types.ObjectId.isValid(req.params.orderId)
        ) {

            order = await Order.findById(
                req.params.orderId
            );

        }

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order not found"
            });

        }

        res.status(200).json({
            success: true,
            order: order
        });

    } catch (err) {

        console.log("Tracking Error:", err);

        res.status(500).json({
            success: false,
            message: err.message
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

module.exports = router;