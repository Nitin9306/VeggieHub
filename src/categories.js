import "./categories.css";
import leafy from "./pages/images/leafy.png";
import root from "./pages/images/root.png";
import seson from "./pages/images/seson.png";
import fruite from "./pages/images/fruits.png";
import lefr from "./pages/images/leafed.png";
import beverage from "./pages/images/beverage.png";
import bread from "./pages/images/bread.png";
import { Link } from "react-router-dom";

const categorie = [
    {
       
        name:"Fruits",
        image: fruite,
        
    },
    {
       
        name:"Vegetables",
        image: seson,
      
    },
    {
        
        name:"Beverages",
        image: beverage,
        
    },
     {
        
        name:"Bakery",
        image: bread,
        
    },
     {
        
        name:"Beverages",
        image: beverage,
        
    },
     {
        
        name:"Beverages",
        image: beverage,
        
    },
     {
        
        name:"Beverages",
        image: beverage,
        
    },
    {
         
        name:"Frozen Foods",
        
        image:fruite,
       
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
                            <div className="category" key={index}>
                                <div className="category-image">
                                    <img src={category.image} alt={category.name}></img>
                                </div>

                                <div className="category-names">
                                    {category.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
    );
}
export default categories;