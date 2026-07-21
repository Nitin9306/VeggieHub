import "./admindashboard.css";
import Sidebar from "./Sidebar";
import { useState,useEffect } from "react";
import axios from "axios";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaRupeeSign,
} from "react-icons/fa";

function AdminDashboard() {
  const [recent,setrecent]=useState([]);
  const [stats,setstats]=useState({
    totalUser:0,
    totalProducts:0,
    totalOrders:0,
    totalRevenue:0,
  });
  useEffect (()=>{
    fetchStats();
    fetchrecent();
  },[]);
  const fetchStats = async() =>{
    try{
      const res = await axios.get("http:localhost:5000/api/admin/stats");
      setstats(res.data);
    } catch (err){
      console.log(err);
    }
  };

  const fetchrecent = async () =>{
    try{
      const res = await axios.get("http://localhost:5000/api/admin/recent-orders");
      setrecent(res.data);
    } catch(err){
    console.log(err);
  }
  };
  return (
    <div className="admin">

      <Sidebar />

      <div className="admin-content">

        <h1>Admin Dashboard</h1>

        <div className="cardsd">

          <div className="cardy">
            <FaShoppingCart className="icon"/>
            <h2>{stats.totalOrders}</h2>
            <p>Total Orders</p>
          </div>

          <div className="cardy">
            <FaBoxOpen className="icon"/>
            <h2>{stats.totalProducts}</h2>
            <p>Total Products</p>
          </div>

          <div className="cardy">
            <FaUsers className="icon"/>
            <h2>{stats.totalUser}</h2>
            <p>Total Users</p>
          </div>

          <div className="cardy">
            <FaRupeeSign className="icon"/>
            <h2>₹ {stats.totalRevenue}</h2>
            <p>Total Sales</p>
          </div>

        </div>

        <h2 className="recent-title">Recent Orders</h2>
        <table className="recent-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {recent.map((order)=>(
              <tr key={order._id}>
                <td>{order.name}</td>
                <td>{order.productName}</td>
                <td>{order.total}</td>
                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default AdminDashboard;