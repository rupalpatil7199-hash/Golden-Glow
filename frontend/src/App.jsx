import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Providers
import { CustomAuthProvider } from './context/AuthContext';
import { ShopProvider } from './context/ShopContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';

// Layout Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import BottomNav from './components/common/BottomNav';
import CartDrawer from './components/shop/CartDrawer';

// Pages
import Home from './pages/public/Home';
import Shop from './pages/public/Shop';
import ProductDetails from './pages/public/ProductDetails';
import About from './pages/public/About';
import Blogs from './pages/public/Blogs';
import FAQ from './pages/public/FAQ';
import Policy from './pages/public/Policy';
import CheckoutFlow from './pages/checkout/CheckoutFlow';
import Success from './pages/checkout/Success';
import Failed from './pages/checkout/Failed';
import Dashboard from './pages/customer/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import Login from './pages/public/Login';

const AppContent = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  // Hide footer on dashboard/checkout to keep layout clean
  const isDashboardOrCheckout = location.pathname.startsWith('/dashboard') || 
                                location.pathname.startsWith('/checkout') || 
                                location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      
      {/* Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Main Pages router outlet */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Policy />} />
          <Route path="/terms" element={<Policy />} />
          <Route path="/shipping" element={<Policy />} />
          <Route path="/returns" element={<Policy />} />
          
          <Route path="/checkout" element={<CheckoutFlow />} />
          <Route path="/checkout/success" element={<Success />} />
          <Route path="/checkout/failed" element={<Failed />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login isSignUpInit={true} />} />
        </Routes>
      </main>

      {/* Bottom Nav on mobile */}
      <BottomNav />

      {/* Footer */}
      {!isDashboardOrCheckout && <Footer />}
    </div>
  );
};

function App() {
  return (
    <CustomAuthProvider>
      <NotificationProvider>
        <ShopProvider>
          <CartProvider>
            <Router>
              <AppContent />
            </Router>
          </CartProvider>
        </ShopProvider>
      </NotificationProvider>
    </CustomAuthProvider>
  );
}

export default App;
