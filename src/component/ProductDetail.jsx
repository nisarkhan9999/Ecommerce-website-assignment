import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("details");

  const colors = ["#4b3b2a", "#2f4f3f", "#2b2b40"];
  const sizes = ["Small", "Medium", "Large", "X-Large"];

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setMainImage(data.image);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const thumbnailList = product.images && product.images.length > 0
    ? product.images
    : [product.image, product.image, product.image];

  return (
    <div>
      <div className="pd-wrapper">
        <div className="pd-top">
          <div className="pd-gallery">
            <div className="pd-thumbs">
              {thumbnailList.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="pd-thumb"
                  onClick={() => setMainImage(img)}
                  alt=""
                />
              ))}
            </div>

            <div className="pd-main-image">
              <img src={mainImage} alt={product.name} />
            </div>
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

      <div className="pd-tabs-wrapper">
        <div className="pd-tabs">
          <span
            className={activeTab === "details" ? "active" : ""}
            onClick={() => setActiveTab("details")}
          >
            Product Details
          </span>
          <span
            className={activeTab === "reviews" ? "active" : ""}
            onClick={() => setActiveTab("reviews")}
          >
            Rating & Reviews
          </span>
          <span
            className={activeTab === "faqs" ? "active" : ""}
            onClick={() => setActiveTab("faqs")}
          >
            FAQs
          </span>
        </div>
      </div>

      <div className="pd-tab-content">
        {activeTab === "details" && (
          <p>{product.description}</p>
        )}

        {activeTab === "reviews" && (
          <div className="pd-reviews">
            <div className="pd-review-card">
              <p className="pd-review-stars">★★★★★</p>
              <div className="pd-review-name">
                <b>Samantha D.</b> <span className="pd-check">✓</span>
              </div>
              <p className="pd-review-text">"I absolutely love this product! The quality is amazing and it fits perfectly."</p>
              <p className="pd-review-date">Posted on August 14, 2023</p>
            </div>

            <div className="pd-review-card">
              <p className="pd-review-stars">★★★★★</p>
              <div className="pd-review-name">
                <b>Alex M.</b> <span className="pd-check">✓</span>
              </div>
              <p className="pd-review-text">"Exceeded my expectations! The material feels premium and the fit is great."</p>
              <p className="pd-review-date">Posted on August 15, 2023</p>
            </div>
          </div>
        )}

        {activeTab === "faqs" && (
          <p>FAQs coming soon...</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;