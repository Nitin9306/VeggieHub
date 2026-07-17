const orderRoutes = require("./routes/order");
const authRoutes =require("./routes/auth");
const wishlistRoutes = require("./routes/wishlist");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();


const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req,res)=>{
    res.send("Backend is running");
});


mongoose
.connect(process.env.MONGO_URI)
.then(()=>{

    console.log("✅ MongoDB Connected");


    app.use("/api/auth", authRoutes);
    app.use("/api/orders",orderRoutes);
    app.use("/api/reviews",
        require("./routes/reviews"));
        app.use("/api/wishlist",wishlistRoutes);


   
    app.listen(process.env.PORT || 5000, ()=>{
        console.log("Server started on port 5000");
    });


})
.catch((err)=>{

    console.log("MongoDB Error:", err.message);

});