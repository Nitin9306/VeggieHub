import { useState } from "react";
import "./resetpassword.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";



function Resetpassword(){
  
    const {token}=useParams();
   const Navigate = useNavigate();
    const [passwords,setPasswords]=useState("");
    const [confirmpass,setconfirmpass]=useState("");

    const handleReset = async()=>{
        if(passwords !== confirmpass){
            toast.warning("Password not matched");
            return;
        }
        try{
            const res=await axios.post(
                `https://veggiehub-1037.onrender.com/api/auth/reset-password/${token}`,
                {
                    password:passwords
                }
            );
            if(res.data.success){
            toast.success("Password reset successfully! Please login");
            Navigate("/login");
          }
        }
        catch(err){
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
  <div className="reset-container">
    <div className="reset-card">
      <h2>Reset Password</h2>
      <p>Create a new secure password for your VeggieHub account.</p>

      <input
        type="password"
        placeholder="New Password"
        value={passwords}
        onChange={(e) => setPasswords(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmpass}
        onChange={(e) => setconfirmpass(e.target.value)}
      />

      <button className="reset-btn" onClick={handleReset}>
        Reset Password
      </button>
    </div>
  </div>
);
}
export default Resetpassword;