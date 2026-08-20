import { useState, useEffect } from "react";
import logo from "../images/SHOP.CO.svg";
import {
  FaSearch,
  FaRegUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [userName, setUserName] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  /* ===== CART COUNT ===== */

  useEffect(() => {
    const updateCartCount = () => {
      const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

      setCartCount(cart.length);
    };

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener(
        "cartUpdated",
        updateCartCount
      );
    };
  }, []);

  /* ===== LOGIN USER CHECK ===== */

  useEffect(() => {
    const checkAuth = () => {
      setUserName(localStorage.getItem("userName"));
    };

    checkAuth();

    window.addEventListener("authChanged", checkAuth);

    return () => {
      window.removeEventListener("authChanged", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    window.dispatchEvent(new Event("authChanged"));
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* MENU BUTTON */}

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* LOGO */}

        <img
          src={logo}
          alt="SHOP.CO"
          className="navbar-logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />

        {/* NAV LINKS */}

        <div
          className={`navbar-links ${
            menuOpen ? "open" : ""
          }`}
        >
          <div>Shop</div>
          <div>On sale</div>
          <div>New arrivals</div>
          <div>Brands</div>
        </div>

        {/* RIGHT SIDE */}

        <div className="navbar-right">

          {/* SEARCH */}

          <div className="search-wrapper">
            <FaSearch className="search-icon" />

            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
          </div>

          {/* CART */}

          <div
            className="cart-icon-wrapper"
            onClick={() => navigate("/cart")}
          >
            <LuShoppingCart />

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}
          </div>

          {/* USER */}

          {userName ? (
            <div style={{ position: "relative" }}>
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "#000",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                {userName.charAt(0).toUpperCase()}
              </div>

              {showDropdown && (
                <div style={{
                  position: "absolute",
                  top: "42px",
                  right: 0,
                  background: "#fff",
                  border: "1px solid #eee",
                  borderRadius: "10px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  width: "160px",
                  overflow: "hidden",
                  zIndex: 100,
                }}>
                  <div
                    onClick={() => { setShowDropdown(false); navigate("/dashboard"); }}
                    style={{ padding: "12px 16px", cursor: "pointer", fontSize: "0.9rem" }}
                  >
                    Dashboard
                  </div>
                  <div
                    onClick={handleLogout}
                    style={{ padding: "12px 16px", cursor: "pointer", fontSize: "0.9rem", color: "#e11", borderTop: "1px solid #f0f0f0" }}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <FaRegUserCircle
              onClick={() => navigate("/login")}
              style={{ cursor: "pointer" }}
            />
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;