import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const RelatedProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://e-commerce-backend-five-henna.vercel.app/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="main">
      <h1 className="heading">You Might Also Like</h1>
      <div className="products">
        {products.slice(0, 4).map((product) => (
          <div
            className="product-card"
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <h3>{product.name}</h3>
            <p className="rating">⭐ {product.rating}/5</p>
            <p className="price">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;