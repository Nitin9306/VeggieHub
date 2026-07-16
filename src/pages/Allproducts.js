import "./allproducts.css";
import {FaSearch,FaHeart} from "react-icons/fa";
import products from "../productsData";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState,useEffect} from "react";
function Allproducts(){

    const location =useLocation();
    const quaryparams =new URLSearchParams(location.search);
    const urlCategory = quaryparams.get("category");


    const [showpopup,setshowpopup]=useState(false);
    const [select,setselect]=useState(null);
    const [search,setsearch]=useState("");
    const [category ,setcategory] =useState(urlCategory || "All");

    useEffect(()=> {
        if(urlCategory){
            setcategory(urlCategory);
        }
    },[urlCategory]);

    const addtoCart =(products) =>{
        const cart = 
        JSON.parse(localStorage.getItem("cart")) || [];

        const exists = cart.find((item) => 
            item.id === products.id);

    if(exists){
        exists.qty +=1;
    }
    else{
        cart.push({...products,qty:1,});
    }

    localStorage.setItem("cart",JSON.stringify(cart));
    setselect(products);
    setshowpopup(true);
    setTimeout(()=>{
        setshowpopup(false);
    },2000);
    
    };
    return(
           <>
           <div className="all-product">
            <div className="product-heading">
                <h1>Our Fresh Products</h1>
                <p>Discover fresh vegetables,juicy fruits and organic groceries delivered straight to your doorstep.</p>
            </div>

            <div className="search-boxed">
                <FaSearch  className="serach-iconed"/>
                <input type="text" value={search}
                onChange={(e) => setsearch(e.target.value)} placeholder="Search fresh Products..."></input>
            </div>

            <div className="filter-buttons">
                <button className={category==="All" ? "active" : ""} onClick={()=>setcategory("All")}>All</button>
                <button className={category==="vegetables" ? "active":""} onClick={()=>setcategory("vegetables")}>Vegetables</button>
                <button className={category==="fruits" ? "active" : ""} onClick={()=>setcategory("fruits")}>Fruits</button>
                <button className={category==="organic" ? "active" :""} onClick={() =>setcategory("organic")}>Organic</button>

            </div>



            <div className="products-grid">
                {products.filter((item)=> {const matchcategory = 
                category === "All" || 
                item.category === category; 
                const matchsearch = 
                item.name.toLowerCase().includes(search.toLowerCase());
                return matchcategory && matchsearch;
})
               .map((item)=> (
                    <div className="products-carde" key={item.id}>
                        <span className="discounte">{item.discount} OFF</span>
                        <img src={item.image} alt={item.name}/>
                        <div className="ratingg">{item.rating || 4.1}
                            <span>({item.review || 120})</span>
                        </div>
                        <h3>{item.name}</h3>
                        <div className="priced">
                            <h2>₹{item.price}</h2>
                            <span>₹{item.oldprice || item.price +20}</span>
                        </div>

                        <button className="cart-btnw" onClick={()=>addtoCart(item)}>Add to Cart</button>
                        <Link to={`/product/${item.id}`}>
                        <button className="buy-btnm">Buy Now</button></Link>
                    </div>
                ))}
            </div>


 { showpopup && (
        <div className="cart-popup">
          <div className="pop-txts">
          <h4><FaHeart/> Added to Cart</h4>
          <p>{select?.name} Added successfully!</p> 
          </div>
         <Link to="/Cart">
         <button>View Cart</button></Link>
        </div>
      )

      }
            
           </div>


           </>
    )
}
export default Allproducts;