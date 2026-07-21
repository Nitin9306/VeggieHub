import React, {useEffect,useState} from "react";
import axios from "axios";
import "./Orders.css";
function Orders(){
    const [orders,setorders]=useState([]);

    useEffect (()=>{
        fetchOrders();
    }, []);
    const fetchOrders = async () => {
        try{
            const res = await axios.get("http://localhost:5000/api/orders");
            setorders(res.data.orders);
        } catch(err){
            console.log(err);
        }
    };

    const updatestatus =  async (id, status) =>{
        try{
            await axios.put(`http://localhost:5000/api/orders/${id}`, {status});
            fetchOrders();
        } catch(err){
            console.log(err);
            alert("Status update Failed");
        }
    };
    return(
        <div className="admin-orderss"><h1>Manage Orders</h1>
        <table>
            <thead>
                <tr>
                    <th>Customer</th>
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
                        <td>{order.productName}</td>
                        <td>₹ {order.total}</td>
                        <td>{order.payment}</td>
                        <td><span className={`status ${order.status.replace(/\s+/g,"-").toLowerCase()}`}>{order.status}</span></td>
                        <td>
                            <select value={order.status} onChange={(e)=> updatestatus(order._id, e.target.value)}>
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        
        </div>
    )

    
}
export default Orders;