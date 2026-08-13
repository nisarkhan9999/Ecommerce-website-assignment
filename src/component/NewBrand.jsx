import { useState, useRef } from "react";
import "./NewBrand.css";

const products = [
  { id: 1, name: "Skinny Fit Jeans", image: "/images/jeans.png", price: 240, rating: 4.5 },
  { id: 2, name: "Loose Fit Jeans", image: "/images/jeans.png", price: 180, rating: 4.2 },
  { id: 3, name: "Classic Jeans", image: "/images/jeans.png", price: 210, rating: 4.7 },
  { id: 4, name: "Blue Straight Jeans", image: "/images/jeans.png", price: 260, rating: 4.4 },
  { id: 5, name: "Ripped Jeans", image: "/images/jeans.png", price: 220, rating: 4.3 },
  { id: 6, name: "Baggy Jeans", image: "/images/jeans.png", price: 200, rating: 4.6 },
  { id: 7, name: "Slim Fit Jeans", image: "/images/jeans.png", price: 230, rating: 4.5 },
  { id: 8, name: "Wide Leg Jeans", image: "/images/jeans.png", price: 250, rating: 4.4 },
];

const NewBrand = () => {
  const [showAll, setShowAll] = useState(false);
  const buttonRef = useRef(null);
  const sectionRef = useRef(null);
  const visibleProducts = showAll ? products : products.slice(0, 4);

  const handleToggle = () => {
  const wasShowingAll = showAll;
  setShowAll(!showAll);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (wasShowingAll) {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        buttonRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  });
};

  return (
<div className="nb-main" ref={sectionRef}>
  <h1 className="nb-heading">New Brand</h1>
  <div className="nb-products">
    {visibleProducts.map((product) => (
      <div className="nb-product-card" key={product.id}>
        <div className="nb-product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <h3>{product.name}</h3>
        <p className="nb-rating">⭐ {product.rating}/5</p>
        <p className="nb-price">${product.price}</p>
      </div>
    ))}
  </div>

  <button className="nb-view-all-btn" ref={buttonRef} onClick={handleToggle}>
    {showAll ? "Show Less" : "View All"}
  </button>
</div>
  );
};

export default NewBrand;