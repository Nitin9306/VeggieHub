import "./categories.css";
import leafy from "./pages/images/leafy.png";
import root from "./pages/images/root.png";
import seson from "./pages/images/seson.png";
import { Link } from "react-router-dom";
function categories()
{
    return (
             <section className="categories">
                <h2>Shop by category</h2>
                <div className="category-container">

                    <div className="category-card">
                    <img src={leafy}></img>
                    <h3>leafy</h3>
                    <p>Fresh green vegetables</p>
                    </div>
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
                    <div className="category-card">
                    <img src={seson}></img>
                    <h3>Organic</h3>
                    <p>100% natural products</p>
                    </div>
                    <div className="category-card">
                    <img src={seson}></img>
                    <h3>Organic</h3>
                    <p>100% natural products</p>
                    </div>

                </div>
             </section>
    );
}
export default categories;