const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        price:{
           type: Number,
           required:true,
        },
        image:{
            type:String,
            required:true,
        },
        category:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        stock:{
            type:Number,
            default:0,
        },
        discount:{
            type:Number,
            default:0,
        },
        rating:{
            type:Number,
            default:5,
        },
        available:{
            type:Boolean,
            default:true,
        },
    },
    {
        timestamps:true,
    }
);
module.exports = mongoose.model("product",productSchema);