import { useState } from "react";
import { Link } from "react-router-dom";
import "./cart.css";
function Cart()
{
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
                    <button className="check-btn">Place Order</button>
                </div>
               </> 

            
            )}
        </div>
       
    );
    
}

export default Cart;