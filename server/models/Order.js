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

  image: {
    type: String,
  },

  items: [
    {
      name: {
        type: String,
      },

      price: {
        type: Number,
      },

      qty: {
        type: Number,
      },

      image: {
        type: String,
      },
    },
  ],


  total: {
    type: Number,
  },

  address:{
    fullName:{
      type:String,
      default:"",
    },
    mobile:{
      type:String,
      default:"",
    },
    house:{
      type:String,
      default:"",
    },
    area:{
      type:String,
      default:"",
    },
    city:{
      type:String,
      default:"",
    },
    state:{
      type:String,
      default:"",
    },
    pincode:{
      type:String,
      default:"",
    },
  },

  payment: {
    type: String,
  },

  invoiceNo: {
    type: String,
  },

  paymentStatus: {
    type: String,
    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  orderId: {
    type: String,
    unique: true,
  },

  status: {
    type: String,
    default: "Order Confirmed",
  },

  trackingStep: {
    type: Number,
    default: 1,
  },
  placedAt:{
    type:Date,
    default:Date.now,
  },
  confirmedAt:{
    type:Date,
    default:null,
  },
  assignedAt:{
    type:Date,
    default:null,
  },
  packedAt:{
    type:Date,
    default:null,
  },
  outForDeliveryAt:{
    type:Date,
    default:null,
  },
  deliveredAt:{
    type:Date,
    default:null,
  },

  estimatedDelivery: {
    type: Number,
    default: 30,
  },

  deliveryBoy: {
    type: String,
    default: "",
  },

  deliveryBoyPhone: {
    type: String,
    default: "",
  },

});

module.exports = mongoose.model("Order", orderSchema);