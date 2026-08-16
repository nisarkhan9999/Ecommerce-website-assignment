import Navbar from './component/Navbar';
import HeroSection from './component/HeroSection';
import Black from './component/Black';
import ProductCard from './component/ProductCard';
import NewBrand from './component/NewBrand';
import DressStyle from './component/DressStyle';
import Reviews from './component/Reviews';
import Footer from './component/Footer';
import ProductDetail from './component/ProductDetail';
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection/>
            <Black/>
            <ProductCard/><br />
            <hr className="section-divider" />
            <NewBrand/>
            <DressStyle/>  
            <Reviews/>
          </>
        } />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;