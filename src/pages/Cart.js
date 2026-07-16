import { useState } from "react";
import { Link } from "react-router-dom";
import "./cart.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTimes,FaTruck } from "react-icons/fa";
function Cart()
{
     const [showCheckout,setshowCheckout]=useState(false);
    const [submitted,setsubmitted]=useState(false);
    const user =JSON.parse(localStorage.getItem("user"));
    const [name,setname]=useState(user?.name || "");
    const [mail,setmail]=useState(user?.email || "");
    const [mobile,setmobile]=useState(user?.phone || "");
    const [address,setaddress]=useState("");
    const [payment,setpayment]=useState("");
    const [showSuccess,setshowSuccess]=useState(false);
    const navigate =useNavigate();
        const [cartitem ,setcartitem]=useState(
        
        JSON.parse(localStorage.getItem("cart")) ||
        []
    );
    console.log(cartitem);

    const deletitem = (id) =>{
        const updatecart = cartitem.filter(
            (item)=>item.id !==id
        );
        setcartitem(updatecart);
        localStorage.setItem(
            "cart",
            JSON.stringify(updatecart)
        );
    }


    const inc =(id) => {
        const updatecart = cartitem.map((item) =>
        item.id ===id ?
    {...item,qty:item.qty + 1} :item);

    setcartitem(updatecart);
    localStorage.setItem(
        "cart",
        JSON.stringify(updatecart)
    );
    }


    const dec = (id)=> {
        const updatecart = cartitem.map((item) =>
        item.id === id ? {
            ...item,qty:item.qty >1
            ?item.qty -1:1,
        }
    :item
);
setcartitem(updatecart);
localStorage.setItem(
    "cart",
    JSON.stringify(updatecart)
);

    }

    const totalprice = cartitem.reduce(
        (total,item)=> total+item.price*item.qty,0
    );
    return(
    
        <div className="cart-cont">
            <h1 className="cart-title">My cart</h1>
            <h2>Total items: {cartitem.length}</h2>
            {cartitem.length ===0 ? (
                <h2 className="empty">Cart is Empty</h2>
            ) : (
                <>
                 {cartitem.map((item) => (
                    <div className="cart-card" key={item.id}>


                        <img src={item.image}
                        width="100" />
                        <div className="cart-info">
                        <h3>{item.name}</h3>
                        <p>₹ {item.price}/kg</p>
                        
                        <p>Qty : {item.qty}</p>
                        <h2>Subtotal : ₹{item.price*item.qty}</h2> 
                        <div className="qty-box">
                        <button className="qty-btn" onClick={()=>dec(item.id)}>-</button>
                        <p>{item.qty}</p>
                        <button className="qty-btn" onClick={()=>inc(item.id)}>+</button>
                        </div>
                        <button className="dlt-btn" onClick={()=>deletitem(item.id)}>Delete</button>
                        </div>
                    </div>
                   
                ))}
                <div className="cart-totals">
                    <h2>Total Amount : {totalprice}₹</h2>
                    <button className="check-btn" onClick={()=>setshowCheckout(true)}>Place Order</button>
                </div>
               </> 

            
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
            
               
                <h3>Total: ₹{totalprice}</h3>
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

                  try{
                    for(const item of cartitem){
                        await axios.post("http://localhost:5000/api/orders",{
                            userId:user._id,
                            name,
                            email:mail,
                            phone:mobile,
                            image:item.image,
                            productName:item.name,
                            productPrice:item.price,
                            quantity:item.qty,
                            total:item.price*item.qty,address,payment,
                        });
                    }
                    
                    setshowCheckout(false);
                    setshowSuccess(true);
                  } catch (err){
                    console.log(err);
                    alert("Order Failed");
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
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for shopping with VeggieHub</p>
            <hr/>
            <p><strong>Order ID: </strong>#VGH{Date.now().toString().slice(-5)}</p>
            <p><strong>Payment: </strong>{payment}</p>
            
            <h3>Your Order</h3>
            {cartitem.slice(0,1).map((item)=>(
                <div className="success-item" key={item.id}>
                    <img src={item.image} alt={item.name}
                    className="success-img"/>
                    <div className="success-details">
                        <h4>{item.name}</h4>
                        <p>Qty: {item.qty}</p>
                        <p>₹ {item.price*item.qty}</p>
                        {cartitem.length >1 && (
                <div className="more-items">+ {cartitem.length - 1} More Items</div>
            )}
                    </div>
                </div>
            ))}
            
            <div className="total-box"><h4>Total Items: {cartitem.length}</h4></div>
            <hr/>
            <h3>Total Amount: ₹ {totalprice}</h3>
            <button onClick={()=> {localStorage.removeItem("cart"); setcartitem([]); setshowSuccess(false); navigate("/")}}>Continue Shopping</button>
        </div>
    </div>
 )}

        </div>
       
    );
    
}

export default Cart;