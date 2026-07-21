import "./sidebar.css";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaTicketAlt,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2 className="logo">🥬 VeggieHub</h2>

      <Link to="/admin">
        <FaTachometerAlt /> Dashboard
      </Link>

      <Link to="/admin/products">
        <FaBoxOpen /> Products
      </Link>

      <Link to="/admin/orders">
        <FaShoppingCart /> Orders
      </Link>

      <Link to="/admin/users">
        <FaUsers /> Users
      </Link>

      <Link to="/admin/coupons">
        <FaTicketAlt /> Coupons
      </Link>

      <Link to="/">
        <FaSignOutAlt /> Logout
      </Link>

    </div>
  );
}

export default Sidebar;