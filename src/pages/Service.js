import "./service.css";
import { FaLeaf,FaTruck, FaLock, FaSmile, FaPhoneAlt,FaEnvelope,FaClock} from "react-icons/fa";
import leafed from "./images/leafed.png";
import fru from "./images/fruits.png";
import veg from "./images/veg.png";
import { Link } from "react-router-dom";
function Service() {
  return (
    <>
    <div className="categories-page">
      <div className="heading">
        <h1>Shop by Categories</h1>
        <p>Explore fresh fruits,vegetables and healthy products every day.</p>
      </div>

      <div className="categories-grid">
        <div className="carded">
          <img src={veg} alt="vegetables"></img>
          <div className="card-content">
            <h3>Vegetables</h3>
            <p>25 Fresh Products</p>
            <Link to="/allproduct?category=vegetables">
            <button>Explore Now</button>
            </Link>
          </div>
        </div>
           

             <div className="carded">
          <img src={fru} alt="vegetables"></img>
          <div className="card-content">
            <h3>Fruits</h3>
            <p>21 Fresh Products</p>
            <Link to="/allproduct?category=fruits">
            <button>Explore Now</button>
            </Link>
          </div>
        </div>



          <div className="carded leafed">
          <img src={leafed} alt="vegetables"></img>
          <div className="card-content down">
            <h3>Leafy Greens</h3>
            <p>18 Fresh Products</p>
            <Link to="/allproducts?category=leaf">
            <button>Explore Now</button>
            </Link>
          </div>
        </div>



          <div className="carded">
          <img src={fru} alt="vegetables"></img>
          <div className="card-content">
            <h3>Root</h3>
            <p>16 Fresh Products</p>
           <Link to="/allproduct?category=root">
            <button>Explore Now</button>
            </Link>
          </div>
        </div>

      </div>

      <div className="bannered">
        <h2>Freshness you can trust</h2>
        <p>At vegetables,we deliver fresh vegetables and fruits directly from
           trusted farms.Every products is carefully selected and packed to ensure premium quality reaches your doorstep.</p>
          <Link to="/allproduct">
           <button>Shop Now</button>
           </Link>
      </div>

      <div className="promise">
        <h2>Our promise</h2>
        <div className="promise-box">
          <div className="item">
            <FaLeaf  className="promise-icon"/>
            <h3>Premium Quality</h3>
            <p>Only fresh and quality checked products.</p>
          </div>

          <div className="item">
            <FaTruck className="promise-icon"/>
            <h3>Fast Delivery</h3>
            <p>Quick doorstep delivery every day.</p>
          </div>

          <div className="item">
            <FaLock  className="promise-icon"/>
            <h3>Secure Payment</h3>
            <p>100% safe and secure payments.</p>
          </div>

          <div className="item">
            <FaSmile  className="promise-icon"/>
            <h3>Customer Satisfication</h3>
            <p>Your happiness is our priority.</p>
          </div>
        </div>
      </div>


      <div className="contacted">
        <h2>Need Assistance?</h2>
        <div className="contacted-info">
        <p><FaPhoneAlt className="contac-icon" /> 91+ 9306593030 | 9306793030</p>
        <p><FaEnvelope className="contac-icon"/> support@veggiehub.com</p>
        <p> <FaClock  className="contac-icon"/>Monday - Sunday |8:00 AM - 10:00 PM</p>
      </div>
      </div>
    </div>
    </>
  )
}

export default Service;