import axios from "axios";
import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logoe from "./images/logos.png";
import bglogin from "./images/login.png";

function Login() {

    const [isRegister, setIsRegister] = useState(false);
    const [forgot,setforgot]=useState(false);
    const [forgotmail,setforgotmail]=useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();


    const handleSubmit = async () => {
if(!isRegister){
    if(!email.trim() || !password.trim()){
        toast.warning("Please enter email and passowrd");
        return;
    }
}


        if (isRegister) {

            if (!name.trim()) {
                toast.warning("Please enter your name");
                return;
            }


            if(!email.trim() || !phone.trim() || !password.trim()){
                toast.warning("Please fill all fields");
                return;
            }
        }


        try {

            const api = isRegister
                ? "https://veggiehub-1037.onrender.com/api/auth/register"
                : "https://veggiehub-1037.onrender.com/api/auth/login";


            const userData = isRegister
                ? {
                    name,
                    email,
                    phone,
                    password:password.trim()
                }
                : {
                   
                    email,
                    password:password.trim()
                };


            const res = await axios.post(api, userData);


            if (isRegister) {

                toast.success("Account Created Successfully");

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
            toast.success("Login Successfully");
            setTimeout(()=>{
                navigate("/dashboard");
            },1000);
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
      
      
 
    <div className="login-cont">

     
      <div className="login-left">
      <img src={bglogin}/>
        <div className="left-overlay">
          <h1>Welcome back to VeggieHub</h1>

          <p>
            Fresh groceries and organic produce,
            <br />
            delivered to your doorstep.
          </p>
        </div>
      </div>

     
      <div className="login-right">

        <div className="login-box">

          <div className="brand-name">
           <img src={logoe}></img>
          </div>

          <h1>
            {isRegister
              ? "Sign up for an account"
              : "Sign in to your account"}
          </h1>

          <p className="account-text">
            {isRegister
              ? "Already have an account? "
              : "Don't have an account? "}

            <span onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? "Sign in" : "Create one"}
            </span>
          </p>

        
          {isRegister && (
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

   
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

      
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

     
          {isRegister && (
            <div className="input-group">
              <label>Mobile Number</label>
              <input
                type="tel"
                placeholder=" ex- 1234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}

      
          {/* {!isRegister && (
            <p
              className="forgot-password"
              onClick={() => setforgot(true)}
            >
              Forgot Password?
            </p>
          )} */}

          <button
            className="auth-button"
            onClick={handleSubmit}
          >
            {isRegister ? "Sign Up" : "Sign In"}
          </button>

        

        
          {forgot && (
            <div className="forgot-overlay">
              <div className="forgot-box">

                <h3>Reset Password</h3>

                <button
                  className="close-forgott"
                  onClick={() => setforgot(false)}
                >
                  ✖
                </button>

                <input
                  type="email"
                  placeholder="Enter your mail"
                  value={forgotmail}
                  onChange={(e) => setforgotmail(e.target.value)}
                />

                <button
                  onClick={async () => {
                    try {
                      const res = await axios.post(
                        "https://veggiehub-1037.onrender.com/api/auth/forgot-password",
                        {
                          email: forgotmail
                        }
                      );

                      alert(res.data.message);

                      setforgotmail("");
                      setforgot(false);

                    } catch (err) {
                      alert(
                        err.response?.data?.message ||
                        "Something went wrong"
                      );
                    }
                  }}
                >
                  Send Reset Link
                </button>

              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  </>
);

  

}

export default Login;