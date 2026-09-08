import "./Navbar.css";
import { Link,NavLink,useNavigate } from "react-router-dom";
import logo from "../pages/images/logos.png";
import CartDrawer from "./CartDrawer";
import products from "../productsData";
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes,FaHome, 
         FaInfoCircle,FaConciergeBell,FaPhoneAlt,FaHeart, FaTicketAlt,FaTags,FaChevronDown,FaSignOutAlt,FaShieldAlt
        ,FaArrowUp,FaMapMarkedAlt,FaBox, 
        FaMapMarkerAlt} from "react-icons/fa";
import { useState,useEffect } from "react";

function Navbar({search,setsearch}) {
 const [user,setuser]=useState(null);
 const navigate = useNavigate();
 const [profileicon,setprofileicon]=useState(false);
 const [cartopen,setcartopen]=useState(false);
 const openCart = () =>{
  setcartopen(true);
 }

 
 const handlelogout = () =>{
  localStorage.removeItem("user");
  setuser(null);
  setprofileicon(false);
  window.dispatchEvent(new Event ("userLogout"));
  navigate("/login");
 };

 useEffect (() =>{
  const loaduser = () =>{
    const saveduser = localStorage.getItem("user");
    if(saveduser){
      setuser(JSON.parse(saveduser));

    }else{
      setuser(null);
    }
  };
  loaduser();
  window.addEventListener("userLogin",loaduser);
  window.addEventListener("userLogout",loaduser);
  return () =>{
    window.removeEventListener("userLogin",loaduser);
    window.removeEventListener("userLogout",loaduser);
  };
 },[]);
  const [menuopen,setmenuopen]=useState(false);
  const [showsearch,setshowsearch]=useState(false);
  const cartcount = 
  JSON.parse(localStorage.getItem("cart"))?.length ||0;


  const filteredProducts=products.filter((item) =>
  item.name.toLowerCase().includes(search.toLowerCase()));
  useEffect(()=>{
    const openCarthandler=()=>{
      setcartopen(true);
    };
    window.addEventListener("openCartDrawer",openCarthandler);
    return () => {
      window.removeEventListener("openCartDrawer",openCarthandler);
    }
  },[]);

  useEffect(()=>{
    const handlesideclick = (e)=>{
      if(
        profileicon && ! 
        e.target.closest(".profile-wrap")
      ){
        setprofileicon(false);
      }
    };
    document.addEventListener("click",handlesideclick);
    return() =>{
      document.removeEventListener("click",handlesideclick);
    };
  },[profileicon]);
  return (
    <>
    <nav className="navbar">

      <div className="logo">
        <Link to="/"><img src={logo} alt="logo" /></Link>
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
          <li><NavLink className="home" to="/">
          Home</NavLink></li>
          <li><NavLink className="home" to="/allproduct">Shop</NavLink></li>

          {/* <li><NavLink className="home" to="/about">
          About</NavLink></li> */}
 
         <li><NavLink className="home" to="/service">
           Categories</NavLink></li>  

          {/* <li><NavLink className="home" to="/contact">
          Contact</NavLink></li> */}
          
        </ul>
      </div>

      <div className="nav-links">
        
         <Link to="/NavCoupon" className="nav-link">
         <FaTags/>
         </Link>
        <div className="nav-link cart" onClick={()=>setcartopen(true)}>
          <FaShoppingCart />
          <span className="cart-count">{cartcount}</span>
        </div>
        

        <div className="account-section">
          {!user ? (
            <Link to="/login" className="nav-link sign">
              <FaUser className="used"/>
              <span>Sign up</span>
            </Link>
          ) : (
            <div className="profile-wrap" onClick={(e)=> e.stopPropagation()}>
              <button className="profile-btnn" onClick={() => setprofileicon(!profileicon)}>
                <div className="prifile-circle">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                
                <FaChevronDown className={`profile-arrow ${profileicon ? "rotate" : ""}`}/>
              </button>
              {profileicon && (
                <div className="profile-dropdown">
                  <div className="profile-header">
                    <div className="profile-big-circle">
                      {user.name ? user.name.charAt(0).toUpperCase():"U"}
                    </div>
                    <div>
                      <h3>{user.name || "User"}</h3>
                      <p>{user.email || ""}</p>
                    </div>
                  </div>
                  <div className="profile-menu">
                    <Link to="/order" onClick={()=>setprofileicon(false)}>
                    <FaBox/>
                    <span>My orders</span></Link>

                    <Link to="/address" onClick={()=>setprofileicon(false)}>
                    <FaMapMarkerAlt/>
                    <span>Addresses</span></Link>

                    <Link to="/allproduct" onClick={()=>setprofileicon(false)}>
                    <FaArrowUp/>
                    <span>Products</span></Link>

                    <Link to="/NavCoupon" onClick={()=>setprofileicon(false)}>
                    <FaTags/>
                    <span>Deals</span></Link>
                  </div>
                  <div className="profile-loout">
                    <button onClick={handlelogout}>
                      <FaSignOutAlt/>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
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
          <Link className="home" to="/allproduct" onClick={()=>setmenuopen(false)}>
          <FaShoppingCart/>Shop
          </Link>
        </li>

        <li>
          <Link className="home" to="/service" onClick={()=>setmenuopen(false)}>
          <FaShoppingCart/>category
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

       <div className="bottom-cart" onClick={()=> setcartopen(true)}>
          <FaShoppingCart />
          <span>Cart</span>
          {cartcount >0 &&
          <span
           className="cart-count">{cartcount}</span>}
        </div>

        <NavLink to={user ? "/dashboard" : "/login"}>
        <FaUser />
        <span>Account</span></NavLink>
      </div>

<CartDrawer  isOpen={cartopen}
onClose={()=>setcartopen(false)}/>
    </>
  );
}

export default Navbar;