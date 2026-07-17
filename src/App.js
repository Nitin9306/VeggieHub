
import { Routes, Route, useLocation} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { useState,useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Footer from "./footer";
import Wishlist from "./pages/Wishlist";
import Allproduct from "./pages/Allproducts";
import Resetpassword from "./pages/resetpassword";
import Scrolltop from "./components/Scrolltop";


function App() {
  const location = useLocation();

const hideLayout = [
  "/login"
].includes(location.pathname);

  const [message ,setmessage]=useState("");
  useEffect(()=> {
    fetch("https://veggiehub-1037.onrender.com")
    .then((res) => res.text())
    .then((data)=>
    setmessage(data))
    .catch((err) =>
    console.log(err));
  }, []);
  const [search,setsearch]=useState("");
  return (
    <>
    
    
     
  <Navbar search={search} setsearch={setsearch} />

      <Scrolltop/>
             
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
         <Route path="/allproduct" element={<Allproduct/>}/>
         <Route path="/reset-password/:token" element={<Resetpassword/>}></Route>
      </Routes>
     {!hideLayout && <Footer />}
    </>
  );
}

export default App;                      