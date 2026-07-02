import { Link } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login()
{
    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [phone ,setphone]=useState("");
    
    const navigate = useNavigate();

    const handlelogin =()=> {
        if(!name || !email || !phone){
            alert("Please fill all *Fields");
             return;
        }
        localStorage.setItem(
            "user",
            JSON.stringify({
                name,email,phone
            })
        );
        navigate("/dashboard");
        // window.location.reload();
       
    }
    return(
        <>
     <div className="login-cont">
        <div className="login-box">
            <h1>Welcome Back</h1>
            <p>Login to continue shopping</p>
            <input type="text" placeholder="Full Name*" value={name}
            onChange={(e)=>setname(e.target.value)} />

            <input type="email" placeholder="Email address*" value={email}
            onChange={(e)=>setemail(e.target.value)}/>

            <input type="tel" placeholder="Mobile number*" value={phone}
            onChange={(e)=>setphone(e.target.value)}/>
            <button onClick={handlelogin}>Login</button>


        </div>
        </div>

        </>
    );
}
export default Login;