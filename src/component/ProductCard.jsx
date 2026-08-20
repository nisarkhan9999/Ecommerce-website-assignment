import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"
import "./ProductCard.css";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const buttonRef = useRef(null);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

 useEffect(() => {
  fetch("https://e-commerce-backend-five-henna.vercel.app/products")
    .then((res) => {
      console.log("Status:", res.status);

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }

      return res.json();
    })
    .then((data) => {
      console.log("Products:", data);
      setProducts(data);
    })
    .catch((err) => {
      console.log("Fetch Error:", err);
    });
}, []);

const visibleProducts = showAll ? products.slice(0, 8) : products.slice(0, 4);

  const handleToggle = () => {
    const wasShowingAll = showAll;
    setShowAll(!showAll);

    setTimeout(() => {
      if (wasShowingAll) {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        buttonRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 100);
  };

  return (
    <div className="main" ref={sectionRef}>
      <h1 className="heading">New Arrivals</h1>
      <div className="products">
        {visibleProducts.map((product) => (
          <div className="product-card" key={product._id}   onClick={() => navigate(`/product/${product._id}`)}>
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <h3>{product.name}</h3>
            <p className="rating">⭐ {product.rating}/5</p>
            <p className="price">${product.price}</p>
          </div>
        ))}
      </div>

      {products.length > 4 && (
        <button className="view-all-btn" ref={buttonRef} onClick={handleToggle}>
          {showAll ? "Show Less" : "View All"}
        </button>
      )}
      
    </div>
  );
};

export default ProductCard;
