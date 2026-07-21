import "./Home.css";
import img from "./images/bg.jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import hero from "./images/hero.png";
import leaf from "./images/leaf.png";
import seb from "./images/seb.png";
import offer from "./images/offer.png";
import Categories from "../categories";
import VeggieHub from "../veggieHub";
import Footer from "../footer";
import products from "../productsData";
import ProductCard from "../components/ProductCard";
import { FaShoppingCart, FaChevronLeft, FaChevronRight, FaLeaf, FaTruck, FaShieldAlt , FaHeart} from "react-icons/fa";
import { useRef ,useState} from "react";

function Home({search}) {


  
 
const [showpopup ,setshowpopup]=useState(false);

const [select,setselect]=useState(null);
const navigate = useNavigate();
const addToWishList = (product) =>
{
  const wishlist =
  JSON.parse(localStorage.getItem("wishlist")
) || [];

const exists = wishlist.find(
  (item)=> item.id === product.id
);
if(!exists){
  wishlist.push(product);

  localStorage.setItem(
    "wishlist",
    JSON.stringify(wishlist)
  );
}
setselect(product);
setshowpopup(true);
setTimeout(() =>
{
  setshowpopup(false);
  navigate ("/cart");
}, 2500);
};

const addtocart = (product) => {
 
  const cart=
  JSON.parse(localStorage.getItem("cart")) ||
  [];

  const exists = cart.find(
    (item) => item.id === product.id
  );

  if(exists){
    exists.qty +=1;
  }
  else {
    cart.push({
      ...product,
      qty: 1,
    });
  }

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
  console.log(
    JSON.parse(localStorage.getItem("cart"))
  );
};


 const vegRef = useRef();                                    
 const fruitRef = useRef();
 const scrollVegLeft = ()=>

 {
  vegRef.current.scrollLeft -= 250;
 };

 const scrollVegRight = ()=>
 {
  vegRef.current.scrollLeft += 250;
 };

 const scrollFruitLeft =()=>
 {
  fruitRef.current.scrollLeft -=250;
 };

 const scrollFruitRight =()=>
 {
        fruitRef.current.scrollLeft += 250;
 };



 const vegetables= products.filter(
  (item)=> item.category ===
  "vegetables"
 );


 const fruits = products.filter (
  (item)=> item.category === "fruits"
 );
  return (
    <>

    <div className="bg">
   
  <div className="hero">
    <div className="hero-left">
      <div className="badge">
        100% FRESH & ORGANIC
      </div>

      <h1>Farm Fresh <span>Goodness Delivered!</span>
      </h1>

      <p>
        fresh vegetables and fruits delivered directly from farms to your doorstep.
      </p>


      <div className="btnes">
      <button className="btn1" onClick={()=> navigate("/allproduct")}>Browse Products</button>
      <button className="btn2">Explore More</button>

      </div>

      <div className="stats">
        <div className="stat">
          <h2>1k<sup>+</sup></h2>
          <p>Happy Customers</p>
        </div>

        <div className="stat">
          <h2>100<sup>+</sup></h2>
          <p>Products</p>

        </div>

        <div className="stat min">
          <h2>30 min</h2>
          <p>Delivery</p>
        </div>

      </div>

    </div>

    <div className="right">
      <div className="hero-images">
        <img src={hero}></img>
      </div>

      <div className="veg v1"><img src= {seb}></img></div>
      <div className="veg v1"></div>
      <div className="veg v3"></div>
      <div className="veg v4"></div>
      <div className="veg v5"></div>

    </div>
     
     <div className="leaf l1"><img src={leaf}></img></div>
      <div className="leaf l2"><img src={leaf}></img></div>

  </div>
 


      <div className="fresh">
        <h2>Fresh Vegetables</h2>
      </div>

      <div className="carousel">
        <div className="fade"></div>

        <button onClick={scrollVegLeft} className="arrow">
          <FaChevronLeft />
        </button>

        <div className="product" ref={vegRef}>

          {vegetables.map((item)=> (
            <ProductCard key ={item.id}
            item ={item}
            addtoCart={addtocart}
            addToWishlist = {addToWishList}
            page="home" />
          ))}

         

        </div>
        <div className="fades"></div>
        <button onClick={scrollVegRight} className="arrows">
          <FaChevronRight />
        </button>

      </div>






      

      
      <Categories />

      <div className="fresh">
        <h2>Fresh Fruits</h2>
      </div>

        <div className="carousel">
        <div className="fade"></div>

        <button onClick={scrollFruitLeft} className="arrow">
          <FaChevronLeft />
        </button>

        <div className="product" ref={fruitRef}>
         {fruits.map((item)=> (
          <ProductCard key={item.id}
          item ={item}
          addtoCart={addtocart}
          addToWishlist ={addToWishList}
          page="home" />
         ))}
        

        </div>
        <div className="fades"></div>
        <button onClick={scrollFruitRight} className="arrows">
          <FaChevronRight />
        </button>

      </div>

      <div className="banner">

  <div className="offer">

    <span className="offer-tag">
      <FaLeaf /> Special Offer
    </span>

    <h2>
      Fresh Vegetables <br />
      Up To <span>20% OFF</span>
    </h2>

    <p>
      Get fresh organic vegetables delivered to your doorstep at the best
      prices.
    </p>

    <h4>
      Use Code : <span>VEGGI120</span>
    </h4>

    <button className="shop-btn" onClick={()=> navigate("/allproduct")}>
      Shop Now →
    </button>

  </div>

  <div className="offers">
    <img src={offer} alt="offer" />
  </div>

  <div className="discount-circle">
    <h3>20%</h3>
    <p>OFF</p>
  </div>

</div>

      <VeggieHub />




      { showpopup && (
        <div className="cart-popup">
          <div className="pop-txts">
          <h4><FaHeart/> Added to wishlist</h4>
          <p>Product Saved successfully!</p> 
          </div>
          <button onClick={()=>addtocart(select)}>Add to cart</button>
        </div>
      )

      }
</div>
    </>
  );
}

export default Home;