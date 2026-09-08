import "./Product.css";
import { useParams } from "react-router-dom";
import { FaExclamationCircle, FaHeart, FaTruck } from "react-icons/fa";
import { FaChevronDown, FaChevronUp , FaStar } from "react-icons/fa";
import { useState,useEffect } from "react";
import products from "../productsData";
import { FaTimes,FaShoppingCart, FaLock, FaBiking, FaClock ,FaBoxOpen,
  FaWeightHanging,FaLeaf,FaWarehouse,FaUndoAlt,FaExclamation,FaCircle,FaPlus,FaMinus, FaChevronRight} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
import Review from "../components/Review";
import { toast } from "react-toastify";


function Product() {
 
 const {id} = useParams();

 
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


  const product = products.find((item) => item.id == id);
  const [isadd,setisadd]=useState(false);
  useEffect(()=>{
    if(!product) return;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const exists = cart.some((item) =>
  item.id === product.id);
  setisadd(exists);
},[product]);
  const [opendiv,setopendiv]=useState("");
  const [liked, setliked] = useState(false);
 
  const [qty,setqty]=useState(1);
  

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));



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
        ...product,
        qty: qty,
      });
    }
    localStorage.setItem("cart",JSON.stringify(cart));
    setisadd(true);
    window.dispatchEvent(new Event("openCartDrawer"));
  };

const relatedproducts = products.filter((item)=> item.id !==product.id)
.slice(0,4);






  return (
    <>
    <div className="products">

      <div className="images">

  <div className="image-card">

    <img src={product.image} alt={product.name} />

    <span className="offer-tag oger">
      10% OFF
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
    10% OFF
  </span>

</div>

    <p className="delivery del">
      <FaBiking className="frees"/>Delivery in 20–30 mins
    </p>

    <p className="stock in">
      <FaCircle className="frees cire"/> Fresh & In Stock
    </p>

    <div className="feature-list">
  <div className="feature-item"><FaTruck className="frees"/>Free Delivery Above ₹499</div>
  <div className="feature-item"><FaLock className="frees"/>Secure Checkout</div>
  <div className="feature-item"><FaClock className="frees"/>No Return Policy</div>
</div>

  </div>
  
 <div className="wishlist-btned" onClick={addToWishlist} style={{color:liked? "red" :"#999"}}>
  <FaHeart className={`wishlist-icon ${liked ? "active" : ""}`}/>
 </div>

</div>

<div className="qty-cart-rows">
<div className="quantity-section">
  <p>Quantity: <span>{qty}</span></p>

  <div className="product-qty">
    <button onClick={() => setqty(qty > 1 ? qty - 1 : 1)}><FaMinus className="equal"/></button>
    <span>{qty}</span>
    <button onClick={() => setqty(qty + 1)}><FaPlus className="equal"/></button>
  </div>
</div>

  <div className="cart-buttons">
    <button className={`cart-btn ${isadd ? "added-cart" : ""}`} onClick={addtocart}> 
      <FaShoppingCart className="shoping"/>
   {isadd ? "Added to Cart" : "Add to Cart"}</button>
  </div>
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