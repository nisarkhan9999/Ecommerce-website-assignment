import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RelatedProducts from "./RelatedProducts";
import "./ProductDetail.css";

const reviews = [
  {
    name: "Samantha D.",
    rating: 5,
    text: "I absolutely love this product! The quality is amazing and it fits perfectly.",
    date: "August 14, 2023",
  },
  {
    name: "Alex M.",
    rating: 5,
    text: "Exceeded my expectations! The material feels premium and the fit is great.",
    date: "August 15, 2023",
  },
  {
    name: "Ethan R.",
    rating: 4,
    text: "This t-shirt is a must-have for anyone who appreciates good design.",
    date: "August 16, 2023",
  },
  {
    name: "Olivia P.",
    rating: 5,
    text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt nails both.",
    date: "August 17, 2023",
  },
  {
    name: "Hassan T.",
    rating: 5,
    text: "Great quality fabric and perfect stitching. Highly recommend this store.",
    date: "August 18, 2023",
  },
  {
    name: "Zainab K.",
    rating: 4,
    text: "Loved the color and fit. Delivery was also quick and packaging was neat.",
    date: "August 19, 2023",
  },
  {
    name: "Bilal R.",
    rating: 5,
    text: "Best purchase I've made online in a while. Will definitely order again.",
    date: "August 20, 2023",
  },
  {
    name: "Ayesha M.",
    rating: 4,
    text: "Nice product overall, matches the pictures shown on the website.",
    date: "August 21, 2023",
  },
];

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("details");

  const colors = ["#4b3b2a", "#2f4f3f", "#2b2b40"];

  const sizes = [
    "Small",
    "Medium",
    "Large",
    "X-Large",
  ];

  useEffect(() => {
    fetch(`https://e-commerce-backend-five-henna.vercel.app/products/${id}`)
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

  const handleAddToCart = () => {
  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const cartItem = {
    id: product._id,
    name: product.name,
    image: product.image,
    price: product.price,
    color: colors[selectedColor],
    size: selectedSize,
    qty: qty,
  };

  cart.push(cartItem);

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  window.dispatchEvent(
    new Event("cartUpdated")
  );

  alert("Added to cart!");
};

  const thumbnailList =
    product.images && product.images.length > 0
      ? product.images
      : [
          product.image,
          product.image,
          product.image,
        ];

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
              <img
                src={mainImage}
                alt={product.name}
              />
            </div>

          </div>

          <div className="pd-info">

            <h1>{product.name}</h1>

            <p className="pd-rating">
              ⭐ {product.rating}/5
            </p>

            <p className="pd-price">
              ${product.price}
            </p>

            <p className="pd-description">
              {product.description}
            </p>

            <hr />

            <p className="pd-label">
              Select Colors
            </p>

            <div className="pd-colors">

              {colors.map((c, i) => (
                <button
                  key={i}
                  className={`pd-color ${
                    selectedColor === i
                      ? "active"
                      : ""
                  }`}
                  style={{ background: c }}
                  onClick={() =>
                    setSelectedColor(i)
                  }
                />
              ))}

            </div>

            <hr />

            <p className="pd-label">
              Choose Size
            </p>

            <div className="pd-sizes">

              {sizes.map((s) => (
                <button
                  key={s}
                  className={`pd-size ${
                    selectedSize === s
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedSize(s)
                  }
                >
                  {s}
                </button>
              ))}

            </div>

            <hr />

            <div className="pd-cart-row">

              <div className="pd-qty">

                <button
                  onClick={() =>
                    setQty(Math.max(1, qty - 1))
                  }
                >
                  -
                </button>

                <span>{qty}</span>

                <button
                  onClick={() =>
                    setQty(qty + 1)
                  }
                >
                
                  +
                </button>

              </div>

              <button
                className="pd-add-btn"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

            </div>

          </div>

        </div>

      </div>

      <div className="pd-tabs-wrapper">

        <div className="pd-tabs">

          <span
            className={
              activeTab === "details"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("details")
            }
          >
            Product Details
          </span>

          <span
            className={
              activeTab === "reviews"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("reviews")
            }
          >
            Rating & Reviews
          </span>

          <span
            className={
              activeTab === "faqs"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("faqs")
            }
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

            {reviews.map((r, i) => (
              <div
                key={i}
                className="pd-review-card"
              >

                <p className="pd-review-stars">
                  {"★".repeat(r.rating)}
                </p>

                <div className="pd-review-name">
                  <b>{r.name}</b>{" "}
                  <span className="pd-check">
                    ✓
                  </span>
                </div>

                <p className="pd-review-text">
                  "{r.text}"
                </p>

                <p className="pd-review-date">
                  Posted on {r.date}
                </p>

              </div>
            ))}

          </div>
        )}

        {activeTab === "faqs" && (
          <p>FAQs coming soon...</p>
        )}

      </div>

      <RelatedProducts />

    </div>
  );
};

export default ProductDetail;