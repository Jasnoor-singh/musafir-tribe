import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';

import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Hero from './components/Hero';
import NotFound from './pages/NotFound';

const App = () => {
  const location = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  // Check if the current route is "/login"
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="bg-[#FBF7EE]">
      {/* Navbar should not appear on the login page */}
      {!isLoginPage && (
        <div className="px-0 sm:px-[5vw] md:px-[7vw] lg:px-[0vw]">
          <Navbar /> {location.pathname == '/' && <Hero/>}
        </div>
      )}

      <div className={`px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#FBF7EE] ${location.pathname === "/" ? "homepage-container" : ""}`}>
        {/* SearchBar and ToastContainer should also not appear on the login page */}

        <ToastContainer />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<Navigate to="/collection" replace />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/verify" element={<Navigate to="/collection" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Footer should not appear on the login page */}
      {!isLoginPage && (
        <div className="px-0 sm:px-[5vw] md:px-[7vw] lg:px-[0vw]">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default App;
