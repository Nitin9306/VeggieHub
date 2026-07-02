import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Footer from "./footer";
import Wishlist from "./pages/Wishlist";


function App() {
  const [search,setsearch]=useState("");
  return (
    <>
    
      <Navbar search={search} setsearch={setsearch} />
             
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<Login/>} />
         <Route path="/cart" element={<Cart/>} />
         <Route path="/wishlist" element={<Wishlist />} />
         <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;                      