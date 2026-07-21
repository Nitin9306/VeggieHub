const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  name: {
    type: String,
  },

  email: {
    type: String,
  },

  phone: {
    type: String,
  },

  productName: {
    type: String,
  },

  productPrice: {
    type: Number,
  },

  quantity: {
    type: Number,
  },

  total: {
    type: Number,
  },

  address: {
    type: String,
  },
  image:{
    type:String,
  },

  payment: {
    type: String,
  },
  orderId:{
    type:String,
  },
  invoiceNo:{
    type:String,
  },
  paymentId:{
    type:String,
  },
  paymentStatus:{
    type:String,
    default:"Pending",
  },

  status: {
    type: String,
    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);