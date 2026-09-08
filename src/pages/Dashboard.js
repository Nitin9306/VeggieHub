// import "./dashboard.css";
// import { FaUser, FaShoppingBag, FaHeart,FaSignOutAlt,FaTimes, FaArrowLeft, FaMapMarkerAlt, FaLock, FaEdit,FaPhone,FaBox,FaTruck,FaShippingFast,FaCheckCircle } from "react-icons/fa";
// import { useState,useEffect} from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";


// function Dashboard(){

//     const userData = localStorage.getItem("user");
//     const user = userData ? JSON.parse(userData) : null;

//     const [activetab,setactivetab]=useState("profile");
//     const [wishlist,setwishlist]=useState([]);
//     const [showEdit,setShowEdit] = useState(false);
//     const [showprofile,setshowprofile]=useState(false);
//     const [showbill,setshowbill]= useState(false);
//     const [seleted,setselected]=useState(null);
//     const [name,setName] = useState(user?.name || "");
//     const [email,setEmail] = useState(user?.email || "");
//     const [phone,setPhone] = useState(user?.phone || "");
//     const navigate =useNavigate();



//     const fetchWishlist = async () =>{
//         try{
//             const res = await axios.get(`http://localhost:5000/api/wishlist/${user._id}`);
//             setwishlist(res.data);
//         }
//         catch (err){
//             console.log(err);
//         }
//     };

//     const removewish  = async (id)=>{
//         try{
//             await axios.delete(`http://localhost:5000/api/Wishlist/${id}`);
//             setwishlist(wishlist.filter((item)=>
//                 item._id !== id)
//             );
            
//         } catch(err){
//             console.log(err);
//         }
//     };
//     const addtocart  = async(item) =>{
//         let cart = JSON.parse(localStorage.getItem("cart")) || [];
//         const exist =cart.find((p) => p.id === item.productId);
//         if(exist){
//             exist.qty +=1;
//         } else{
//             cart.push({
//                 id:item.productId,
//                 name:item.name,
//                 price:item.price,
//                 image:item.image,
//                 category:item.category,
//                 qty:1,
//             });
//         }
//         localStorage.setItem("cart",JSON.stringify(cart));
//         await removewish(item._id);
//        toast.success("Product Added to Cart");
//         navigate("/cart");
//     }

//     if(!user){
//         return <h2>Please Login Again</h2>;
//     }

    

//     const updateProfile = ()=>{

//         const updatedUser = {
//             ...user,
//             name,
//             email,
//             phone
//         };

//         localStorage.setItem(
//             "user",
//             JSON.stringify(updatedUser)
//         );

//         setShowEdit(false);

//         window.location.reload();

//     };


//     return(

//     <div className="dashboard">

//          <div className="mobile-view" onClick={()=>setshowprofile(!showprofile)}><FaUser/></div>
//          <div className="dashboard-mobile-header">

//     <div className="profile-img">
//         <FaUser />
//     </div>

//     <h2>{user.name}</h2>

//     <p>{user.email}</p>
//     <p><FaPhone/> {user.phone}</p>
//     <button 
//             className="mobile-edit"
//             onClick={()=>setShowEdit(true)}
//             >

//             <FaEdit/> Edit Profile

//             </button>
//             <div 
//                 className="mobile-logout"
               
//                 onClick={()=>{
//                     localStorage.removeItem("user");
//                     window.location.href="/login";
//                 }}
//              > <FaSignOutAlt className="outeoute"/>

//                 Logout

//                 </div>

// </div>
       



//         <div className="dashboard-content">



//                 <div className="menu-card" onClick={()=>setactivetab("wishlist")}>
//                     <FaHeart/>
//                     <h3>Wishlist</h3>
//                     <p>Your favourite products</p>
//                 </div>



//                 <div className="menu-card" onClick={()=>setactivetab("address")}>
//                     <FaMapMarkerAlt/>
//                     <h3>Address</h3>
//                     <p>Manage address</p>
//                 </div>



//                 <div className="menu-card" onClick={()=>setactivetab("password")}>
//                     <FaLock/>
//                     <h3>Password</h3>
//                     <p>Change password</p>
//                 </div>
//                 </div>
               


//  {activetab ==="wishlist" && (

//     <div className="wishlist-sec">
//         <button className="back-btn wish" onClick={()=>setactivetab("profile")}><FaArrowLeft/>Back</button>
//         <h2 className="ore">My Wishlist</h2>
//         <p className="nip">Your wishlist products will appear here.</p>
//         {wishlist.length ===0 ? (
//             <p className="pro-wish">No Wishlist Products</p>

//         ) : (

//             <div className="wish-grid">
            
//                 {wishlist.map((item)=>(
//                     <div className="wishlist-care" key={item.id}>
//                         <img src={item.image} alt={item.name} className="wishl-img"/>
//                         <h3>{item.name}</h3>
//                         <p>₹{item.price}</p>
//                         <div className="wish-bten">
//                             <button className="wish-bt" onClick={()=>addtocart(item)}>Add to Cart</button>
//                             <button className="remove-bt" onClick={()=>removewish(item._id)}>Remove</button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         )}
        
//     </div>
//  )}

//  {activetab === "address" && (
//     <div className="address-sec">
//         <button className="back-btn wish" onClick={()=>setactivetab("profile")}><FaArrowLeft/>Back to Profile</button>
//         <h2 className="ore">My Address</h2>
//         <div className="address-crd">
//             <h3>{user.name}</h3>
//             <p><FaPhone/> {user.phone}</p>
//             <p>Your Saved address will appear here</p>
//             <button className="edit-btn"><FaEdit/> Edit Address</button>
//         </div>
//     </div>
//  )}

//  {activetab === "password" && (
//     <div className="password-sec">
//         <button className="back-btn wish" onClick={()=>setactivetab("profile")}><FaArrowLeft/> back to profile</button>
//         <h2 className="ore">Change Password</h2>
//         <div className="password-crd">
//             <input type="password" placeholder="Current password"/>
//             <input type="password" placeholder="New Password"/>
//             <input type="password" placeholder="Confirm Password"/>
//             <button className="edit-btn">Update password</button>
//         </div>
//     </div>
//  )}
//  </div>


//     );

// }

// export default Dashboard;