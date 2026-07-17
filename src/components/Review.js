import { useState,useEffect } from "react";
import {FaStar} from "react-icons/fa";
import "./review.css";
import axios from "axios";
import { toast } from "react-toastify";
function Review({productId}){
    const [Comment,setComment]=useState("");
    const [rating,setrating]=useState(5);
    const [reviews,setreviews]=useState([]);

    useEffect(()=>{
        axios.get(`https://veggiehub-1037.onrender.com/api/reviews/${productId}`)
        .then(res =>{
           
            setreviews(res.data);
        });
    },[productId]);

    const addreview = ()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        if(!user){
            toast.info("Please Login to submit your review.");
            return;
        }
        
        axios.post("https://veggiehub-1037.onrender.com/api/reviews",{
            productId,
            userId:user._id,
            userName:user.name,
            rating,
            Comment:Comment
        })
        .then((res)=>{
           toast.success("Review Added");
            setComment("");
            setrating(5);
            setreviews((prev)=>[...prev,res.data.review]);
        })
        .catch((err)=>{
            console.log(err.response?.data);

        })
    };     
    
    return(
        <>
        <div className="review-secson">
            <h2>Customer Reviews</h2>
            <div className="review-form">
            <div className="rating-input">
                {[1,2,3,4,5].map((star)=>(
                    <FaStar key={star}
                    onClick={()=>setrating(star)}
                    className={star <= rating ? "star active-star":"star"}/>
                ))}
            </div>
            <textarea placeholder="Write your reviews" value={Comment} onChange={(e)=>setComment(e.target.value)}/>
                <button onClick={addreview}>Submit Review</button>
                </div>

                {reviews.map((item)=>(
                    <div className="review-card" key={item._id}>
                        <div className="review-top">
                        <div className="review-user">
                        <div className="review-avatar">{item.userName.charAt(0).toUpperCase()}</div>

                        <div>
                            <div className="review-name"><h4>{item.userName}</h4>
                            </div>
                            <div className="review-rating">
                                
                                {[1,2,3,4,5].map((star)=>(
                                    <FaStar key={star} className={star <= Number(item.rating) ?"star active-star":"star"}/>
                                ))}
                            </div>
                            </div>
                            </div>
                            </div>
                        
                        
                        <p className="review-com">{item.Comment}</p>
                        <div className="review-date">{new Date(item.createdAt).toLocaleDateString()}

                        </div>
                        </div>
                ))}
        </div>
        </>
    )

}
export default Review;