import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaBox,FaUser,FaMapMarkerAlt,FaShoppingCart,FaCreditCard} from "react-icons/fa";
import "./Orders.css";

function Orders() {

    const [orders, setorders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get(
                "https://veggiehub-1037.onrender.com/api/orders"
            );

            setorders(res.data.orders);

        } catch (err) {
            console.log(err);
        }
    };


    const updatestatus = async (id, status) => {

        try {

            const res = await axios.put(
                `https://veggiehub-1037.onrender.com/api/orders/${id}`,
                {
                    status: status
                }
            );

            console.log("Update Success:", res.data);

            fetchOrders();

        } catch (err) {

            console.log("FULL UPDATE ERROR:", err);

            alert("Status update Failed");

        }

    };


    return (

        <div className="admin-orderss">

            <h1>Manage Orders</h1>

            <Sidebar />


            <table>

                <thead>

                    <tr>

                        <th className="c-name">Customer name</th>

                        <th>Product</th>

                        <th>Total</th>

                        <th>Payment</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>


                <tbody>

                    {orders.map((order) => (

                        <tr key={order._id}>

                            <td>{order.name}</td>

                            <td className="p-data">
                                {order.productName ||
                                    order.items?.map(item => item.name).join(", ")
                                }
                            </td>

                            <td>₹ {order.total}</td>

                            <td>{order.payment}</td>


                            <td>

                                <span
                                    className={`status ${order.status
                                        ?.replace(/\s+/g, "-")
                                        .toLowerCase()}`}
                                >

                                    {order.status}

                                </span>

                            </td>


                            <td className="order-actions">


                                <select className="stat-drop"
                                    value={order.status}
                                    onChange={(e) =>
                                        updatestatus(
                                            order._id,
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="Placed">
                                        Placed
                                    </option>

                                    <option value="Confirmed">
                                        Confirmed
                                    </option>

                                    <option value="Assigned">
                                        Assigned
                                    </option>

                                    <option value="Packed">
                                        Packed
                                    </option>

                                    <option value="Out for Delivery">
                                        Out for Delivery
                                    </option>

                                    <option value="Delivered">
                                        Delivered
                                    </option>

                                    <option value="Cancelled">
                                        Cancelled
                                    </option>

                                </select>


                                <button
                                    className="view-details-btn2"
                                    onClick={() =>
                                        setSelectedOrder(order)
                                    }
                                >

                                    👁 View Details

                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>



            {selectedOrder && (

                <div className="order-modal-overlay">

                    <div className="order-modal">


                      

                        <button
                            className="close-modal"
                            onClick={() =>
                                setSelectedOrder(null)
                            }
                        >

                            ×

                        </button>


                        <h2><FaBox className="box-order"/> Order Details</h2>


               

                        <div className="detail-section">

                            <h3><FaUser className="box-order"/> Customer Details</h3>

                            <p>
                                <b>Name:</b>
                                {" "}
                                {selectedOrder.name}
                            </p>

                            <p>
                                <b>Phone:</b>
                                {" "}
                                {selectedOrder.phone || "Not Available"}
                            </p>

                            <p>
                                <b>Email:</b>
                                {" "}
                                {selectedOrder.email || "Not Available"}
                            </p>

                        </div>



                        <div className="detail-section">

                            <h3><FaMapMarkerAlt className="box-order"/> Delivery Address</h3>

                            {selectedOrder.address ? (

                                <>
                                    <p>
                                        {selectedOrder.address.house}
                                    </p>

                                    <p>
                                        {selectedOrder.address.area}
                                    </p>

                                    <p>
                                        {selectedOrder.address.city}
                                    </p>

                                    <p>
                                        {selectedOrder.address.state}
                                    </p>

                                    <p>
                                        <b>Pincode:</b>
                                        {" "}
                                        {selectedOrder.address.pincode}
                                    </p>
                                </>

                            ) : (

                                <p>
                                    Address Not Available
                                </p>

                            )}

                        </div>


                
                        <div className="detail-section">

                            <h3><FaShoppingCart  className="box-order"/> Ordered Products</h3>


                            {selectedOrder.items &&
                            selectedOrder.items.length > 0 ? (

                                selectedOrder.items.map(
                                    (item, index) => (

                                        <div
                                            className="order-item"
                                            key={index}
                                        >

                                            {item.image && (

                                                <img
                                                    src={
                                                        item.image?.startsWith("/uploads/")
                                                            ? `https://veggiehub-1037.onrender.com${item.image}`
                                                            : item.image
                                                    }
                                                    alt={item.name}
                                                />

                                            )}


                                            <div>

                                                <h4>
                                                    {item.name}
                                                </h4>

                                                <p>
                                                    ₹ {item.price}
                                                </p>

                                                <p>
                                                    Quantity:
                                                    {" "}
                                                    {item.qty}
                                                </p>

                                            </div>

                                        </div>

                                    )
                                )

                            ) : (

                                <div className="order-item">

                                    <div>

                                        <h4>
                                            {selectedOrder.productName}
                                        </h4>

                                        <p>
                                            ₹ {selectedOrder.productPrice}
                                        </p>

                                        <p>
                                            Quantity:
                                            {" "}
                                            {selectedOrder.quantity}
                                        </p>

                                    </div>

                                </div>

                            )}

                        </div>


                    

                        <div className="detail-section">

                            <h3><FaCreditCard className="box-order"/> Payment Details</h3>

                            <p>

                                <b>Payment Method:</b>

                                {" "}

                                {selectedOrder.payment}

                            </p>


                            <p>

                                <b>Payment Status:</b>

                                {" "}

                                {selectedOrder.paymentStatus}

                            </p>


                            <h3>

                                Total:
                                {" "}
                                ₹{selectedOrder.total}

                            </h3>

                        </div>


                   

                        <div className="detail-section">

                            <h3><FaBox className="box-order"/> Current Order Status</h3>

                            <p className="current-order-status">

                                {selectedOrder.status}

                            </p>

                        </div>


                    </div>

                </div>

            )}

        </div>

    );

}

export default Orders;