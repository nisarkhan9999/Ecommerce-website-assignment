import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryPage.css";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(200);
  const navigate = useNavigate();
  const perPage = 9;

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const totalPages = Math.ceil(products.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const visibleProducts = products.slice(startIndex, startIndex + perPage);

  const colors = ["#22c55e", "#ef4444", "#eab308", "#f97316", "#06b6d4", "#2563eb", "#7c3aed", "#ec4899", "#fff", "#000"];
  const sizes = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"];
  const categories = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
  const dressStyles = ["Casual", "Formal", "Party", "Gym"];

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 10);
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 10);
    setMaxPrice(value);
  };

  return (
    <div className="cat-wrapper">
      <p className="cat-breadcrumb">Home &gt; Casual</p>

      <div className="cat-layout">
        {/* Sidebar filters */}
        <aside className="cat-sidebar">
          <div className="cat-filter-header">
            <span>Filters</span>
          </div>

          <div className="cat-filter-group">
            {categories.map((c) => (
              <div key={c} className="cat-filter-item">{c} <span>&gt;</span></div>
            ))}
          </div>

          <hr />
          <p className="cat-filter-title">Price</p>
          <div className="cat-price-slider">
            <div
              className="cat-slider-track"
              style={{
                left: `${((minPrice - 50) / 150) * 100}%`,
                right: `${100 - ((maxPrice - 50) / 150) * 100}%`,
              }}
            />
            <input
              type="range"
              min="50"
              max="200"
              value={minPrice}
              onChange={handleMinChange}
              className="range-min"
            />
            <input
              type="range"
              min="50"
              max="200"
              value={maxPrice}
              onChange={handleMaxChange}
              className="range-max"
            />
          </div>
          <div className="cat-range-labels">
            <span>${minPrice}</span>
            <span>${maxPrice}</span>
          </div>

          <hr />
          <p className="cat-filter-title">Colors</p>
          <div className="cat-colors">
            {colors.map((c, i) => (
              <button
                key={i}
                className={`cat-color ${selectedColor === i ? "active" : ""}`}
                style={{ background: c, border: c === "#fff" ? "1px solid #ddd" : "none" }}
                onClick={() => setSelectedColor(selectedColor === i ? null : i)}
              />
            ))}
          </div>

          <hr />
          <p className="cat-filter-title">Size</p>
          <div className="cat-sizes">
            {sizes.map((s) => (
              <button
                key={s}
                className={`cat-size ${selectedSize === s ? "active" : ""}`}
                onClick={() => setSelectedSize(selectedSize === s ? null : s)}
              >
                {s}
              </button>
            ))}
          </div>

          <hr />
          <p className="cat-filter-title">Dress Style</p>
          <div className="cat-filter-group">
            {dressStyles.map((d) => (
              <div
                key={d}
                className={`cat-filter-item ${selectedStyle === d ? "active" : ""}`}
                onClick={() => setSelectedStyle(selectedStyle === d ? null : d)}
              >
                {d} <span>&gt;</span>
              </div>
            ))}
          </div>

          <button className="cat-apply-btn">Apply Filter</button>
        </aside>

        {/* Products */}
        <div className="cat-main">
          <div className="cat-top-row">
            <h2>Casual</h2>
            <span className="cat-sort">Showing {startIndex + 1}-{Math.min(startIndex + perPage, products.length)} of {products.length} Products</span>
          </div>

          <div className="cat-grid">
            {visibleProducts.map((product) => (
              <div
                key={product._id}
                className="cat-card"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <div className="cat-card-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
                <p className="cat-rating">⭐ {product.rating}/5</p>
                <p className="cat-price">${product.price}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="cat-pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              ← Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;