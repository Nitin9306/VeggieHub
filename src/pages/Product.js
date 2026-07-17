import "./Product.css";
import { useParams } from "react-router-dom";
import { FaExclamationCircle, FaHeart, FaTruck } from "react-icons/fa";
import { FaChevronDown, FaChevronUp , FaStar } from "react-icons/fa";
import { useState,useEffect } from "react";
import products from "../productsData";
import { FaTimes,FaShoppingCart,FaBolt, FaLock, FaBiking, FaClock ,FaBoxOpen,
  FaWeightHanging,FaLeaf,FaWarehouse,FaUndoAlt,FaExclamation,FaCircle,FaPlus,FaMinus} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
import Review from "../components/Review";
import { toast } from "react-toastify";


function Product() {
  const addToWishlist = async()=>{
    try{
      const user = JSON.parse(localStorage.getItem("user"));
      if(!user){
       toast("Please Login First");
        return;
      }
      await axios.post("https://veggiehub-1037.onrender.com/api/wishlist",{
        userId:user._id,
        productId:product.id,
        name:product.name,
        price:product.price,
        image:product.image,
        category:product.category,
      });
      setliked(true);
     toast.success("Added to Wishlist");
    } catch (error){
      console.log(error);
      console.log(error.response);
      alert(error.response?.data?.message ||error.message);
    }
  };
  const { id } = useParams();

  const product = products.find((item) => item.id == id);
  const [opendiv,setopendiv]=useState("");
  const [liked, setliked] = useState(false);
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
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(()=>{
    if(user){
      setname(user.name || "");
      setmail(user.email || "");
      setmobile(user.phone || "");
    }
  }, []);
  const[submitted,setsubmitted]=useState(false);
  const [showbuy,setshowbuy] =useState(false);

   if (!product) {

    return <h2>Product Not Found</h2>;
  }


  const addtocart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((item) => item.id === product.id);
    if(exists){
      exists.qty += qty;
    } else{
      cart.push({
        ...product,qty,
      });
    }
    localStorage.setItem("cart",JSON.stringify(cart));
  };

const relatedproducts = products.filter((item)=> item.id !==product.id)
.slice(0,4);

const handlepayment  =async () =>{
  try{
    const {data} = await
    axios.post(
      "https://veggiehub-1037.onrender.com/api/payment/order",
      {
        amount:product.price * qty,
      }
    );
    const options = {
      key:"rzp_test_TEYsTguo7KsPG3",
      amount:data.amount,
      currency:data.currency,
      name:"VeggieHub",
      description:"Order Payment",
      order_id:data.id,
     handler: async function (response) {
  try {
    await axios.post(
      "https://veggiehub-1037.onrender.com/api/orders",
      {
        userId: user._id,
        name,
        image: product.image,
        email: mail,
        phone: mobile,
        productName: product.name,
        productPrice: product.price,
        quantity: qty,
        total: product.price * qty,
        address,
        payment: "ONLINE",
      }
    );

    setshowCheckout(false);
    setshowSuccess(true);

    toast.success("🎉 Payment Successful!");

    console.log(response);

  } catch (err) {
    console.log(err);
    toast.error("Order save failed");
  }
}
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch(err){
    console.log(err);
  }
};

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

    <h2>{product.name} 1kg <FaStar className="stare" />
      <span>{product.rating}</span></h2>

    <p className="pack">{product.pack}</p>

    <div className="price-box">

  <h1 className="price">
   ₹{product.price*qty} kg
  </h1>

  <span className="old-price">
    ₹{Math.round(product.price * qty * 1.25)}
  </span>

  <span className="discount">
    20% OFF
  </span>

</div>

    <p className="delivery del">
      <FaBiking className="frees"/>Delivery in 20–30 mins
    </p>

    <p className="stock">
      <FaCircle className="frees cire"/> Fresh & In Stock
    </p>

    <div className="feature-list">
  <div className="feature-item"> 100% Fresh Product</div>
  <div className="feature-item"><FaTruck className="frees"/>Free Delivery Above ₹499</div>
  <div className="feature-item"><FaLock className="frees"/>Secure Checkout</div>
  <div className="feature-item"><FaClock className="frees"/>No Return Policy</div>
</div>

  </div>
  
 <div className="wishlist-btned" onClick={addToWishlist} style={{color:liked? "red" :"#999"}}>
  <FaHeart className={`wishlist-icon ${liked ? "active" : ""}`}/>
 </div>

</div>

<div className="quantity-section">
  <p>Quantity: <span>{qty}</span></p>

  <div className="product-qty">
    <button onClick={() => setqty(qty > 1 ? qty - 1 : 1)}><FaMinus className="equal"/></button>

    <span>{qty}</span>

    <button onClick={() => setqty(qty + 1)}><FaPlus className="equal"/></button>
  </div>
</div>

        <div className="cart-buttons">

  <button
    className="cart-btn" 
   onClick={()=> {addtocart(); setShowPopup(true);
    setTimeout(()=>{
      setShowPopup(false);
    },2000);

   }}
  >
    <FaShoppingCart className="shoping"/> Add to Cart
  </button>

  <button
    className="buy"
    onClick={() => {
      if(!user){
       toast.error("Please Login to first place order");
        navigate("/login");
      }
    setshowbuy(true);
    }}
  >
    <FaBolt/> Buy Now
  </button>
  

</div>
       <div className="product-infos">
        <div className="section-header" onClick={() => 
          setopendiv(opendiv === "details" ? "" : "details")}>
           <h4>Product Details</h4>
           {opendiv === "details" ? (
            <FaChevronUp />
           ) : (
            <FaChevronDown/>
           )}
        </div>
       
       {opendiv === "details" && (
       <div className="section-content">
        <div className="detail-box">
          <FaBoxOpen className="detail-icon"/>
          <span><strong>Product:</strong> {product.name}</span>
        </div>

        <div className="detail-box">
          <FaLeaf className="detail-icon"/>
          <span><strong>Category:</strong> {product.category}</span>
        </div>

        <div className="detail-box">
          <FaWeightHanging className="detail-icon"/>
          <span><strong>Weight:</strong> {product.pack}</span>
        </div>

        <div className="detail-box">
          <FaLeaf className="detail-icon"/>
          <span><strong>Quality:</strong> Premium Farm fresh</span>
        </div>

        <div className="detail-box">
          <FaWarehouse className="detail-icon"/>
          <span><strong>Storage:</strong> Store in a cool & dry place</span>
        </div>
        </div>
        )}
     </div>





        <div className="cancel-box">

          <div className="section-header" onClick={() => setopendiv(
            opendiv === "policy" ? "" : "policy"
          )}>
             <h4>Cancellation & Return Policy</h4>
             {opendiv === "policy" ? (
              <FaChevronUp />
             ) : (
              <FaChevronDown/>
             )}

          </div>
         
           {opendiv === "policy" && (
            <div className="section-content">
          <div className="policy-item">
            <FaUndoAlt  className="policy-icon"/>
            <span>Orders can be cancelled before dispatch.</span>
          </div>

          <div className="policy-item">
            <FaExclamationCircle className="policy-icon"/>
            <span>Fresh fruits  & vegetables are non-returnable because they are perishable products.</span>
          </div>

          <div className="policy-item">
            <FaUndoAlt className="policy-icon"/>
            <span>If you recieve a damaged or wrong products,report it within 24 hours for a replacement or refund.</span>
          </div>
          </div>
          )}
      </div>
      
    


      </div>
    </div>


    {showPopup && (
      <div className="cart-popup">
        <div className="pop-txts">
          <h4>Added to Cart</h4>
          <p>{product.name} added successfully!</p>
        </div>
        <button onClick={()=>navigate("/cart")}>Go to Cart</button>
      </div>
    )}
    {showbuy && (
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
          <button  className="place-order" onClick={()=>{
            if(!user){
              toast.error("Please Login First to Place Order");
              navigate("/login");
              return;
            }
            setshowbuy(false); setshowCheckout(true);}}>Proceed to Checkout</button>
          <button className="close-btn" onClick={()=>setshowbuy(false)}><FaTimes/></button>

        </div>
     </div>
     )}

{showCheckout && (
 <div className="checkout-overlay">
  <div className="checkout-box">
   <button className="close-btnedd" onClick={()=> setshowCheckout(false)}> <FaTimes /></button>
    <h2>Checkout</h2>
    <input type="text" readOnly placeholder="Enter Full Name*" value={name} onChange={(e)=>setname(e.target.value)}/>
    {submitted && !name.trim() && (<p className="errors">Please enter full name</p>)}
    <input type="email" readOnly placeholder="Enter Your mail address*" value={mail} onChange={(e)=>setmail(e.target.value)} />
    {submitted && !mail.trim() && (<p className="errors">Please enter full mail address</p>)}
    <input type="tel" readOnly maxLength="10" placeholder="Enter Your Mobile number*" value={mobile} onChange={(e)=>setmobile(e.target.value)}/>
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
    onClick={async ()=>{
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
      try {const res=await 
      axios.post("https://veggiehub-1037.onrender.com/api/orders", {
        userId:user._id,
        name,
        image:product.image,
        email:mail,
        phone:mobile,
        productName:product.name,
        productPrice:product.price,
        quantity:qty,
        total:product.price*qty,
        address,
        payment,
      });
console.log("order response:",res.data);
    }
    catch(err){
      console.log("order error",err.response?.data || err.message);
      toast.error("Order save failed");
      return;
    }
      if(payment === "COD"){
        setshowCheckout(false);
        setshowSuccess(true);
      }
      if(payment ==="ONLINE"){
       handlepayment();
       return;
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
  <Review productId={product.id}/>
     </>
  );
}

export default Product;