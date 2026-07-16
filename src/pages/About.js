import "./about.css";
import { FaLeaf, FaTruck, FaCheckCircle, FaHeart} from "react-icons/fa";
import about from "./images/about.jpg";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function About(){
  return(
    <>
    <div className="about-page">

      <section className="about-hero">

        <div className="about-left">
         <span>ABOUT VEGGIEHUB</span>
         <h1>Freshness You Can Trust,Delivered every day</h1>
         <p>At VeggieHub we believe that healthy living starts with fresh food.
          We bring farm-fresh vegetables and fruits directly to your doorstep with quality,care,and fast delivery.
         </p>
         <p>Every product is carefully selected and packed to ensure freshness reaches your family every single day.</p>
         <Link to="/allproduct">
         <button className="about-btn">Shop Now</button>
         </Link>
        </div>

        <div className="about-right">
          <img src={about} alt="vegetables"></img>
        </div>
      </section>


      <section className="story-section">
        <div className="section-title">
          <h2>Our Story</h2>
          <p>Growing trust with every delivery.</p>
        </div>


        <div className="story-card">
          <p> VeggieHub was started with one simple idea-to make fresh vegetables and fruits easily available to everyone without visiting crowded markets. </p>
          <br/>

          <p> We work directly with trusted farmers and suppliers so that every product meets our quality standards. Farm harvesting to packaging,every step is handled with care.</p>
          <br/>

          <p>Today,VeggieHub proudly serves hundreds of happy customers while promoting healthy eating and supporting local farmers.</p>
        </div>

      </section>


      <section className="why-section">
        <div className="section-title">
          <h2>Why Choose VeggieHub ?</h2>
          <p>Fresh products with reliable service.</p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">

            <FaLeaf className="feature-icon"/>
            <h3>farm fresh</h3>
            <p>Directly sourced from trusted farms.</p>
          </div>

          <div className="feature-card">
            <FaTruck className="feature-icon"/>
            <h3>Fast delivery</h3>
            <p>safe and quick doorstep delivery.</p>
          </div>


          <div className="feature-card">
           <FaCheckCircle  className="feature-icon"/>
            <h3>Premium Quality</h3>
            <p>Every product is quality checked.</p>
          </div>

          <div className="feature-card">
            <FaHeart className="feature-icon"/>
            <h3>Healthy Living</h3>
            <p>Helping families eat fresh every day.</p>
          </div>

        </div>
      </section>


      <section className="stats-section">
        <div className="section-title">
          <h2>Our Achievments</h2>
          <p>Numbers that reflect our commitment.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h2>50<sup>+</sup></h2>
            <p>Happy Customers</p>
          </div>

          <div className="stat-card">
            <h2>100<sup>+</sup></h2>
            <p>Fresh Products</p>
          </div>

          <div className="stat-card">
            <h2>50<sup>+</sup></h2>
            <p>Partners Farms</p>
          </div>


          <div className="stat-card">
            <h2>60<sup>+</sup></h2>
            <p>Orders Delivered</p>
          </div>
        </div>
      </section>


      <section className="cta-section">
        <h2>Freshness Delivered with care</h2>
        <p>Thank you for chossing VeggieHub.We are committed to delivering fresh vegetables and fruits with the highest quality,affordable
          prices,and excellent customer service.
        </p>
        <Link to="/allproduct">
        <button className="about-btn">Start Shopping</button>
        </Link>
      </section>
    </div>
    </>
  )
}

export default About;