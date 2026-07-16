import { Link } from "react-router-dom";
import { FaHeart,FaShoppingCart } from "react-icons/fa";
function ProductCard({item,addtoCart,addToWishlist,page}){
    return(
<>
<div className="card">
    <div className="wishlist-btn" onClick={()=> addToWishlist(item)}>
        <FaHeart className="wishlist-icon"/>
    </div>

    <img src={item.image} alt={item.name} />
    <h3>{item.name}</h3>
    <h2>₹{item.price} kg <span className="extra-price">₹{item.price*2}</span></h2>

    <div className="btn-box">
        {page !== "home" && ( 
        <button className="cart-btn" onClick={()=>addtoCart(item)}>
            <FaShoppingCart />Add Cart
        </button>
         )}

        <Link to={`/product/${item.id}`}>
        <button className="buy-btnx">Buy Now</button>
        </Link>
    </div>
</div>
</>
    )
}
export default ProductCard;