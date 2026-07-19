import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Store, Heart, User } from 'lucide-react';

const BottomNav = () => {
  return (
    <nav className="md:hidden flex justify-around items-center h-16 bg-white/95 backdrop-blur-lg fixed bottom-0 w-full z-50 rounded-t-2xl shadow-luxury border-t border-surface-container/60">
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center text-xs gap-1 font-sans transition-colors ${
            isActive ? 'text-primary-glow font-semibold' : 'text-secondary'
          }`
        }
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </NavLink>

      <NavLink 
        to="/shop" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center text-xs gap-1 font-sans transition-colors ${
            isActive ? 'text-primary-glow font-semibold' : 'text-secondary'
          }`
        }
      >
        <Store className="w-5 h-5" />
        <span>Shop</span>
      </NavLink>

      <NavLink 
        to="/dashboard?tab=wishlist" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center text-xs gap-1 font-sans transition-colors ${
            isActive ? 'text-primary-glow font-semibold' : 'text-secondary'
          }`
        }
      >
        <Heart className="w-5 h-5" />
        <span>Wishlist</span>
      </NavLink>

      <NavLink 
        to="/dashboard" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center text-xs gap-1 font-sans transition-colors ${
            isActive ? 'text-primary-glow font-semibold' : 'text-secondary'
          }`
        }
      >
        <User className="w-5 h-5" />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
