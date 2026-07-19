import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthBridge } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useShop } from '../../context/ShopContext';
import { Search, Heart, ShoppingBag, User, LogOut, ChevronDown, Shield, Menu, X } from 'lucide-react';

const Navbar = ({ onOpenCart }) => {
  const { user, logout, login } = useAuthBridge();
  const { cartItems } = useCart();
  const { wishlist } = useShop();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchVal.trim())}`);
      setSearchOpen(false);
      setSearchVal('');
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 premium-transition duration-500 ${
      isScrolled 
        ? 'h-16 glass shadow-luxury' 
        : 'h-24 bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center justify-between">
        
        {/* Mobile menu trigger / Left nav (Desktop) */}
        <div className="flex items-center gap-6">
          <button 
            className="md:hidden text-platinum hover:text-champagne premium-transition duration-300"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6 stroke-[1.5]" />
          </button>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="font-serif text-xs tracking-[0.2em] font-medium text-platinum hover:text-champagne premium-transition duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-champagne hover:after:w-full after:transition-all after:duration-300">HOME</Link>
            <Link to="/shop" className="font-serif text-xs tracking-[0.2em] font-medium text-platinum hover:text-champagne premium-transition duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-champagne hover:after:w-full after:transition-all after:duration-300">SHOP</Link>
            <Link to="/about" className="font-serif text-xs tracking-[0.2em] font-medium text-platinum hover:text-champagne premium-transition duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-champagne hover:after:w-full after:transition-all after:duration-300">ABOUT</Link>
            <Link to="/blogs" className="font-serif text-xs tracking-[0.2em] font-medium text-platinum hover:text-champagne premium-transition duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-champagne hover:after:w-full after:transition-all after:duration-300">JOURNAL</Link>
          </nav>
        </div>

        {/* Brand Logo (Center) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
          <Link 
            to="/" 
            className="font-serif text-2xl md:text-3xl tracking-[0.1em] text-platinum font-normal hover:opacity-90 transition-opacity uppercase"
          >
            Golden Glow
          </Link>
          <span className="hidden md:block text-[7px] tracking-[0.45em] text-champagne uppercase mt-[2px] font-sans">Fine Jewelry</span>
        </div>

        {/* Action icons (Right) */}
        <div className="flex items-center gap-4 md:gap-6">
          
          {/* Search Toggle */}
          <div className="relative">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-platinum hover:text-champagne premium-transition duration-300 p-1"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>
            {searchOpen && (
              <form 
                onSubmit={handleSearchSubmit}
                className="absolute right-0 top-12 glass shadow-luxury p-3 border border-white/5 rounded-xl flex items-center gap-2 animate-scale-up w-64 md:w-80"
              >
                <input
                  type="text"
                  placeholder="Search collections..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="bg-surface/50 border-none text-xs p-2 rounded-lg flex-grow focus:outline-none focus:ring-1 focus:ring-champagne/40 text-platinum placeholder-titanium/50 font-sans"
                  autoFocus
                />
                <button type="submit" className="text-champagne hover:text-platinum premium-transition font-sans text-xs font-semibold tracking-wider">GO</button>
              </form>
            )}
          </div>

          {/* Wishlist Link */}
          <Link to="/dashboard?tab=wishlist" className="relative text-platinum hover:text-champagne premium-transition duration-300 p-1">
            <Heart className="w-5 h-5 stroke-[1.5]" />
            {wishlist.length > 0 && (
              <span className="absolute -top-[2px] -right-[2px] bg-champagne text-obsidian text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Bag */}
          <button 
            onClick={onOpenCart} 
            className="relative text-platinum hover:text-champagne premium-transition duration-300 p-1"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            {cartCount > 0 && (
              <span className="absolute -top-[2px] -right-[2px] bg-champagne text-obsidian text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile User Dropdown */}
          <div className="relative">
            {user ? (
              <div>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-1 text-platinum hover:text-champagne premium-transition focus:outline-none"
                >
                  <img 
                    src={user.avatar} 
                    alt={user.fullName}
                    className="w-7 h-7 rounded-full border border-champagne object-cover" 
                  />
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 top-12 glass border border-white/5 rounded-xl shadow-luxury py-2 w-48 animate-scale-up z-[60]">
                    <div className="px-4 py-2 border-b border-white/5">
                      <p className="text-xs font-semibold text-platinum truncate font-sans">{user.fullName}</p>
                      <p className="text-[10px] text-titanium truncate font-sans">{user.email}</p>
                    </div>
                    
                    {user.role === 'admin' && (
                      <Link 
                        to="/admin" 
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-xs text-titanium hover:text-platinum hover:bg-white/5 premium-transition font-sans"
                      >
                        <Shield className="w-4 h-4 text-champagne" /> Admin Panel
                      </Link>
                    )}

                    <Link 
                      to="/dashboard" 
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs text-titanium hover:text-platinum hover:bg-white/5 premium-transition font-sans"
                    >
                      <User className="w-4 h-4" /> My Dashboard
                    </Link>

                    <button 
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-red-400 hover:bg-red-950/20 premium-transition text-left font-sans"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-3">
                <Link 
                  to="/login"
                  className="text-[10px] tracking-widest font-semibold font-sans text-platinum hover:bg-platinum hover:text-obsidian premium-transition border border-platinum rounded-lg px-4 py-2"
                >
                  LOGIN
                </Link>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex justify-start">
          <div className="w-72 max-w-[80vw] bg-obsidian/95 backdrop-blur-md border-r border-white/5 h-full p-6 flex flex-col justify-between shadow-xl animate-fade-in">
            <div>
              <div className="flex items-center justify-between mb-10">
                <span className="font-serif text-xl text-platinum tracking-wider uppercase font-normal">Golden Glow</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-6 h-6 text-platinum hover:text-champagne premium-transition" />
                </button>
              </div>
              <nav className="flex flex-col gap-6">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-sm tracking-widest hover:text-champagne font-medium text-platinum">HOME</Link>
                <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-sm tracking-widest hover:text-champagne font-medium text-platinum">SHOP COLLECTION</Link>
                <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-sm tracking-widest hover:text-champagne font-medium text-platinum">OUR BRAND STORY</Link>
                <Link to="/blogs" onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-sm tracking-widest hover:text-champagne font-medium text-platinum">THE JOURNAL</Link>
                <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-sm tracking-widest hover:text-champagne font-medium text-platinum">CUSTOMER FAQ</Link>
              </nav>
            </div>
            
            {/* Quick switcher in mobile drawer */}
            {!user && (
              <div className="border-t border-white/5 pt-6 flex flex-col gap-2">
                <Link 
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-platinum text-obsidian py-3 text-xs tracking-widest uppercase hover:bg-platinum/90 font-sans font-bold rounded-lg premium-transition text-center"
                >
                  SIGN IN
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
