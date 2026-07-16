const express =require("express");
const router = express.Router();
const Review = require("../models/Review");

router.post("/",async(req,res)=>{
    console.log(req.body);
    try{
        const review = new Review(req.body);
        await review.save();
        res.json({
            message:"Review Added ",
            review
        });
    } catch(error){
        res.status(500).json({
            message:error.message
        });
    }
});
router.get("/:productId",async(req,res)=>{
    try{
        const reviews = await Review.find({
            productId:req.params.productId
        });
        res.json(reviews);
    } catch(error){
        res.status(500).json({
            message:error.message
        });
    }
});

router.get("/rating/:productId",async(req,res)=>{
    try{
        const reviews = await Review.find({
            productId:
            req.params.productId
        });
        const totalReviews = reviews.length;
        const averagerating = totalReviews ===0?0 :
        reviews.reduce((sum,item)=>sum+Number(item.rating),0)/totalReviews;
        res.json({
            averagerating:averagerating.toFixed(1),
            totalReviews
        });
    } catch(error){
        res.status(500).json({
            message:error.message
        });
    }
});
module.exports = router;