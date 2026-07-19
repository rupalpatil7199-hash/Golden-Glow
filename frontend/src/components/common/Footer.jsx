import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import { Instagram, Facebook, Twitter, ShieldCheck } from 'lucide-react';

const Footer = () => {
  const { showSuccess } = useNotification();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      showSuccess("Welcome to the Golden Circle. Invitation details sent to your inbox!");
      setEmail('');
    }
  };

  return (
    <footer className="bg-surface-highest pt-20 pb-10 border-t border-surface-container/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Summary */}
        <div className="flex flex-col gap-6">
          <Link to="/" className="font-serif text-3xl text-primary font-bold tracking-tight">Golden Glow</Link>
          <p className="text-sm text-secondary-text leading-relaxed">
            Crafting timeless elegance since 1992. Every piece is meticulously handmade in our London atelier with ethically sourced precious metals and exceptional gemstones.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="w-10 h-10 rounded-full border border-surface-dim hover:border-primary-glow flex items-center justify-center text-secondary hover:text-primary-glow transition-all">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-surface-dim hover:border-primary-glow flex items-center justify-center text-secondary hover:text-primary-glow transition-all">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-surface-dim hover:border-primary-glow flex items-center justify-center text-secondary hover:text-primary-glow transition-all">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Shop links */}
        <div>
          <h4 className="font-sans text-xs font-bold uppercase tracking-[0.2em] mb-6 text-luxuryBlack">Shop Collections</h4>
          <ul className="space-y-3">
            <li><Link to="/shop?category=Rings" className="text-sm text-secondary hover:text-primary-glow transition-colors">Rings</Link></li>
            <li><Link to="/shop?category=Earrings" className="text-sm text-secondary hover:text-primary-glow transition-colors">Earrings</Link></li>
            <li><Link to="/shop?category=Necklaces" className="text-sm text-secondary hover:text-primary-glow transition-colors">Necklaces</Link></li>
            <li><Link to="/shop?category=Bracelets" className="text-sm text-secondary hover:text-primary-glow transition-colors">Bracelets</Link></li>
            <li><Link to="/shop?category=Bangles" className="text-sm text-secondary hover:text-primary-glow transition-colors">Bangles</Link></li>
          </ul>
        </div>

        {/* Customer Care / Policy Links */}
        <div>
          <h4 className="font-sans text-xs font-bold uppercase tracking-[0.2em] mb-6 text-luxuryBlack">Information</h4>
          <ul className="space-y-3">
            <li><Link to="/about" className="text-sm text-secondary hover:text-primary-glow transition-colors">Our Brand Story</Link></li>
            <li><Link to="/shipping" className="text-sm text-secondary hover:text-primary-glow transition-colors">Shipping & Delivery</Link></li>
            <li><Link to="/returns" className="text-sm text-secondary hover:text-primary-glow transition-colors">Refunds & Returns</Link></li>
            <li><Link to="/privacy" className="text-sm text-secondary hover:text-primary-glow transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-sm text-secondary hover:text-primary-glow transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Newsletter Form */}
        <div>
          <h4 className="font-sans text-xs font-bold uppercase tracking-[0.2em] mb-6 text-luxuryBlack">Join the Golden Circle</h4>
          <p className="text-sm text-secondary-text mb-4 leading-relaxed">
            Be the first to see new releases and receive private invitations to exclusive events.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border border-surface-container text-xs p-3 rounded focus:outline-none focus:ring-1 focus:ring-primary-glow font-sans w-full"
              required
            />
            <button 
              type="submit"
              className="bg-luxuryBlack text-white hover:bg-primary-glow p-3 text-xs uppercase tracking-wider font-semibold font-sans transition-colors w-full rounded"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Copy & Security */}
      <div className="mt-16 border-t border-surface-container/60 pt-8 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[11px] text-secondary font-sans">
          © {new Date().getFullYear()} Golden Glow. Handcrafted Excellence. All Rights Reserved.
        </p>
        <div className="flex items-center gap-2 text-secondary opacity-60 text-[10px]">
          <ShieldCheck className="w-4 h-4 text-primary-glow" /> SECURE STRIPE CHECKOUT
        </div>
      </div>
    </footer>
  );
};

export default Footer;
