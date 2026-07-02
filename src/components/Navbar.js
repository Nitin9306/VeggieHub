import "./Navbar.css";
import { Link,NavLink } from "react-router-dom";
import logo from "../pages/images/logos.png";
import products from "../productsData";
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes,FaHome, 
         FaInfoCircle,FaConciergeBell,FaPhoneAlt,FaHeart } from "react-icons/fa";
import { useState,useEffect } from "react";

function Navbar({search,setsearch}) {
  const [user,setuser]=useState(null);
  const [menuopen,setmenuopen]=useState(false);
  const [showsearch,setshowsearch]=useState(false);
  const cartcount = 
  JSON.parse(localStorage.getItem("cart"))?.length ||0;
  useEffect (()=> {
    const storedUser =
    JSON.parse(localStorage.getItem("user"));
    if(storedUser){
      setuser(storedUser);
    }
  }, []);

  const filteredProducts=products.filter((item) =>
  item.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <>
    <nav className="navbar">

      <div className="logo">
        <img src={logo} alt="logo" />
      </div>


 <div className="mobile-actions">

  <div className="mobile-search"
      onClick={()=>
        setshowsearch(true)
      }>
        <FaSearch />
        

      </div>
      <div className="menu-btnd"
      onClick={()=>setmenuopen(!menuopen)}>
        {menuopen ? <FaTimes />: <FaBars />}
      </div>


      
      </div>

      <div className="search">
        <input
          type="text"
          value={search}
          onChange={(e)=>setsearch(e.target.value)}
          placeholder="Search for vegetables, fruits..."
        />
        
        <FaSearch className="search-icon" />
        {search && (
        <div className="search-results">
            
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) =>(
              <Link
               key={item.id}
               to={`/product/${item.id}`}
               onClick={()=> setsearch("")}>
                <p>{item.name}</p>
               </Link>
            ))
          ): (
            <p className="no-product">No product found</p>
          )}
        

        </div>
        )}
      </div>

      <div className= "homes">
        <ul className="paged">
          <li><Link className="home" to="/">
          Home</Link></li>

          <li><Link className="home" to="/about">
          About</Link></li>

          <li><Link className="home" to="/service">
           Services</Link></li>

          <li><Link className="home" to="/contact">
          Contact</Link></li>
        </ul>
      </div>

      <div className="nav-links">
        

        <Link to="/cart" className="nav-link cart">
          <FaShoppingCart />
          <span>Cart</span>
          <span className="cart-count">{cartcount}</span>
        </Link>
        <Link to={user ? "/dashboard" :"/login"} className="nav-link">
          <FaUser />
          <span>{user ? user.name : "Account"}</span>
        </Link>
      </div>


      
    </nav>



    {showsearch && (
  <div
    className="search-overlay"
    onClick={() => setshowsearch(false)}
  >
    <div
      className="search-popup"
      onClick={(e) => e.stopPropagation()}
    >
      <FaSearch className="popup-icon" />

      <input
        type="text"
        value={search}
        onChange={(e) => setsearch(e.target.value)}
        placeholder="Search vegetables, fruits..."
        autoFocus
      />

      <FaTimes
        className="close-search"
        onClick={() => setshowsearch(false)}
      />


      {search && (
        <div className="search-results">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                onClick={() => {
                  setsearch("");
                  setshowsearch(false);
                }}
              >
                <p>{item.name}</p>
              </Link>
            ))
          ) : (
            <p className="no-product">
              No product found
            </p>
          )}
        </div>
      )}
    
  </div>
  </div>
)}



    <div className={`mobile-menu ${menuopen ? "active" : ""}`}>
      <ul className="paged">
        <li>
          <Link className="home" to="/" onClick={()=>
            setmenuopen(false)
          }>
            <FaHome />Home
          </Link>
        </li>

        <li>
          <Link className="home" to="/about" onClick={()=> setmenuopen(false)}>
          <FaInfoCircle />About
          </Link>
        </li>

        <li>
          <Link className="home" to="/service" onClick={()=>setmenuopen(false)}>
          <FaConciergeBell/>Service
          </Link>
        </li>

        <li>
          <Link className="home" to="/contact" onClick={()=>setmenuopen(false)}>
          <FaPhoneAlt/>Contact us
          </Link>
        </li>
      </ul>

    </div>

   

    <div className="bottom-nav">
        <NavLink  to= "/">
        <FaHome />
        <span>Home</span>
        </NavLink>

         <NavLink  to= "/wishlist">
        <FaHeart />
        <span>Wishlist</span>
        </NavLink>

        <NavLink to="/cart"
        className="bottom-cart">
          <FaShoppingCart />
          <span>Cart</span>
          {cartcount >0 &&
          <span
           className="cart-count">{cartcount}</span>}
        </NavLink>

        <NavLink to={user ? "/dashboard" : "/login"}>
        <FaUser />
        <span>Account</span></NavLink>
      </div>

    </>
  );
}

export default Navbar;