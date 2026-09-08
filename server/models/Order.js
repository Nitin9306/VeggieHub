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

  address: {
    type: String,
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