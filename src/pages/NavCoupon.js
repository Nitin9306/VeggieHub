
import React, {useState} from "react";
import {FaCopy, FaCheck,FaTicketAlt} from "react-icons/fa";
import "./NavCoupon.css";
function NavCoupon(){

    const [copied,setcopied]=useState(null);
    const coupons = [
        {
            id:1,
            discount:"₹100 OFF",
            title:"First Order Discount",
            code:"WELCOME20",
            detail:"Min Order ₹499",
            expiry: "31 July 2026"
        },
        {
             id:2,
            discount:"₹50 OFF",
            title:"Fresh Vegetables Discount",
            code:"VEGGIE50",
            detail:"Min Order ₹299",
            expiry: "31 July 2026"
        },
        {
             id:3,
            discount:"₹249 OFF",
            title:"Fresh Fruits Discount",
            code:"FRUIT90",
            detail:"Min Order ₹149",
            expiry: "31 July 2026"
        }
    ];
    const copycoupon = (code,id)=>{
        navigator.clipboard.writeText(code);
        setcopied(id);
        setTimeout(()=>{
            setcopied(null);
        },2000);
    };
    return(
<>
<div className="coupon-page">
    <section className="coupon-hero">
        <FaTicketAlt/>
        <h1>VeggieHub Coupons</h1>
        <p>Save more on every fresh vegetable order</p>
    </section>

    <div className="coupon-category">
        <button>Trending</button>
        <button>New User</button>
        <button>Vegetables</button>
        <button>Delivery</button>
    </div>
    <section className="coupon-container">
        <h2>Best Offers For You</h2>

        <div className="coupon-grid">
            {
                coupons.map((item)=>(
                    <div className="coupon-card" key={item.id}>
                        <div className="discount">{item.discount}</div>
                        <h3>{item.title}</h3>
                        <div className="coupon-code"><FaTicketAlt/> {item.code}</div>
                        <p>{item.detail}</p>
                        <small>Expiry: {item.expiry}</small>

                        <button onClick={()=>copycoupon(item.code,item.id)}>{copied === item.id ? 
                            <><FaCheck/> Copied</> :<><FaCopy/> Copy Code</>}</button>
                    </div>
                ))
            }
        </div>
    </section>

    <section className="how-use">
        <h2>How To Apply Coupon ?</h2>
        <p className="ho">Select your products</p>
        <p>Go to checkout page</p>
        <p>Paste coupon code</p>
        <p>Enjoy discount</p>
    </section>
</div>

</>
    )
}
export default NavCoupon;