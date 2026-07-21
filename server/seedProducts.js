const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");
const products = [
  {
    name: "Tomato",
    price: 29,
    image: "/products/tomato-15523.png",
    category: "vegetables",
    description: "Fresh Tomato",
    stock: 100,
    discount: 10,
    rating: 2.1,
    available: true,
  },
  {
    name: "Potato",
    price: 49,
    image: "/products/potato.png",
    category: "vegetables",
    description: "Fresh Potato",
    stock: 100,
    discount: 10,
    rating: 2.1,
    available: true,
  },
  {
    name: "Onion",
    price: 29,
    image: "/products/onion.png",
    category: "vegetables",
    description: "Fresh Onion",
    stock: 100,
    discount: 10,
    rating: 4.5,
    available: true,
  }
];

async function seedProducts(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongobd connected");
        await Product.deleteMany({});
        console.log("old product deleted");
        await Product.insertMany(products);
        console.log("products added successfully");
        process.exit();
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}
seedProducts();