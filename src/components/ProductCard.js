import { Link } from "react-router-dom";
import { FaHeart, FaPlus, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProductCard({ item, addtoCart, addToWishlist }) {

    const navigate = useNavigate();

    const handleaddtocart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        addtoCart(item);

        window.dispatchEvent(
            new Event("openCartDrawer")
        );
    };

    return (
        <div
            className="card"
            onClick={() => navigate(`/product/${item.id}`)}
        >

            <div className="discount-badgeh">
                10% OFF
            </div>



        
            <div className="product-image-box">
                <img
                    src={item.image}
                    alt={item.name}
                />
            </div>


         
            <div className="product-card-info">

                <h3>{item.name}</h3>

                <div className="rating">
                    <FaStar className="star-icn" />
                    <span>4.5</span>
                    <small>(12)</small>
                </div>


                <div className="price-row">

                    <div className="priceer">
                        ₹{item.price}
                        <span> kg</span>

                        <del>
                            ₹{item.price * 2}
                        </del>
                    </div>


                    <button
                        type="button"
                        className="plus-btnnx"
                        onClick={handleaddtocart}
                    >
                        <FaPlus />
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ProductCard;