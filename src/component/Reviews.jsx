import { useRef } from "react";
import "./Reviews.css";

const reviews = [
  { id: 1, name: "Alex K.", verified: true, rating: 5, text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions." },
  { id: 2, name: "Sara Ahmed", verified: true, rating: 4, text: "Great products, will order again. The quality exceeded my expectations and the delivery was super fast." },
  { id: 3, name: "Bilal Raza", verified: true, rating: 5, text: "Best online shopping experience I've had in a long time. Highly recommend this store to everyone." },
  { id: 4, name: "Ayesha Malik", verified: true, rating: 4, text: "Loved the fabric quality and the customer support was very responsive whenever I had questions." },
  { id: 5, name: "Hassan Tariq", verified: true, rating: 5, text: "Customer service was excellent, they helped me pick the right size and it fit perfectly." },
  { id: 6, name: "Zainab Khan", verified: true, rating: 5, text: "Highly recommend this store! The packaging was neat and the product matched the pictures exactly." },
];

const Reviews = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const track = scrollRef.current;
    if (!track) return;

    const cardWidth = track.firstChild.offsetWidth + 20; // card width + gap
    const maxScroll = track.scrollWidth - track.clientWidth;

    if (direction === "right") {
      if (track.scrollLeft >= maxScroll - 5) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    } else {
      if (track.scrollLeft <= 5) {
        track.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        track.scrollBy({ left: -cardWidth, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="rv-wrapper">
      <div className="rv-header">
        <h2 className="rv-title">Our Happy Customers</h2>
        <div className="rv-arrows">
          <button className="rv-arrow" onClick={() => scroll("left")}>‹</button>
          <button className="rv-arrow" onClick={() => scroll("right")}>›</button>
        </div>
      </div>

      <div className="rv-fade-container">
        <div className="rv-track" ref={scrollRef}>
          {reviews.map((review) => (
            <div key={review.id} className="rv-card">
              <p className="rv-stars">{"★".repeat(review.rating)}</p>
              <div className="rv-name-row">
                <span className="rv-name">{review.name}</span>
                {review.verified && <span className="rv-badge">✓</span>}
              </div>
              <p className="rv-text">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;