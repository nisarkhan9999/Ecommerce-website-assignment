import "./Footer.css";
import badge from "../images/Badge.png"
import badge1 from "../images/Badge (1).png"
import badge2 from "../images/Badge (2).png"
import badge3 from "../images/Badge (3).png"
import badge4 from "../images/Badge (4).png"
const footerLinks = {
  company: ["About", "Features", "Works", "Career"],
  help: ["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"],
  faq: ["Account", "Manage Deliveries", "Orders", "Payments"],
  resources: ["Free eBooks", "Development Tutorial", "How to - Blog", "Youtube Playlist"]
}


const Footer=()=>{
return(
<footer className="footer">
<div className="Black">
<h1>STAY UPTO DATE ABOUT  OUR <br/> LATEST OFFERS</h1>

<div className="group">
 <div className="input">
<span className="mail-icon">✉</span>
  <input type="text" placeholder="Enter your email address" />
</div>


  <button>Subscribe to Newsletter</button>
</div>
</div>

<div className="footer-content">
  <div className="footer-about">
  <h2>SHOP.CO</h2>
  <p>
    We have clothes that suits your style and which you're proud to wear.
  </p>

  <div className="social-icons">
    <span>f</span>
    <span>𝕏</span>
    <span>◎</span>
    <span>in</span>
  </div>
</div>
<div className="footer-column">
  <h3>COMPANY</h3>

  <a href="#">About</a>
  <a href="#">Features</a>
  <a href="#">Works</a>
  <a href="#">Career</a>
</div>
<div className="footer-column">
  <h3>HELP</h3>

  <a href="#">Customer Support</a>        
  <a href="#">Delivery Details</a>
  <a href="#">Term and Conditions</a>
  <a href="#">Privacy Policy</a>
</div>
<div className="footer-column">
  <h3>FAQ</h3>

  <a href="#">Manage Deliveries</a>        
  <a href="#">Account</a>
  <a href="#">Orders</a>
  <a href="#">Payments</a>
</div>
<div className="footer-column">
  <h3>FAQ</h3>

  <a href="#">Free eBooks</a>        
  <a href="#">Development Tutorial</a>
  <a href="#">How to - Blog</a>
  <a href="#">Youtube Playlist</a>
</div>



</div>
    <hr style={{ height: "1px" , background: "#e5e7eb" , width:"80%"}} />
<div className="last-footer">
    <div style={{color:"grey"}}>
        Shop.co © 2000-2023, All Rights Reserved
    </div>
   <div className="payment-icons">
  <a href="#"><img src={badge} alt="" /></a>
  <a href="#"><img src={badge1} alt="" /></a>
  <a href="#"><img src={badge2} alt="" /></a>
  <a href="#"><img src={badge3} alt="" /></a>
  <a href="#"><img src={badge4} alt="" /></a>
</div>

</div>



</footer>

)}
export default Footer