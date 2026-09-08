import "./allproducts.css";
import {FaHeart, FaStar,FaPlus } from "react-icons/fa";
import products from "../productsData";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
function Allproducts() {

    const location = useLocation();
    const queryparams = new URLSearchParams(location.search);
    const urlCategory = queryparams.get("category");

    const navigate = useNavigate();

   
    const [search, setsearch] = useState("");
    const [category, setcategory] = useState(urlCategory || "All");
    const [animate,setanimate]=useState(false);

    const categoriess = [
        {
            value: "All",
            label: "All Categories"
        },
        {
            value: "fruits-vegetables",
            label: "Fruits & Vegetables"
        },
        {
            value: "organic",
            label: "Organic"
        },
        {
            value: "personal-care",
            label: "Personal Care"
        },
        {
            value: "pantry",
            label: "Pantry Staples"
        },
        {
            value: "bakery",
            label: "Bakery"
        },
        {
            value: "beverages",
            label: "Beverages"
        }
    ];

    const selectedCategory = categoriess.find((item)=> item.value === category);
    const categorytitle = selectedCategory ? selectedCategory.label: "All Products";


    useEffect(() => {

        if (urlCategory) {
            setcategory(urlCategory);
        }

    }, [urlCategory]);


   const addtoCart  = (product,e)=>{
    if(e){
        e.preventDefault();
        e.stopPropagation();
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((item)=> item.id === product.id);
    if(exists){
        exists.qty += 1;
    }else{
        cart.push({
            ...product,
            qty:1
        });
    }
    localStorage.setItem("cart",JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("openCartDrawer"));
   };





    const filteredProducts = products.filter((item) => {

        let matchcategory = false;


        if (category === "All") {

            matchcategory = true;

        }

        else if (category === "fruits-vegetables") {

            matchcategory =
                item.category === "fruits" ||
                item.category === "vegetables";

        }

        else {

            matchcategory =
                item.category === category;

        }


        const matchsearch =
            item.name
                .toLowerCase()
                .includes(search.toLowerCase());


        return matchcategory && matchsearch;

    });


    return (
        <>

            <div className="all-product">


                <div className="productss-lay">


                

                    <aside className="category-sidebar">

                        <h3>Categories</h3>


                        <div className="categoru-liste">

                            {categoriess.map((item) => (

                                <button
                                    key={item.value}
                                    className={
                                        category === item.value
                                            ? "categoru-active"
                                            : ""
                                    }
                                    onClick={() =>{
                                        setcategory(item.value);
                                       setanimate(false);
                                       setTimeout(() => {
                                        setanimate(true);
                                       }, 50);
                                    }}
                                >
                                    {item.label}
                                </button>


                            ))}

                

                        </div>
                    

                    </aside>



                

                    <div className="products-rights">



                        <div className="products-topp">

                            <div>

                                <h2>
                                    {categorytitle}
                                </h2>

                                <p>
                                    {filteredProducts.length} products found
                                </p>

                            </div>

                        </div>



                  

                        <div className={`products-grid ${animate ? "products-animate" : ""}`}>

                            {filteredProducts.map((item) => (
                                <ProductCard key={item.id}
                                item={item}
                                addtoCart={addtoCart}
                               />
                            ))}
                        

                            {filteredProducts.length === 0 && (

                                <div className="no-products">

                                    <h3 className="product-founds">
                                        No Products Found
                                    </h3>

                                    <p className="another">
                                        Try another category or search.
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </>
    );
}

export default Allproducts;