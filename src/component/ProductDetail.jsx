import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [qty, setQty] = useState(1);

  const colors = ["#4b3b2a", "#2f4f3f", "#2b2b40"];
  const sizes = ["Small", "Medium", "Large", "X-Large"];

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pd-wrapper">
      <div className="pd-top">
        <div className="pd-main-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="pd-info">
          <h1>{product.name}</h1>
          <p className="pd-rating">⭐ {product.rating}/5</p>
          <p className="pd-price">${product.price}</p>
          <p className="pd-description">{product.description}</p>

          <hr />
          <p className="pd-label">Select Colors</p>
          <div className="pd-colors">
            {colors.map((c, i) => (
              <button
                key={i}
                className={`pd-color ${selectedColor === i ? "active" : ""}`}
                style={{ background: c }}
                onClick={() => setSelectedColor(i)}
              />
            ))}
          </div>

          <hr />
          <p className="pd-label">Choose Size</p>
          <div className="pd-sizes">
            {sizes.map((s) => (
              <button
                key={s}
                className={`pd-size ${selectedSize === s ? "active" : ""}`}
                onClick={() => setSelectedSize(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <hr />
          <div className="pd-cart-row">
            <div className="pd-qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <button className="pd-add-btn">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;