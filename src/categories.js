import "./categories.css";
import leafy from "./pages/images/leafy.png";
import root from "./pages/images/root.png";
import seson from "./pages/images/seson.png";
import fruite from "./pages/images/fruits.png";
import lefr from "./pages/images/leafed.png";
import beverage from "./pages/images/beverage.png";
import bread from "./pages/images/bread.png";
import personal from "./pages/images/persnl.png";
import organic from "./pages/images/organic.png";
import pantry from "./pages/images/pantry_staples-CcPzJo59.png";
import frozen from "./pages/images/frozen_foods-CJqLnA0J.png";
import { Link } from "react-router-dom";

const categorie = [
    {
       
        name:"Fruits",
        image: fruite,
        value:"fruits",
        
    },
    {
       
        name:"Vegetables",
        image: seson,
        value:"vegetables",
      
    },
    {
        
        name:"Organic",
        image: organic,
        value:"organic",
        
    },
     {
        
        name:"Bakery",
        image: bread,
        value:"bakery",
        
    },
     {
        
        name:"Beverages",
        image: beverage,
        value:"beverages",
        
    },
     {
        
        name:"Personal care",
        image: personal,
         value:"personal-care",
        
    },
     {
        
        name:"Pantry Staples",
        image: pantry,
         value:"pantry",
        
    },
    {
         
        name:"Frozen Foods",
        value:"frozen food",
        image:frozen,
       
    },
    
    
];
 function categories()
{
    return (
            <div className="home-cate">
                <section className="categories-sec">
                    <div className="section-heading">
                        <h2>Browse Categories</h2>
                        <p>Find exactly what you need using.</p>
                    </div>

                    <div className="categoriesed">
                        {categorie.map ((category,index) =>(
                            <Link to={`/allproduct?category=${category.value}`}
                            className="category" key={index}>
                                <div className="category-image">
                                    <img src={category.image} alt={category.name}></img>
                                </div>

                                <div className="category-names">
                                    {category.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
    );
}
export default categories;