import React from 'react';
import { Compass, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24 font-sans space-y-20">
      
      {/* Title Hero */}
      <div className="text-center max-w-xl mx-auto space-y-4">
        <span className="text-xs tracking-[0.3em] font-semibold text-primary-glow uppercase">Est. 1992</span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-luxuryBlack tracking-tight">Our Brand Story</h1>
        <p className="text-sm text-secondary-text leading-relaxed">
          Crafting fine metals, setting exceptional stones, and honoring human history through modern jewelry.
        </p>
      </div>

      {/* Grid: Image + Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-surface-container shadow-luxury">
          <img 
            src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80" 
            alt="Handcrafting a ring in the atelier workshop"
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="space-y-6">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-luxuryBlack">The London Atelier</h2>
          <p className="text-xs text-secondary tracking-widest uppercase font-semibold">12 Bond Street, London, W1S 1AR</p>
          <p className="text-sm text-secondary-text leading-relaxed font-sans">
            Every Golden Glow jewelry piece begins its journey in our private Bond Street studio. Our master craftsmen combine age-old filigree drawing processes with modern multi-dimensional casting to ensure structural integrity and a shimmering gold finish.
          </p>
          <div className="border-t border-surface-container/60 pt-4 text-xs space-y-1 text-secondary font-sans">
            <p>Monday - Saturday: 10:00 AM - 7:00 PM</p>
            <p>Sunday: 12:00 PM - 5:00 PM</p>
          </div>
        </div>
      </div>

      {/* Brand pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-surface-container">
        <div className="space-y-4 text-center p-6 bg-surface rounded-2xl border border-surface-container/40">
          <div className="w-12 h-12 rounded-full bg-primary-glow/10 text-primary-glow flex items-center justify-center mx-auto">
            <Compass className="w-6 h-6" />
          </div>
          <h4 className="font-serif text-sm font-bold text-luxuryBlack">Conflict-Free Gemstones</h4>
          <p className="text-xs text-secondary-text leading-relaxed font-sans">
            All our diamonds are certified conflict-free in compliance with the Kimberley Process, ensuring sustainable social structures.
          </p>
        </div>

        <div className="space-y-4 text-center p-6 bg-surface rounded-2xl border border-surface-container/40">
          <div className="w-12 h-12 rounded-full bg-primary-glow/10 text-primary-glow flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h4 className="font-serif text-sm font-bold text-luxuryBlack">Recycled Precious Metals</h4>
          <p className="text-xs text-secondary-text leading-relaxed font-sans">
            We cast our products using 100% recycled 18K Yellow Gold and Platinum 950 to reduce environmental degradation.
          </p>
        </div>

        <div className="space-y-4 text-center p-6 bg-surface rounded-2xl border border-surface-container/40">
          <div className="w-12 h-12 rounded-full bg-primary-glow/10 text-primary-glow flex items-center justify-center mx-auto">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h4 className="font-serif text-sm font-bold text-luxuryBlack">Lifetime Care Guarantee</h4>
          <p className="text-xs text-secondary-text leading-relaxed font-sans">
            We provide complimentary biannual diamond prong checks, ultrasonic cleaning, and repolishing details for all clients.
          </p>
        </div>
      </div>

    </div>
  );
};

export default About;
