import "./dashboard.css";
import { FaUser } from "react-icons/fa";
function Dashboard ()
{
    const user =JSON.parse(
        localStorage.getItem("user")
    );

    return(
             <>
             <div className="dashboard">
                <div className="profile">
                    <div className="profile-img">
                        <FaUser className="user-ic"/>
                    </div>
                    <h2>Welcome {user ?.name}</h2>
                    <p>{user ?.email}</p>
                    <h3>{user ?.phone}</h3>

                </div>
                <div className="dashboard-menu">
                    <div className="menu-card">
                        My order

                    </div>
                    <div className="menu-card">
                        wishlist
                    </div>
                    <div className="menu-card logout" onClick={()=> {
                        localStorage.removeItem("user");
                        window.location.href="/";
                    }}> Logout

                    </div>

                </div>

             </div>
             </>
    )
}
export default Dashboard;