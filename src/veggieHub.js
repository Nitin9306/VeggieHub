import "./veggieHub.css";
import { Link } from "react-router-dom";
import { FaTruck,FaLeaf, FaRupeeSign,FaLock} from "react-icons/fa";
function veggieHub()
{
    return(
 <>
        <div className="why">
            <h1>Why Choose VeggieHub?</h1>
        </div>

        <div className="main-box">
            <div className="delivery">
                <div className="truck-delivery">
                <FaTruck />
                </div>
                <h3>Fast Delivery</h3>
                <p>Get your delivered</p>
                <h5>super fast at your doorstep.</h5>
            </div>

            <div className="delivery geeta">
                <div className="truck-delivery">
                <FaLeaf />
                </div>
                <h3>Farm Fresh</h3>
                <p>Handpicked fresh products</p>
                <h5>directly from farms.</h5>
            </div>

            
            <div className="delivery geetaa">
                <div className="truck-delivery">
                <FaRupeeSign />
                </div>
                <h3>Best Prices</h3>
                <p>Top quality products at</p>
                <h5>the best prices.</h5>
            </div>

             <div className="delivery">
               <div className="truck-delivery">
                <FaLock />
                </div>
                <h3>Secure Payment</h3>
                <p>100% secure payments</p>
                <h5>for a hassle-free shopping.</h5>
            </div>
        </div>
        </>
    );
}
export default veggieHub;