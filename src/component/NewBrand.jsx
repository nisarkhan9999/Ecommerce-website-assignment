import { useState, useEffect, useRef } from "react";
import "./NewBrand.css";

const NewBrand = () => {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const buttonRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);


const visibleProducts = showAll ? products.slice(8, 16) : products.slice(8, 12);

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
          <div className="nb-product-card" key={product._id}>
            <div className="nb-product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <h3>{product.name}</h3>
            <p className="nb-rating">⭐ {product.rating}/5</p>
            <p className="nb-price">${product.price}</p>
          </div>
        ))}
      </div>

      {products.length > 4 && (
        <button className="nb-view-all-btn" ref={buttonRef} onClick={handleToggle}>
          {showAll ? "Show Less" : "View All"}
        </button>
      )}
    </div>
  );
};

export default NewBrand;