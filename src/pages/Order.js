import "./order.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaBox,
  FaTruck,
  FaShippingFast,
  FaCheckCircle,
  FaEye,
  FaMapMarkerAlt,
  FaClipboardList,
  FaHeadset
} from "react-icons/fa";

function Orders() {

  const userdata = localStorage.getItem("user");
  const user = userdata ? JSON.parse(userdata) : null;

  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const res = await axios.get(
          `https://veggiehub-1037.onrender.com/api/orders/${user._id}`
        );

        console.log("Orders:", res.data);
        console.log("first order",res.data[0]);
        console.log("order id",res.data[0]?.orderId);

        setOrders(res.data);

      } catch (err) {

        console.log("Order Error:", err);

      }

    };

    if (user) {
      fetchOrders();
    }

  }, []);


  const getStatusStep = (status) => {

    if (status === "Pending") {
      return 1;
    }

    if (status === "Order Confirmed") {
      return 1;
    }

    if (status === "Shipped") {
      return 2;
    }

    if (status === "Out for Delivery") {
      return 3;
    }

    if (status === "Delivered") {
      return 4;
    }

    return 1;
  };

 
  const filteredOrders = orders.filter((item) => {

    if (tab === "All") {
      return true;
    }

    if (tab === "Placed") {
      return [
        "Pending",
        "Order Confirmed"
      ].includes(item.status);
    }

    if (tab === "Out") {
      return item.status === "Out for Delivery";
    }

    if (tab === "Delivered") {
      return item.status === "Delivered";
    }

    return true;

  });

  return (

    <div className="orders-page">

      <div className="orders-container">

        <div className="orders-heading">

          <div>
            <h2>My Orders</h2>
            <p>Track and manage your recent orders</p>
          </div>

        </div>


        <div className="order-tabs">

          <button
            className={tab === "All" ? "active" : ""}
            onClick={() => setTab("All")}
          >
            <FaClipboardList />
            All Orders
          </button>

          <button
            className={tab === "Placed" ? "active" : ""}
            onClick={() => setTab("Placed")}
          >
            <FaBox />
            Placed
          </button>

          <button
            className={tab === "Out" ? "active" : ""}
            onClick={() => setTab("Out")}
          >
            <FaTruck />
            Out for Delivery
          </button>

          <button
            className={tab === "Delivered" ? "active" : ""}
            onClick={() => setTab("Delivered")}
          >
            <FaCheckCircle />
            Delivered
          </button>

        </div>



        {filteredOrders.length === 0 ? (

          <div className="empty-order">

            <FaBox className="empty-icon" />

            <h3>
              {orders.length === 0
                ? "No orders yet"
                : "No orders found"}
            </h3>

            <p>
              {orders.length === 0
                ? "Start shopping to see your orders here"
                : "Try another order category"}
            </p>

            {orders.length === 0 && (
              <button
                onClick={() => navigate("/allproduct")}
              >
                Start Shopping
              </button>
            )}

          </div>

        ) : (

          <div className="orders-list">

            {filteredOrders.map((item) => {

              const currentStep = getStatusStep(item.status);

              return (

                <div
                  className="order-card"
                  key={item._id}
                >

                  <div className="order-card-top">


             

                    <div className="order-icon-box">

                      <FaBox />

                    </div>


                 

                    <div className="order-info">

                      <span className="small-title">
                        Order ID
                      </span>

                      <h3>
                        #{item.orderId}
                      </h3>

                      <span className="order-date">

                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              }
                            )
                          : "Order placed"}

                      </span>

                    </div>


               

                    <div className="payment-info">

                      <span className="small-title">
                        Payment Method
                      </span>

                      <strong>
                        {item.payment || "Cash on Delivery"}
                      </strong>

                    </div>



                    <div className="total-info">

                      <span className="small-title">
                        Total Amount
                      </span>

                      <strong>
                        ₹{item.total}
                      </strong>

                    </div>



                    <div className={`order-status ${
                      item.status === "Delivered"
                        ? "delivered-status"
                        : item.status === "Out for Delivery"
                        ? "out-status"
                        : "pending-status"
                    }`}>

                      {item.status || "Pending"}

                    </div>

                  </div>



                  <div className="order-product-section">

                    <div className="product-image-boxe">

                      {item.image ? (

                        <img
                          src={item.image}
                          alt={item.productName}
                        />

                      ) : (

                        <FaBox />

                      )}

                    </div>


                    <div className="product-details">

                      <h3>
                        {item.productName || "Product"}
                      </h3>

                      <p>
                        Quantity: {item.quantity}
                      </p>

                    </div>

                  </div>



                  <div className="tracking-sections">

                    <div className="tracking-line"></div>



                    <div className={`tracking-step ${
                      currentStep >= 1 ? "active" : ""
                    }`}>

                      <div className="tracking-circle">

                        <FaBox />

                      </div>

                      <strong>
                        Confirmed
                      </strong>

                      <span>
                        {currentStep >= 1 ? "Completed" : "Pending"}
                      </span>

                    </div>


                    <div className={`tracking-step ${
                      currentStep >= 2 ? "active" : ""
                    }`}>

                      <div className="tracking-circle">

                        <FaTruck />

                      </div>

                      <strong>
                        Shipped
                      </strong>

                      <span>
                        {currentStep >= 2 ? "Completed" : "Pending"}
                      </span>

                    </div>



                    <div className={`tracking-step ${
                      currentStep >= 3 ? "active" : ""
                    }`}>

                      <div className="tracking-circle">

                        <FaShippingFast />

                      </div>

                      <strong>
                        Out for Delivery
                      </strong>

                      <span>
                        {currentStep >= 3 ? "Completed" : "Pending"}
                      </span>

                    </div>



                    <div className={`tracking-step ${
                      currentStep >= 4 ? "active" : ""
                    }`}>

                      <div className="tracking-circle">

                        <FaCheckCircle />

                      </div>

                      <strong>
                        Delivered
                      </strong>

                      <span>
                        {currentStep >= 4 ? "Completed" : "Pending"}
                      </span>

                    </div>

                  </div>


                  <div className="order-actions">

                    <button
                      className="view-order-btn"
                    >
                      <FaEye />
                      View Details
                    </button>

                    <button
                      className="track-order-btn"
                      onClick={() =>
                        navigate(`/tracking/${item._orderId || item._id}`)
                      }
                    >
                      <FaMapMarkerAlt />
                      Track Order
                    </button>

                  </div>

                </div>

              );

            })}

          </div>

        )}

        <div className="order-support">

          <div className="support-icon">

            <FaHeadset />

          </div>

          <div>

            <h3>
              Need Help with your order?
            </h3>

            <p>
              Contact our support team for any assistance.
            </p>

          </div>

          <button>
            <FaHeadset />
            Contact Support
          </button>

        </div>

      </div>

    </div>

  );

}

export default Orders;