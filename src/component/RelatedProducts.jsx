import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const RelatedProducts = () => {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const buttonRef = useRef(null);
  const sectionRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://e-commerce-backend-five-henna.vercel.app/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  // Pehle 4, Show All par baaki sab
  const visibleProducts = showAll
    ? products
    : products.slice(0, 4);

  const handleToggle = () => {
    if (!showAll) {
      setShowAll(true);

      setTimeout(() => {
        buttonRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    } else {
      setShowAll(false);

      setTimeout(() => {
        sectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  return (
    <div className="main" ref={sectionRef}>
      <h1 className="heading">You Might Also Like</h1>

      <div className="products">
        {visibleProducts.map((product) => (
          <div
            className="product-card"
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <div className="product-image">
              <img
                src={product.image}
                alt={product.name}
              />
            </div>

            <h3>{product.name}</h3>

            <p className="rating">
              ⭐ {product.rating || 0}/5
            </p>

            <p className="price">
              ${product.price}
            </p>
          </div>
        ))}
      </div>

      {/* 4 se zyada products hon tab button */}
      {products.length > 4 && (
        <button
          className="view-all-btn"
          ref={buttonRef}
          onClick={handleToggle}
        >
          {showAll ? "Show Less" : "Show All"}
        </button>
      )}
    </div>
  );
};

export default RelatedProducts;