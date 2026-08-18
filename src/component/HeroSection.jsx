import "./Hero.css";
import heroImg from "../images/Rectangle 2.svg";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>

        <p>
         Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
        </p>

        <button>Shop Now</button>
        <div className="hero-stats"> 
          <div>
            <h2>200+</h2>
            <p>International Brands</p>
          </div>
          <div>
            <h2>2,000+</h2>
            <p>High-Quality Products</p>
          </div>
          <div>
            <h2>30,000+</h2>
            <p>Happy Customers</p>
          </div>
        </div>
      </div>

      <img src={heroImg} alt="" className="hero-mobile-image" />
    </section>
  );
};

export default Hero;