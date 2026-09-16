import { useState } from "react";
import "./Checkout.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {FaArrowLeft,FaMapMarked ,FaChevronRight, FaGift,FaCreditCard,FaCheck,FaPlus,FaTimes,FaTruck} from "react-icons/fa";
import {FiMapPin} from "react-icons/fi";
function Checkout(){
   
const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("user"));
    const [step,setstep]=useState(1);
    const [placeorder,setplaceorder]=useState(false);
const changestep = (newstep) => { setstep(newstep);};
    const [showadd,setshowadd]=useState(false);
    const [payment,setPayment]=useState("");
    const [showc,setshowc]=useState(false);
    const [savead,setsavead]=useState(JSON.parse(localStorage.getItem("deliveryAddress")));
    const [address,setaddress]=useState({
        fullName:"",
        mobile:"",
        house:"",
        area:"",
        city:"",
        state:"",
        pincode:""
    });
    const cartItems= JSON.parse(localStorage.getItem("cart")) || [];
    console.log("cart items",cartItems);
    const total = cartItems.reduce((sum,item)=>sum+item.price * item.qty,0);
   const [coupon, setCoupon] = useState("");
const [couponApplied, setCouponApplied] = useState(false);
const [couponError, setCouponError] = useState("");
const [couponData, setCouponData] = useState(null);
const [couponLoading, setCouponLoading] = useState(false);

const discount = couponData?.discountAmount || 0;

const finalTotal = couponApplied
  ? couponData?.finalAmount || total
  : total;


const applyCoupon = async () => {

  if (!coupon.trim()) {
    setCouponError("Please enter coupon code");
    return;
  }

  try {

    setCouponLoading(true);
    setCouponError("");

    const res = await axios.post(
      "https://veggiehub-1037.onrender.com/api/coupons/apply",
      {
        code: coupon.trim().toUpperCase(),
        amount: total
      }
    );

    if (res.data.success) {

      setCouponData(res.data);
      setCouponApplied(true);

    }

  } catch (error) {

    console.log("COUPON ERROR:", error);
    console.log("status",error.response?.status);
    console.log("data",error.response?.data);
    console.log("url",error.config?.url);
    setCouponApplied(false);
    setCouponData(null);

    setCouponError(
      error.response?.data?.message ||
      `Coupon failed (${error.response?.status || "Network error"})`
      
    );

  } finally {

    setCouponLoading(false);

  }

};


const removeCoupon = () => {

  setCoupon("");
  setCouponApplied(false);
  setCouponData(null);
  setCouponError("");

};


    const handlePayment = async () => {

try{

const response = await axios.post(
"https://veggiehub-1037.onrender.com/api/payment/order",
{
amount: finalTotal
}
);


const razorpayOrder = response.data;


const options = {

key:"rzp_test_TEYsTguo7KsPG3",

amount:razorpayOrder.amount,

currency:"INR",

name:"VeggieHub",

description:"Vegetable Order Payment",

order_id:razorpayOrder.id,


handler: async function(paymentResponse){

const res = await axios.post(
  "https://veggiehub-1037.onrender.com/api/orders",
  {
    userId: user._id,

    name: user.name,

    email: user.email,

    phone :savead.mobile,
    address:{
      fullName:user.name,
      mobile:savead.mobile,
      house:savead.house,
      area:savead.area,
      city:savead.city,
      state:savead.state,
      pincode:savead.pincode

    },

    productName: cartItems.map(item => item.name).join(", "),

    image: cartItems[0]?.image || "",
   

    quantity: cartItems.reduce(
      (sum, item) => sum + item.qty,
      0
    ),

    productPrice: finalTotal,

    payment: "ONLINE",

    paymentStatus: "PAID",

    paymentId: paymentResponse.razorpay_payment_id,

    items: cartItems,

    total: finalTotal
  }
);



localStorage.removeItem("cart");


setshowc(true);


setTimeout(()=>{
navigate(`/tracking/${res.data.order.orderId}`);
},2500);


}


};


const razor = new window.Razorpay(options);

razor.open();


}
catch(error){

console.log(error);
setplaceorder(false);
alert("Payment Failed");

}

};

  const placeOrder = async () => {
    setplaceorder(true);

  if(payment === "ONLINE"){
    handlePayment();
    return;
  }


if (payment === "COD") {

  try {

    const res = await axios.post(
      "https://veggiehub-1037.onrender.com/api/orders",
      {
        userId: user._id,

        name: user.name,

        email: user.email,

        phone: savead.mobile,

      address:{
        fullName:user.name,
        mobile:savead.mobile,
        house:savead.house,
        area:savead.area,
        city:savead.city,
        state:savead.state,
        pincode:savead.pincode
      },

        productName: cartItems.map(item => item.name).join(", "),

        productPrice: finalTotal,

        quantity: cartItems.reduce(
          (sum, item) => sum + item.qty,
          0
        ),

        image: cartItems[0]?.image || "",
         items:cartItems,
        payment: "COD",

        paymentStatus: "Pending",

        total: finalTotal
      }
    );

    console.log("ORDER SAVED:", res.data);

    localStorage.removeItem("cart");

    setshowc(true);

    setTimeout(() => {
      navigate(`/tracking/${res.data.order.orderId}`);
    }, 2500);

  } catch (err) {

    console.log(err);
setplaceorder(false);
    alert("Order Save Failed");

  }

}

};


    const fulladdress = savead? `${savead.house}, ${savead.area}, ${savead.city}, ${savead.state}, ${savead.pincode}`:"";
    return(
        <>
      
  <div className="checkout-page">

    <div className="checkout-header">
      <button className="back-btnme" onClick={()=> navigate("/")}> <FaArrowLeft className="left-ar"/> Back</button>
      <h2>Checkout</h2>
    </div>

    <div className="checkout-steps">
      <button
        type="button"
        className={step === 1 ? "active-step" : ""}
        onClick={() =>changestep(1)}
      ><FiMapPin className="mapeled"/>
        Address
        <FaChevronRight className="righted"/>
      </button>

      <button
        type="button"
        className={step === 2 ? "active-step" : ""}
       onClick={() => {
        if(!savead) {
          alert("Please add delivery address first");
          setstep(1);
          return;
        }
        changestep(2);
       }}
      ><FaCreditCard className="mapeled"/>
        Payment
        <FaChevronRight className="righted"/>
      </button>

      <button type="button"
      className={step ===3 ? "active-step" : ""}
      onClick={() =>{
        if(!payment){
          alert("Please select a payment method first");
          setstep(2);
          return;
        }
        changestep(3);
      }}>
        <FaCheck className="mapeled"/>
        Review
      </button>
    </div>

    <div key={step} className="checkout-content">

      <div className="left-side">

        {step === 1 && (
            <div className="address-section">
              
                <h2><FiMapPin className="mapeled"/> Delivery Address</h2>
                <div className="address-card">
                    
                    <p>{JSON.parse(localStorage.getItem("user"))?.name}</p>
                   {savead ? (
    <>
        <p>{savead.mobile}</p>

        <p className="saved-addresss">
            {savead.house},
            {savead.area},
            {savead.city},
            {savead.state},
            {savead.pincode}
        </p>
    </>
) : (
    <>
        <p>Address not added yet</p>

        <button
            className="change-btn"
            onClick={() => setshowadd(true)}
        >
            Add New Address
            <FaPlus className="plus-icon"/>
        </button>
    </>
)}
                </div>
                <button className="continue-btn" disabled={!savead} onClick={()=>changestep(2)}>Continue to Payment <FaChevronRight className="conti-btn"/></button>
            </div>
        )}

        {step === 2 && (
  <div className="payment-section">

    <h2> <FaCreditCard className="pay-icon"/>Payment Method</h2>

    <label className="payment-card">
      <input
        type="radio"
        name="payment"
        value="ONLINE"
        onChange={(e) => setPayment(e.target.value)}
      />

      <div>
        <h4>Credit / Debit Card</h4>
        <p>Pay securely using Razorpay</p>
      </div>
    </label>

    <label className="payment-card">
      <input
        type="radio"
        name="payment"
        value="COD"
        onChange={(e) => setPayment(e.target.value)}
      />

      <div>
        <h4>Cash On Delivery</h4>
        <p>Pay when you receive</p>
      </div>
    </label>

    <button
      className="continue-btn"
      disabled={!payment}
      onClick={() => changestep(3)}
    >
      Review Order
    </button>

  </div>
)}

        {step === 3 && (
  <div className="review-section">

    <h2> <FaCheck className="check-icone"/>Review Your Order</h2>

    <div className="review-card">

      <h3 className="del-add"><FaTruck className="truck-icon"/> Delivery Address</h3>

    
    <p className="delivery-ad">{fulladdress.length >30 ? fulladdress.substring(0,30)+"..........":fulladdress}</p>

      <hr className="row-line" />

      <h3 className="pay-mode" >Payment Mode</h3>

      <p className="react-pay" >{payment}</p>

     <hr className="row-line" />

      {cartItems.map((item) => (
  <div className="review-item" key={item.id}>

<div className="review-lefts">
  <div className="image-sect">
   <img src={item.image?.startsWith("/uploads/")
        ?
        `http://localhost:5000${item.image}`
        : item.image
      }
      alt={item.name}/>

    <div className="review-info">
      <h4>{item.name}</h4>
      <p>Qty: {item.qty}</p>
      </div>
      </div>
    </div>
    <h4 className="review-pricee">₹{item.price * item.qty}</h4>

  </div>
))}

      <button
        className="place-order-btn"
        onClick={placeOrder}
        disabled={placeorder}
      >
        {
          placeorder ? "Placing Order..." : `Place Order - ₹${finalTotal} `
        }
       
      </button>

    </div>

  </div>
)}

      </div>

      <div className="right-side">

  <h3>Order Summary</h3>

  <div className="coupon-box">

    <div className="coupon-heading">
      <span className="coupon-icon"><FaGift/></span>

      <div>
        <h4>Have a Coupon?</h4>
        <p>Save more on your order</p>
      </div>
    </div>

    {!couponApplied ? (
      <div className="coupon-input-row">

        <input
          type="text"
          placeholder="Enter coupon code"
          value={coupon}
          onChange={(e) => {
            setCoupon(e.target.value.toUpperCase());
            setCouponError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              applyCoupon();
            }
          }}
        />

        <button onClick={applyCoupon}
        disabled={couponLoading}>
          {couponLoading ? "..." : "Apply"}
          
        </button>

      </div>
    ) : (
      <div className="coupon-applied">

        <div className="coupon-success">

          <div className="coupon-check">
            <FaCheck />
          </div>

          <div>
            <strong>{couponData?.coupon} Applied</strong>
            <span>{couponData?.discountPercent}%OFF you Saved ₹{couponData?.discountAmount}</span>
          </div>

        </div>

        <button
          className="remove-coupon"
          onClick={removeCoupon}
        >
          Remove
        </button>

      </div>
    )}

    {couponError && (
      <p className="coupon-error">
        {couponError}
      </p>
    )}

  </div>


 

  <div className="summary-card">

    <p className="final-stage">
      Subtotal ({cartItems.length} items)
    </p>

    <h6 className="total-pricedd">
      ₹{total}
    </h6>

  </div>




  {couponApplied && couponData &&  (
    <div className="summary-card discount-row">

      <p>
        Coupon Discount
        <span className="discount-badge">
          {couponData.discountPercent} % OFF
        </span>
      </p>

      <span>
        -₹{couponData.discountAmount}
      </span>

    </div>
  )}



  <div className="summary-card delivery-boxed">

    <p>Delivery</p>

    <span className="free-del">
      Free
    </span>

  </div>


  <hr className="hor-liner" />



  {couponApplied && couponData && (
    <div className="total-savings">

      <FaCheck />

      <span>
        You are saving ₹{couponData.discountAmount} on this order
      </span>

    </div>
  )}


  <div className="summary-card total-amounted">

    <div>
      <h2>Total</h2>

      {couponApplied && (
        <small>
          Inclusive of all applicable discounts
        </small>
      )}
    </div>

    <span>
      ₹{finalTotal}
    </span>

  </div>

</div>

    </div>


    {showadd && (
  <div className="address-overlay">

    <div className="address-popup">
 <div className="cut-div">
      <h2>Add New Address</h2>
      <button
          className="cross-nt"
          onClick={() => setshowadd(false)}
        >
          <FaTimes className="cross-icone"/>
        </button>
   </div>

<input type="text" placeholder="Mobile number" value={address.mobile}
maxLength="10"
onChange={(e) => setaddress({
  ...address,mobile:e.target.value.replace(/\D/g,"")
})}/>
      <input
        type="text"
        placeholder="House / Flat No."
        value={address.house}
        onChange={(e) =>
          setaddress({ ...address, house: e.target.value })
        } required
      />

      <input
        type="text"
        placeholder="Area / Street"
        value={address.area}
        onChange={(e) =>
          setaddress({ ...address, area: e.target.value })
        } required
      />
<div className="add-inpu">
      <input
        type="text"
        placeholder="City"
        value={address.city}
        onChange={(e) =>
          setaddress({ ...address, city: e.target.value })
        } required
      />

      <input
        type="text"
        placeholder="State"
        value={address.state}
        onChange={(e) =>
          setaddress({ ...address, state: e.target.value })
        } required
      />
</div>
      <input
        type="text" className="pin-codee"
        placeholder="Pincode"
        value={address.pincode}
        onChange={(e) =>
         setaddress({ ...address, pincode: e.target.value })
        } required
      />

      <div className="address-btns">

        <button
          className="save-btn"
        onClick={()=>{
          if(!address.mobile || 
            address.mobile.length !==10
          ) {
            alert("Please enter a Valid 10 digit mobile number.");
            return;
          }
          if(
            !address.house ||
            !address.area ||
            !address.city ||
            !address.state ||
            !address.pincode
          )
          {
            alert("Please fill all address details");
            return;
          }
          setaddress(address);
          localStorage.setItem("deliveryAddress",JSON.stringify(address));
          setshowadd(false);
        }}
        >
          Save Address
        </button>

      </div>

    </div>

  </div>
)}

  </div>
  {showc && (
  <div className="success-overlay">
    <div className="success-popup">

      <div className="success-icon">

        ✔

        <span className="success-dot dot1"></span>
        <span className="success-dot dot2"></span>
        <span className="success-dot dot3"></span>
        <span className="success-dot dot4"></span>
        <span className="success-dot dot5"></span>
        <span className="success-dot dot6"></span>

      </div>

      <h2>Order Placed Successfully!</h2>

      <p>
        Thank you for shopping with <b>VeggieHub</b>
      </p>

      <p>Your order is being prepared...</p>

      <div className="success-loader"></div>

    </div>
  </div>
)}

</>
    );
}
export default Checkout;