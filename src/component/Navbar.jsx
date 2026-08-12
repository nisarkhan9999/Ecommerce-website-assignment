import logo from "../images/SHOP.CO.svg"

import { FaSearch, FaRegUserCircle} from 'react-icons/fa';
import { LuShoppingCart } from "react-icons/lu";
const Navbar = () => {
  return (
    <nav>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "80px" }}>
  <img src={logo} alt="" width={"130px"} />
  <div style={{ gap: "20px", display: "flex" }}>
    <div>Shop</div>
    <div>On sale</div>
    <div>New arrivals</div>
    <div>Brands</div>
  </div>
  <div style={{ display: 'flex',gap:"10px", border: '1px solid #ddd', borderRadius: '8px', padding: '7px 100px 10px 20px' }}>
    <FaSearch style={{ color: '#888' }} />
    <input type="text" placeholder="Search for products..." style={{ border: 'none', outline: 'none', width: '100%' }} />
  </div>
  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
    <LuShoppingCart />
    <FaRegUserCircle />
  </div>
</div>

   

    </nav>
  );
};

export default Navbar;