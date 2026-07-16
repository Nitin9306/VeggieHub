import axios from "axios";
import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const [isRegister, setIsRegister] = useState(false);
    const [forgot,setforgot]=useState(false);
    const [forgotmail,setforgotmail]=useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showwel,setshowwel]=useState(false);

    const navigate = useNavigate();


    const handleSubmit = async () => {

        if (!email || !phone || !password) {
            alert("Please fill all fields");
            return;
        }


        if (isRegister) {

            if (!name) {
                alert("Please enter your name");
                return;
            }


            if (password !== confirmPassword) {
                alert("Password not matched");
                return;
            }
        }


        try {

            const api = isRegister
                ? "http://localhost:5000/api/auth/register"
                : "http://localhost:5000/api/auth/login";


            const userData = isRegister
                ? {
                    name,
                    email,
                    phone,
                    password:password.trim()
                }
                : {
                    name,
                    email,
                    phone,
                    password:password.trim()
                };


            const res = await axios.post(api, userData);


            if (isRegister) {

                alert("Account Created Successfully");

                setIsRegister(false);

                setName("");
                setEmail("");
                setPhone("");
                setPassword("");
                setConfirmPassword("");

            } 
           else{
            localStorage.setItem("user",JSON.stringify(res.data.user));
            window.dispatchEvent(new Event("userLogin"));
            setshowwel(true);
            setTimeout(()=>{
                navigate("/dashboard");
            },2500);
           }


        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    };


    return (

  <>
        {
            showwel && 
            <div className="welcome-overld">
                <div className="welcome-boxer">
                    <div className="success-cir">
                        <div className="success-checker">✔</div>
                    </div>
                    <h2>Login Successful!</h2>
                    <p>Welcome back to <span>veggieHub</span></p>
                    <div className="loading-bar">
                        <div className="loading-fill"></div>
                    </div>
                    <small>Redirecting to your dashboard...</small>
                </div>
            </div>

        }
        <div className="login-cont">

            <div className="login-box">

                <h1>
                    {
                    isRegister
                    ? "Create Account"
                    : "Welcome Back"
                    }
                </h1>


                <p>
                    {
                    isRegister
                    ? "Create your VeggieHub account"
                    : "Login to continue shopping"
                    }
                </p>


                {
                isRegister &&

                <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />

                }


                <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />


                <input
                type="tel"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                />


                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />


                {
                isRegister &&

                <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                />

                }


                {
                !isRegister &&
                <p className="forgot-password" onClick={()=> setforgot(true)}>
                    Forgot Password?
                </p>
                }


                <button onClick={handleSubmit}>
                    {
                    isRegister
                    ? "Register"
                    : "Login"
                    }
                </button>


                <p
                className="switch-account"
                onClick={()=>setIsRegister(!isRegister)}
                >

                {
                isRegister
                ? "Already have an account? Login"
                : "New to VeggieHub? Create Account"
                }

                </p>

                {forgot && 
                <div className="forgot-overlay">
                 <div className="forgot-box">
                    <h3>Reset Password</h3>
                    <button className="close-forgott" onClick={()=>setforgot(false)}>✖</button>
                    <input type="email" placeholder="Enter your mail"
                    value={forgotmail}
                    onChange={(e)=>setforgotmail(e.target.value)}/>
                    <button onClick={async()=>{
                        console.log("forgot button clicked");
                        console.log("sending email:",forgotmail);
                        try{
                            console.log("before api call");
                            const res =await axios.post(
                                "http://localhost:5000/api/auth/forgot-password",{
                                    email:forgotmail
                                }
                            );
                            console.log("API RESPONSE:",res.data);
                            alert(res.data.message);
                            setforgotmail("");
                            setforgot(false);
                        }
                      catch(err){
                        console.log("forgot error:",err);
                        console.log("error response:",err.response?.data);
                        alert(err.response?.data?.message || "somthing went wrong");
                      }
                    }}>Send Reset Link</button>
                 </div>
                 </div>
                }


            </div>

        </div>
        </>

    );

}

export default Login;