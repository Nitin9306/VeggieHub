import "./categories.css";
import leafy from "./pages/images/leafy.png";
import root from "./pages/images/root.png";
import seson from "./pages/images/seson.png";
import fruite from "./pages/images/fruits.png";
import lefr from "./pages/images/leafed.png";
import { Link } from "react-router-dom";
function categories()
{
    return (
             <section className="categories">
                <h2>Shop by category</h2>
                <div className="category-container">

                   
                    <div className="category-card">
                    <img src={root}></img>
                    <h3>Root</h3>
                    <p>Potato,carrot & more.</p>
                    </div>
                    <div className="category-card">
                    <img src={seson}></img>
                    <h3>Seasonal</h3>
                    <p>Best vegetables of season</p>
                    </div>
                    <div className="category-card lefre">
                    <img src={lefr}></img>
                    <h3 className="leg">Leafy Green</h3>
                    <p>100% natural products</p>
                    </div>
                    <div className="category-card">
                    <img src={fruite}></img>
                    <h3>Fruits</h3>
                    <p>100% natural Fruits</p>
                    </div>

                </div>
             </section>
    );
}
export default categories;