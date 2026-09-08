import "./CartDrawer.css";
import { useState,useEffect } from "react";
import { FaTrash, FaPlus,FaMinus ,FaShoppingBag,FaArrowRight} from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { Navigate, useNavigate } from "react-router-dom";
function CartDrawer({ isOpen, onClose }) {



    const navigate = useNavigate();
   const [cartitems,setcartitems]=useState([]);
useEffect(()=>{
  const loadCart = () =>{
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setcartitems(cart);
  };
  if(isOpen){
    loadCart();
  }
  window.addEventListener("cartUpdated",loadCart);
  return ()=>{
    window.removeEventListener("cartUpdated",loadCart);
  };
},[isOpen]);

console.log(cartitems);
    const total = cartitems.reduce((sum,item)=>sum + item.price * item.qty,0);

    const increaseQty = (id) => {
  const updated = cartitems.map((item) =>
    item.id === id
      ? { ...item, qty: item.qty + 1 }
      : item
  );

  setcartitems(updated);
  localStorage.setItem("cart", JSON.stringify(updated));
};

const decreaseQty = (id) => {
  const updated = cartitems.map((item) =>
    item.id === id
      ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
      : item
  );

  setcartitems(updated);
  localStorage.setItem("cart", JSON.stringify(updated));
};

const deleteItem = (id) => {
  const updated = cartitems.filter((item) => item.id !== id);

  setcartitems(updated);
  localStorage.setItem("cart", JSON.stringify(updated));
};
  return (
    <>
      {isOpen && <div className="drawer-overlay" onClick={onClose}></div>}

      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-header">
         <FiShoppingBag className="shoping"/><h2>Your Cart</h2>
         <span className="lengths">{cartitems.length} items</span>
          <button onClick={onClose} className="closedd">✕</button>
        </div>

        <div className="drawer-body">
          {cartitems.length === 0 ? (
         <div className="empty-cart">
          <FiShoppingBag className="shop-iconed"/>
          <h3 className="mid-point">Your cart is empty</h3>
         </div>
) : (
  cartitems.map((item) => (
    <div className="drawer-item" key={item.id}>
      <img src={item.image} alt={item.name} />

      <div className="item-info">
        <h4>{item.name}</h4>
        <p>₹{item.price} kg</p>

        <div className="qty-box">
          <button onClick={()=>decreaseQty(item.id)}><FaMinus /></button>
          <span>{item.qty}</span>
          <button onClick={()=>increaseQty(item.id)}><FaPlus /></button>
        </div>
      </div>

      <FaTrash className="delete-icon"  onClick={()=>deleteItem(item.id)}/>
    </div>
  ))
)}
        </div>

        <div className="drawer-footer">
          <div className="summary-row">
            <span className="sub">Subtotal</span>
            <strong className="tote">₹{total}</strong>
          </div>
          <div className="summary-row">
            <span className="sub">Delivery</span>
            <strong className="fr">Free</strong>
          </div>
          
          <div className="foot-liner"></div>
            <div className="summary-row">
            <span className="tot">Total</span>
            <strong className="toti">₹{total}</strong>
          </div>
          <button className="checkout-btn" disabled={cartitems.length === 0} onClick={()=>{
            const user = JSON.parse(localStorage.getItem("user"));
            onClose();
            if(!user){
                navigate("/login");
            }else{
                navigate("/checkout");
            }
          }}>
            Proceed to Checkout <FaArrowRight className="right-errow"/>
          </button>
        </div>
      </div>
    </>
  );
}

export default CartDrawer;