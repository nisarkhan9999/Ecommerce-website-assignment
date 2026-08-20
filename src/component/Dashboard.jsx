import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (!name) {
      navigate("/login");
      return;
    }
    setUserName(name);

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setOrders(cart);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    window.dispatchEvent(new Event("authChanged"));
    navigate("/");
  };

  return (
    <div className="dash-wrapper">
      <div className="dash-sidebar">
        <div className="dash-avatar">{userName.charAt(0).toUpperCase()}</div>
        <h3>{userName}</h3>
        <ul className="dash-menu">
          <li className="active">Overview</li>
          <li onClick={() => navigate("/cart")}>My Cart</li>
          <li>My Orders</li>
          <li>Account Settings</li>
          <li onClick={handleLogout} className="dash-logout-link">Logout</li>
        </ul>
      </div>

      <div className="dash-main">
        <h2>Welcome back, {userName} 👋</h2>
        <p className="dash-subtitle">Here's what's happening with your account.</p>

        <div className="dash-stats">
          <div className="dash-stat-card">
            <p className="dash-stat-num">{orders.length}</p>
            <p className="dash-stat-label">Items in Cart</p>
          </div>
          <div className="dash-stat-card">
            <p className="dash-stat-num">0</p>
            <p className="dash-stat-label">Total Orders</p>
          </div>
          <div className="dash-stat-card">
            <p className="dash-stat-num">Active</p>
            <p className="dash-stat-label">Account Status</p>
          </div>
        </div>

        <div className="dash-section">
          <h3>Recent Cart Items</h3>
          {orders.length === 0 ? (
            <p className="dash-empty">Your cart is empty.</p>
          ) : (
            <div className="dash-order-list">
              {orders.map((item, i) => (
                <div key={i} className="dash-order-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p className="dash-order-name">{item.name}</p>
                    <p className="dash-order-meta">Size: {item.size} | Qty: {item.qty}</p>
                  </div>
                  <p className="dash-order-price">${item.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;