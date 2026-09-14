import { FaPlus, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProductCard({ item, addtoCart, addToWishlist }) {

    const navigate = useNavigate();

    const productId = item._id || item.id;


    const handleaddtocart = (e) => {

        e.preventDefault();
        e.stopPropagation();

        addtoCart({
            ...item,
            id: productId,
        });

        window.dispatchEvent(
            new Event("openCartDrawer")
        );

    };


    return (

        <div
            className="card"
            onClick={() => navigate(`/product/${productId}`)}
        >

            {item.discount > 0 && (

                <div className="discount-badgeh">

                    {item.discount}% OFF

                </div>

            )}


            <div className="product-image-box">

              
                <img
    src={
        item.image?.startsWith("/uploads/")
            
            ? `http://localhost:5000${item.image}`
            : item.image
    }
    alt={item.name}
/>

            </div>


            <div className="product-card-info">


                <h3>

                    {item.name}

                </h3>


                <div className="rating">

                    <FaStar className="star-icn" />

                    <span>

                        {item.rating || 4.5}

                    </span>

                    <small>

                        (12)

                    </small>

                </div>


                <div className="price-row">


                    <div className="priceer">

                        ₹{item.price}

                        <span> kg</span>


                        <del>

                            ₹{
                                item.oldprice ||
                                Math.round(
                                    item.price * 1.25
                                )
                            }

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