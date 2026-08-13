import { useRef,useEffect,useState } from "react";
import "./Reviews.css";

const reviews = [
  { id: 1, name: "Alex K.", verified: true, rating: 5, text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions." },
  { id: 2, name: "Sara Ahmed", verified: true, rating: 4, text: "Great products, will order again. The quality exceeded my expectations and the delivery was super fast." },
  { id: 3, name: "Bilal Raza", verified: true, rating: 5, text: "Best online shopping experience I've had in a long time. Highly recommend this store to everyone." },
  { id: 4, name: "Ayesha Malik", verified: true, rating: 4, text: "Loved the fabric quality and the customer support was very responsive whenever I had questions." },
  { id: 5, name: "Hassan Tariq", verified: true, rating: 5, text: "Customer service was excellent, they helped me pick the right size and it fit perfectly." },
];

// Cards ko teen baar duplicate kiya — loop ka illusion dene ke liye
const loopedReviews = [...reviews, ...reviews, ...reviews];

const Reviews = () => {
  const scrollRef = useRef(null);

useEffect(() => {
  const track = scrollRef.current;
  if (track) {
    const cardWidth = track.firstChild.offsetWidth + 20;
    track.scrollLeft = cardWidth * reviews.length;
  }
}, []);
  const scroll = (direction) => {
    const track = scrollRef.current;
    if (!track) return;

    const cardWidth = track.firstChild.offsetWidth + 20;
    const singleSetWidth = cardWidth * reviews.length;

    if (direction === "right") {
      track.scrollBy({ left: cardWidth, behavior: "smooth" });
    } else {
      track.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }

    // thoda delay dekar check karo, agar edge ke paas pahunch gaye to silently middle set mein jump karo
    setTimeout(() => {
      if (track.scrollLeft <= 5) {
        track.scrollLeft = singleSetWidth;
      } else if (track.scrollLeft >= singleSetWidth * 2 - 5) {
        track.scrollLeft = singleSetWidth;
      }
    }, 400);
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
        <div
          className="rv-track"
          ref={scrollRef}
          onScroll={(e) => {
            // startup pe middle set se shuru karo
          }}
        >
          {loopedReviews.map((review, index) => (
            <div key={index} className="rv-card">
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