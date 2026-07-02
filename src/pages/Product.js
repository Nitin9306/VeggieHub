import "./Product.css";
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaChevronDown, FaChevronUp , FaStar } from "react-icons/fa";
import { useState } from "react";
import products from "../productsData";
import { FaTimes,FaShoppingCart,FaBolt, FaLock,} from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function Product() {
  const { id } = useParams();

  const product = products.find((item) => item.id == id);

 

  const [liked, setliked] = useState(false);
  // const [open, setopen] = useState(true);
  const [showPopup,setShowPopup]=useState(false);
  const [showCheckout,setshowCheckout]=useState(false);
  const [showSuccess,setshowSuccess]=useState(false);
  const [qty,setqty]=useState(1);
  const [name,setname]=useState("");
  const [mail,setmail]=useState("");
  const [mobile,setmobile]=useState("");
  const [address,setaddress]=useState("");
  const[payment,setpayment]=useState("");
  const navigate = useNavigate();
  const[submitted,setsubmitted]=useState(false);

   if (!product) {

    return <h2>Product Not Found</h2>;
  }

const relatedproducts = products.filter((item)=> item.id !==product.id)
.slice(0,4);



  return (
    <>
    <div className="products">

      <div className="images">

  <div className="image-card">

    <img src={product.image} alt={product.name} />

    <span className="offer-tag">
      20% OFF
    </span>

  </div>

</div>

      <div className="aside-section">

       <div className="product-header">

  <div className="names">

    <h2>{product.name}</h2>

    <div className="rating-box">
      <FaStar className="star" />
      <span>{product.rating}</span>
    </div>

    <p className="pack">{product.pack}</p>

    <div className="price-box">

  <h1 className="price">
   ₹{product.price*qty}
  </h1>

  <span className="old-price">
    ₹{Math.round(product.price * qty * 1.25)}
  </span>

  <span className="discount">
    20% OFF
  </span>

</div>

    <p className="delivery">
      🚚 Delivery in 20–30 mins
    </p>

    <p className="stock">
      🟢 Fresh & In Stock
    </p>

    <div className="feature-list">
  <div className="feature-item"> 100% Fresh Product</div>
  <div className="feature-item">Free Delivery Above ₹499</div>
  <div className="feature-item"><FaLock/> Secure Checkout</div>
  <div className="feature-item">🕒 Easy Return Policy</div>
</div>

  </div>
  
 <div className="wishlist-btned"
 onClick={()=>setliked(!liked)} style={{color:liked ? "red" : "#999"}}>
  <FaHeart  className= {`wishlist-icon ${liked ? "active" : ""}`}/>
 </div>

</div>

<div className="quantity-section">
  <p>Quantity <span>{qty}</span></p>

  <div className="product-qty">
    <button onClick={() => setqty(qty > 1 ? qty - 1 : 1)}>-</button>

    <span>{qty}</span>

    <button onClick={() => setqty(qty + 1)}>+</button>
  </div>
</div>

        <div className="cart-buttons">

  <button
    className="cart-btn"
    onClick={() => setShowPopup(true)}
  >
    <FaShoppingCart className="shoping"/> Add to Cart
  </button>

  <button
    className="buy-btn"
    onClick={() => {
      setshowCheckout(true);
    }}
  >
    <FaBolt/> Buy Now
  </button>
  

</div>
        <div className="info-icons">
          <h3>
            Product Information
          </h3>
          <p className="info-subtitle">
  Fresh  •Organic  •Premium Quality
</p>
        </div>

        
      
    


      </div>
    </div>
    {/* pop up */}
    {showPopup && (
     <div className="popup-overlay">
        <div className="popup">
          <div className="popup-product">

  <img
    src={product.image}
    alt={product.name}
    className="popup-img"
  />

  <h2>{product.name}</h2>

  <p className="popup-rating">
    ⭐ {product.rating}
  </p>

  <h3 className="popup-price">
    ₹ {product.price*qty}
  </h3>

</div>
          <div  className="quantity-box">
            <button onClick={()=> setqty(qty > 1 ? qty-1:1)}>-</button>
            <span>{qty}</span>
            <button onClick={()=> setqty(qty + 1)}>+</button>

          </div>
          <h3>Total :₹ {product.price*qty}</h3>
          <hr/>
          <p className="popup=delivery"> delivery in 20-30 mins</p>
          <p className="popup-secure"> 100% Secure Checkout</p>
          <button  className="place-order" onClick={()=>{setShowPopup(false); setshowCheckout(true);}}>Proceed to Checkout</button>
          <button className="close-btn" onClick={()=>setShowPopup(false)}><FaTimes/></button>

        </div>
     </div>
     )}

{showCheckout && (
 <div className="checkout-overlay">
  <div className="checkout-box">
   
    <h2>Checkout</h2>
    <input type="text" placeholder="Enter Full Name*" value={name} onChange={(e)=>setname(e.target.value)}/>
    {submitted && !name.trim() && (<p className="errors">Please enter full name</p>)}
    <input type="email" placeholder="Enter Your mail address*" value={mail} onChange={(e)=>setmail(e.target.value)} />
    {submitted && !mail.trim() && (<p className="errors">Please enter full mail address</p>)}
    <input type="tel" maxLength="10" placeholder="Enter Your Mobile number*" value={mobile} onChange={(e)=>setmobile(e.target.value)}/>
    {submitted && mobile.length !==10 && (<p className="errors">Please enter 10 digit Mobile number</p>)}
    <textarea placeholder="Enter Delivery Address*" value={address} onChange={(e) =>setaddress(e.target.value)} />
      {submitted && !address.trim() && (<p className="errors">Please enter full delivery address</p>)}
    <h4>Payment Method</h4>
         <div className="payment-option">
          <input  type="radio" name="payment" value="COD" onChange={(e)=>setpayment(e.target.value)}/>
         
       <span>Cash on Delivery</span>
         </div>
      
         <div className="payment-option">
          <input  type="radio" name="payment" value="ONLINE" onChange={(e)=>setpayment(e.target.value)}/>
       <span className="onlines">Online Payment</span>
         </div>

   
    <h3>Total: ₹{product.price*qty}</h3>
    <button className="confirms" 
    onClick={()=>{
      setsubmitted(true);
  

      if(
        !name.trim() ||
        !mail.trim() ||
        mobile.length !==10 ||
        !address.trim()  ||
        !payment

      ){
        
        return;
      }
      if(payment === "COD"){
        setshowCheckout(false);
        setshowSuccess(true);
      }
      if(payment ==="ONLINE"){
        alert("Online Payment Coming Soon!");
      }
    

    }
  }
  >Confirm Order</button>
  </div>

 </div>

)}

{showSuccess && (

<div className="sucess-overlay">
  <div className="sucess-box">
    <div className="tick">✔</div>
    <h2>Order Placed SuccessFully!</h2>
    <p>Thank you for shopping with VeggieHub</p>
    <p>Total Amount: ₹
    {product.price*qty}
    </p>
    <button onClick={()=>{setshowSuccess(false); navigate("/");}}>Continue Shopping</button>

  </div>

</div>
)}


<div className="related-products">

  <h2>You May Also Like</h2>

  <div className="related-grid">

    {relatedproducts.map((item) => (

      <div
        key={item.id}
        className="related-card"
        onClick={() =>{setqty(1); navigate(`/product/${item.id}`);}}
      >
        <img src={item.image} alt={item.name} />

        <h4>{item.name}</h4>

        <p>₹{item.price}</p>

      </div>

    ))}

  </div>

</div>

     </>
  );
}

export default Product;