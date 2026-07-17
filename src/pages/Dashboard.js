import "./dashboard.css";
import { FaUser, FaShoppingBag, FaHeart,FaSignOutAlt,FaTimes, FaArrowLeft, FaMapMarkerAlt, FaLock, FaEdit,FaPhone,FaBox,FaTruck,FaShippingFast,FaCheckCircle } from "react-icons/fa";
import { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


function Dashboard(){

    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    const [order,setorder]=useState([]);
    const [activetab,setactivetab]=useState("profile");
    const [wishlist,setwishlist]=useState([]);
    const [showEdit,setShowEdit] = useState(false);
    const [showprofile,setshowprofile]=useState(false);
    const [name,setName] = useState(user?.name || "");
    const [email,setEmail] = useState(user?.email || "");
    const [phone,setPhone] = useState(user?.phone || "");
    const navigate =useNavigate();

       useEffect(()=>{
        const fetchOrders = async()=>{
            try{
                const res = await axios.get(
                    `https://veggiehub-1037.onrender.com/api/orders/${user._id}`
                );
                setorder(res.data);
                console.log(res.data);
            } catch(err){
                console.log(err);
            }
        };
        if(user){
            fetchOrders();
            fetchWishlist();
        }
    },[]);

    const fetchWishlist = async () =>{
        try{
            const res = await axios.get(`https://veggiehub-1037.onrender.com/api/wishlist/${user._id}`);
            setwishlist(res.data);
        }
        catch (err){
            console.log(err);
        }
    };

    const removewish  = async (id)=>{
        try{
            await axios.delete(`https://veggiehub-1037.onrender.com/api/Wishlist/${id}`);
            setwishlist(wishlist.filter((item)=>
                item._id !== id)
            );
            
        } catch(err){
            console.log(err);
        }
    };
    const addtocart  = async(item) =>{
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const exist =cart.find((p) => p.id === item.productId);
        if(exist){
            exist.qty +=1;
        } else{
            cart.push({
                id:item.productId,
                name:item.name,
                price:item.price,
                image:item.image,
                category:item.category,
                qty:1,
            });
        }
        localStorage.setItem("cart",JSON.stringify(cart));
        await removewish(item._id);
       toast.success("Product Added to Cart");
        navigate("/cart");
    }

    if(!user){
        return <h2>Please Login Again</h2>;
    }

    

    const updateProfile = ()=>{

        const updatedUser = {
            ...user,
            name,
            email,
            phone
        };

        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );

        setShowEdit(false);

        window.location.reload();

    };


    return(

    <div className="dashboard">

         <div className="mobile-view" onClick={()=>setshowprofile(!showprofile)}><FaUser/></div>
         <div className="dashboard-mobile-header">

    <div className="profile-img">
        <FaUser />
    </div>

    <h2>{user.name}</h2>

    <p>{user.email}</p>
    <p><FaPhone/> {user.phone}</p>
    <button 
            className="mobile-edit"
            onClick={()=>setShowEdit(true)}
            >

            <FaEdit/> Edit Profile

            </button>
            <div 
                className="mobile-logout"
               
                onClick={()=>{
                    localStorage.removeItem("user");
                    window.location.href="/login";
                }}
             > <FaSignOutAlt className="outeoute"/>

                Logout

                </div>

</div>
        <div className={`profile-card ${showprofile ? "show-profile" : ""}`}>
            
            <div className="profile-close" onClick={()=>setshowprofile(false)}><FaTimes/></div>


            <div className="profile-img">
                <FaUser/>
            </div>


            <h2>{user.name}</h2>

            <p>{user.email}</p>

            <p><FaPhone/> {user.phone}</p>
            


            <button 
            className="edit-btn"
            onClick={()=>setShowEdit(true)}
            >

            <FaEdit/> Edit Profile

            </button>

            <div 
                className="logout-b"
               
                onClick={()=>{
                    localStorage.removeItem("user");
                    window.location.href="/login";
                }}
             > <FaSignOutAlt className="outeoute"/>

                Logout

                </div>


        </div>



        <div className="dashboard-content">
          
            {activetab === "profile" && (
            <div className="menu-grid">
                <div className="menu-card" onClick={() =>setactivetab("orders")}>
                    <FaShoppingBag/>
                    <h3>My Orders</h3>
                    <p>Track your orders</p>
                </div>



                <div className="menu-card" onClick={()=>setactivetab("wishlist")}>
                    <FaHeart/>
                    <h3>Wishlist</h3>
                    <p>Your favourite products</p>
                </div>



                <div className="menu-card" onClick={()=>setactivetab("address")}>
                    <FaMapMarkerAlt/>
                    <h3>Address</h3>
                    <p>Manage address</p>
                </div>



                <div className="menu-card" onClick={()=>setactivetab("password")}>
                    <FaLock/>
                    <h3>Password</h3>
                    <p>Change password</p>
                </div>
                </div>
                )}

                {activetab === "orders" && (
                    <div className="orders-sec">
                        <div className="order-header">

    <button
        className="back-btn"
        onClick={()=>setactivetab("profile")}
    >
        <FaArrowLeft/>
        Back
    </button>

    <h2>My Orders</h2>

</div>
                        {order.length ===0 ? (
                            <p>No Orders Found</p>
                        ) : (
                            <div className="order-grid">
                            {
                            order.map((item)=> (
                                <div className="order-car" key={item._id}>
                                    <div className="order-top">

    <img
        src={item.image}
        alt={item.productName}
        className="order-img"
    />

    <div className="orderf-details">

        <h3>{item.productName}</h3>

        <p><strong>Quantity:</strong> {item.quantity}</p>

        <p><strong>Total:</strong> ₹{item.total}</p>

        <p><strong>Payment:</strong> {item.payment}</p>

        <p>
            <strong>Status:</strong>
            <span className="statued">
                {item.status}
            </span>
        </p>

    </div>

</div>
                                     <div className="track-order">

  <div className={`track-step ${
    ["Pending","Shipped","Out for Delivery","Delivered"].includes(item.status)
      ? "active" : ""
  }`}>
    <div className="circle">
      <FaBox />
    </div>
    <span>Confirmed</span>
  </div>

  <div className={`track-step ${
    ["Shipped","Out for Delivery","Delivered"].includes(item.status)
      ? "active" : ""
  }`}>
    <div className="circle">
      <FaTruck />
    </div>
    <span>Shipped</span>
  </div>

  <div className={`track-step ${
    ["Out for Delivery","Delivered"].includes(item.status)
      ? "active" : ""
  }`}>
    <div className="circle">
      <FaShippingFast />
    </div>
    <span>Out for Delivery</span>
  </div>

  <div className={`track-step ${
    item.status === "Delivered"
      ? "active" : ""
  }`}>
    <div className="circle">
      <FaCheckCircle />
    </div>
    <span>Delivered</span>
  </div>

   </div>
 </div>
 ))
}
  
  </div>
  )}
  
</div>
 )}

 {activetab ==="wishlist" && (

    <div className="wishlist-sec">
        <button className="back-btn wish" onClick={()=>setactivetab("profile")}><FaArrowLeft/>Back</button>
        <h2 className="ore">My Wishlist</h2>
        <p>Your wishlist products will appear here.</p>
        {wishlist.length ===0 ? (
            <p>No Wishlist Products</p>

        ) : (

            <div className="wish-grid">
            
                {wishlist.map((item)=>(
                    <div className="wishlist-care" key={item.id}>
                        <img src={item.image} alt={item.name} className="wishl-img"/>
                        <h3>{item.name}</h3>
                        <p>₹{item.price}</p>
                        <div className="wish-bten">
                            <button className="wish-bt" onClick={()=>addtocart(item)}>Add to Cart</button>
                            <button className="remove-bt" onClick={()=>removewish(item._id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
        )}
        
    </div>
 )}

 {activetab === "address" && (
    <div className="address-sec">
        <button className="back-btn wish" onClick={()=>setactivetab("profile")}><FaArrowLeft/>Back to Profile</button>
        <h2 className="ore">My Address</h2>
        <div className="address-crd">
            <h3>{user.name}</h3>
            <p><FaPhone/> {user.phone}</p>
            <p>Your Saved address will appear here</p>
            <button className="edit-btn"><FaEdit/> Edit Address</button>
        </div>
    </div>
 )}

 {activetab === "password" && (
    <div className="password-sec">
        <button className="back-btn wish" onClick={()=>setactivetab("profile")}><FaArrowLeft/> back to profile</button>
        <h2 className="ore">Change Password</h2>
        <div className="password-crd">
            <input type="password" placeholder="Current password"/>
            <input type="password" placeholder="New Password"/>
            <input type="password" placeholder="Confirm Password"/>
            <button className="edit-btn">Update password</button>
        </div>
    </div>
 )}
 </div>




        {
        showEdit &&

        <div className="edit-overlay">

            <div className="edit-box">

                <h2>Edit Profile</h2>


                <input
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="Name"
                />


                <input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Email"
                />


                <input
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                placeholder="Phone"
                />


                <button onClick={updateProfile}>
                    Save Changes
                </button>


                <button 
                className="cancel"
                onClick={()=>setShowEdit(false)}
                >
                    Cancel
                </button>


            </div>

        </div>

        }


    </div>

    );

}

export default Dashboard;