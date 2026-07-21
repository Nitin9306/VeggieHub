
import { useState,useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./Users.css";

function Users(){
    const [user,setuser]=useState([]);
    useEffect (()=>{
        fetchUsers();
    },[]);

    const fetchUsers = async () =>{
        try{
            const res = await axios.get("http://localhost:5000/api/admin/users");
            setuser(res.data);
        } catch (err){
            console.log(err);
        }
    };
     const deleteuser  = async (id) =>{
        try{
            await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
            alert("User Deleted Successfully");
            fetchUsers();
        } catch (err){
            console.log(err);
            alert("Failed to delete User");


        }
     };
    return(
        <div className="adminer">
            <Sidebar/>
            <div className="admin-conteted">
                <h1>Manage users</h1>
                <table className="user-tabl">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Created</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {user.map((user)=>(
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button className="del-bbb" onClick={()=>deleteuser(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Users;