import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);

  const buttonRef = useRef(null);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  const API_URL =
    "https://e-commerce-backend-five-henna.vercel.app/products";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  const visibleProducts = products.slice(0, visibleCount);

  const handleToggle = () => {
    if (visibleCount === 4) {
      setVisibleCount(8);

      setTimeout(() => {
        buttonRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    } else {
      setVisibleCount(4);

      setTimeout(() => {
        sectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="main" ref={sectionRef}>
      <h1 className="heading">New Arrivals</h1>

      <div className="products">
        {visibleProducts.map((product) => (
          <div
            className="product-card"
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>

            <h3>{product.name}</h3>

            <p className="rating">
              ⭐ {product.rating || 0}/5
            </p>

            <p className="price">${product.price}</p>
          </div>
        ))}
      </div>

      {products.length > 4 && (
        <button
          className="view-all-btn"
          ref={buttonRef}
          onClick={handleToggle}
        >
          {visibleCount === 4 ? "View All" : "Show Less"}
        </button>
      )}
    </div>
  );
};

export default ProductCard;