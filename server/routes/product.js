const express = require("express");
const router = express.Router();
const Product  =require ("../models/Product");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null,path.join(__dirname,"../uploads"));

    },

    filename: (req, file, cb) => {

        cb(
            null,
            Date.now() +
            path.extname(file.originalname)
        );

    }

});

const upload = multer({
    storage: storage
});
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

router.post(
    "/",
    upload.single("image"),

    async (req, res) => {

        try {

            console.log("BODY:", req.body);

            console.log("FILE:", req.file);


            const product = new Product({

                name: req.body.name,

                price: req.body.price,

                category: req.body.category,

                description: req.body.description,

                stock: req.body.stock,

                discount: req.body.discount || 0,

                rating: req.body.rating || 5,

                pack: req.body.pack || "1 kg",

                available:
                    req.body.available === "true",

                image: req.file
                    ? `/uploads/${req.file.filename}`
                    : ""

            });


            await product.save();


            res.status(201).json({

                success: true,

                message:
                    "Product added successfully",

                product

            });

        }

        catch (err) {

            console.log(
                "PRODUCT ADD ERROR:",
                err
            );

            res.status(500).json({

                success: false,

                message: err.message

            });

        }

    }
);
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


module.exports = router;