import { useState } from "react";
import { Link } from "react-router-dom";
import "./wishlist.css";
function Wishlist()
{
    const [wishlist,setwishlist]=useState(JSON.parse(localStorage.getItem("wishlist")) || []);
    const removeitem =(id)=> {
        const updatewishlist = wishlist.filter((item) =>
        item.id !== id);
        setwishlist(updatewishlist);
        localStorage.setItem(
            "wishlist",
            JSON.stringify(updatewishlist)
        );
    };

    const addtocart = (product) => {
        const cart = JSON.parse(localStorage.getItem("cart")) ||[];

        const exists = cart.find(
            (item) => item.id ===
            product.id
        );


        if(exists){
            exists.qty +=1;
        }
        else{
            cart.push({...product,qty:1,});
        }
        localStorage.setItem("cart",
            JSON.stringify(cart)
        );
    };
    return(
        <>
        <div className="wishlist">
            <h1>My Wishlist</h1>
            {wishlist.length ===0 ? (
                <h2 className="empty">Wishlist is empty</h2>
            ):(
                <>
                <div className="wishlist-grid">
                    {wishlist.map((item)=>(
                       <div className="wishlist-card" key={item.id}>
                       <Link to={`/product/${item.id}`}>
                       <img src={item.image}/>
                       </Link>
                       <h3>{item.name}</h3>
                       <p>{item.price}/kg</p>
                       <div className="wishlist-btns">
                        <button className="add-btn" onClick={()=>addtocart(item)}>Add to Cart</button>
                        <button className="remove-btn" onClick={()=>removeitem(item.id)}>Remove</button>
                       </div>

                       </div> 
                    ))}
                </div>
                </>
            )};
        </div>
        </>
    )
}
export default Wishlist;