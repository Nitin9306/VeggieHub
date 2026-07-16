import logo from "./pages/images/logos.png";
import "./footer.css";
import { Link } from "react-router-dom";
import { FaFacebookF,FaInstagram,FaTwitter,FaYoutube, FaPhone,FaEnvelope,FaMapMarkedAlt} from "react-icons/fa";
function footer(){
    return(
        <>
        <div className="footer">
               
                    <div className="foot-img veggie">
                        <Link to="/"><img src={logo}></img></Link>
                         <div className="shope">
                              <p>Your one stop shop for farm fresh vegetables and fruits. We deliver freshness at your doorstep.</p>
                         </div>
                         <div className="social-icon">
                            <FaFacebookF/>
                            <FaInstagram/>
                            <FaTwitter/>
                            <FaYoutube/>

                         </div>
                    </div>
                    
                <div className="links">
                    <ul className="quick">
                        <h2>Quick Links</h2>
                        <Link to="/" className="alld"><li>Home</li></Link>
                         <Link to= "/allproduct" className="alld"><li>Shop</li></Link>
                          <Link to="/service" className="alld"><li>Categories</li></Link>
                           <Link to="/about" className="alld"><li>About Us</li></Link>
                            <Link to="/contact" className="alld"><li>Contact Us</li></Link>
                    </ul>
                </div>


                <div className="links">
                    <ul className="quick">
                        <h2>Customer Service</h2>
                        <li>FAQ</li>
                         <li>Shipping Policy</li>
                          <li>Return Policy</li>
                           <li>Privacy Policy</li>
                            <li>Term & Conditions</li>
                    </ul>
                </div>



                <div className="links">
                    <ul className="quick number">
                        <h2>Contact Us</h2>
                        <li> <FaPhone  className="support ph"/>91+9306593030</li>
                         <li> <FaEnvelope className="support" />support@veggiehub.com</li>
                          <li> <FaMapMarkedAlt  className="support"/>yamuna nagar Haryana india (135001)</li>
                           
                    </ul>
                </div>
                
        </div>
        <div className="foot-line"></div>
        <div className="the-end">
            <div>
                <h4>&copy; 2026 VeggieHub All rights Reserved. </h4>
            </div>
            
        </div>
        </>
    );
}
export default footer;