import Navbar from './component/Navbar';
import HeroSection from './component/HeroSection';
import Black from './component/Black';
import ProductCard from './component/ProductCard';
import NewBrand from './component/NewBrand';
import DressStyle from './component/DressStyle';
import Reviews from './component/Reviews';
import "./App.css"
function App() {
  return (
    <div>
      <Navbar />
      <HeroSection/>
      <Black/>
      <ProductCard/><br />
      <hr className="section-divider" />
      <NewBrand/>
      <DressStyle/>  
      <Reviews/>
    </div>
  );
}

export default App;