import { useState,useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./Coupons.css";
function Coupons(){
    const [coupon,setcoupon]=useState([]);
    const [newcop,setnewcop]=useState({
        code:"",
        discount:"",
        expiry:"",
        active:true,
    });
    useEffect (()=>{
        fetchcoupons();
    },[]);
    const fetchcoupons = async () =>{
        try{
            const res =  await axios.get("http://localhost:5000/api/coupons");
            console.log(res.data);
            setcoupon(res.data.coupons);
        } catch (err){
            console.log(err);
        }
    };

    const addCoupon = async () =>{
        try{
            await axios.post("http://localhost:5000/api/coupons", newcop);
            alert("Coupon Added Successsfully");
            setnewcop({
                code:"",
                discount:"",
                expiry:"",
                active:true,
            });
            fetchcoupons();
        } catch (err){
            console.log(err);
            alert("Failed to add Coupon");
        }
    };

        const deletecoupon = async  (id) =>{
            try{
                await axios.delete(`http://localhost:5000/api/coupons/${id}`);
                alert("Coupon Deleted Successfully");
                fetchcoupons();

            } catch(err){
                console.log(err);
                alert("Failed to delete Coupon");
            }
        };
    return(
        <div className="admin-coupons">
            <Sidebar/>
            <div className="coupon-content">
                <h1>Manage Coupons</h1>
                <div className="coupon-form">
                    <input type="text" placeholder="Coupon Code" value={newcop.code}
                    onChange={(e)=>setnewcop({...newcop,code:e.target.value})}/>

                    <input type="number" placeholder="Dsicount %" value={newcop.discount}
                    onChange={(e)=>setnewcop({...newcop,discount:e.target.value})}/>

                    <input type="date" value={newcop.expiry} onChange={(e)=>setnewcop
                        ({...newcop,expiry:e.target.value})}/>

                    <button onClick={addCoupon}>Add Coupon</button>
                </div>

                <table className="coupon-table">
                    <thead>
                    <tr>
                        <th>Code</th>
                        <th>Discount</th>
                        <th>Expiry</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                        {coupon.map ((item) =>(
                            <tr key={item._id}>
                                <td>{item.code}</td>
                                <td>{item.discount}%</td>
                                <td>
                                    {new Date(item.expiry).toLocaleDateString()}
                                </td>
                                <td>{item.active ? "Active" : "Inactive"}</td>
                                <td>
                                    <button className="dell-be" onClick={()=>deletecoupon(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Coupons;