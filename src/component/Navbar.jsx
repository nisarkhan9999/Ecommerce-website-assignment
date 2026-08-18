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

  const navigate = useNavigate();

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

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <img
          src={logo}
          alt=""
          className="navbar-logo"
        />

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

        <div className="navbar-right">

          <div className="search-wrapper">
            <FaSearch className="search-icon" />

            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
          </div>

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

          <FaRegUserCircle />

        </div>

      </div>
    </nav>
  );
};

export default Navbar;