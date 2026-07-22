import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import ProductCard from '../../components/shop/ProductCard';
import ScrollReveal from '../../components/common/ScrollReveal';
import CursorGrid from '../../components/common/CursorGrid';
import { ArrowRight, Star, ArrowLeft, ArrowUpRight, Play, Eye, Compass, GitCommit, Layers, Hammer } from 'lucide-react';

const blueprintSlides = [
  {
    _id: 'featured_1',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
    title: 'THE CORE SIGNET',
    subtitle: 'PLATINUM GEOMETRICS',
    material: 'Solid Platinum 950',
    weight: '14.2 grams',
    stone: 'VVS1 Round Cut Diamond (0.45ct)',
    aspectRatio: 'Symmetric Oval Core',
    coordinates: 'LAT 45.9° N / LONG 9.1° E',
    density: '21.45 g/cm³',
    desc: 'An architectural signet ring cast in solid platinum, carrying a single clean, tension-set center stone.'
  },
  {
    _id: 'featured_2',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1200&q=80',
    title: 'THE LINEAR CHOKER',
    subtitle: 'POLISHED PRECISION',
    material: '18K Champagne Gold',
    weight: '28.6 grams',
    stone: 'Round Cut Pavé Diamonds (1.84ctw)',
    aspectRatio: 'Tension-Wire Curve',
    coordinates: 'GRID SPEC 09-X2',
    density: '15.60 g/cm³',
    desc: 'A structural necklace that traces the contours of the collarbone with polished precision and a linear diamond row.'
  }
];

const Home = () => {
  const navigate = useNavigate();
  const { products, categories } = useShop();

  const [activeIdx, setActiveIdx] = useState(0);
  const [hoverCoords, setHoverCoords] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const slide = blueprintSlides[activeIdx];

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
    setHoverCoords({ x, y });
  };

  return (
    <div className="w-full bg-obsidian text-platinum overflow-hidden">

      {/* Interactive Blueprint Showcase Hero */}
      <section className="relative min-h-[90vh] md:min-h-screen w-full flex items-center pt-24 pb-16 overflow-hidden">
        
        {/* Ambient background glow & Cursor Grid */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <CursorGrid
            cellSize={60}
            color="#c9b067"
            radius={180}
            lineWidth={0.8}
            maxOpacity={0.35}
            gridOpacity={0.03}
            className="absolute inset-0 opacity-45 pointer-events-auto"
          />
          <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-champagne/5 liquid-orb-1 pointer-events-none" />
          <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-titanium/5 liquid-orb-2 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Asymmetric Image Showcase (Museum Gallery style) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {/* Minimalist Grid Coordinates Label */}
            <div className="flex justify-between text-[10px] text-titanium/60 tracking-widest font-mono uppercase">
              <span>EXHIBIT REF // {slide.coordinates}</span>
              <span>COORD: {isHovering ? `X: ${hoverCoords.x}% / Y: ${hoverCoords.y}%` : 'SYS_READY'}</span>
            </div>

            {/* Interactive Image Frame */}
            <div 
              className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slateSurface border border-white/5 cursor-crosshair group"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
              
              {/* Dynamic crosshair elements */}
              {isHovering && (
                <>
                  {/* Horizontal Guide */}
                  <div 
                    className="absolute left-0 right-0 h-[1px] bg-champagne/30 pointer-events-none transition-all duration-75"
                    style={{ top: `${hoverCoords.y}%` }}
                  />
                  {/* Vertical Guide */}
                  <div 
                    className="absolute top-0 bottom-0 w-[1px] bg-champagne/30 pointer-events-none transition-all duration-75"
                    style={{ left: `${hoverCoords.x}%` }}
                  />
                  {/* Floating Coordinates Tag */}
                  <div 
                    className="absolute bg-obsidian/90 border border-champagne/30 px-2.5 py-1 rounded text-[8px] text-champagne font-mono pointer-events-none transform -translate-x-1/2 -translate-y-8"
                    style={{ left: `${hoverCoords.x}%`, top: `${hoverCoords.y}%` }}
                  >
                    X:{hoverCoords.x} Y:{hoverCoords.y}
                  </div>
                </>
              )}
            </div>

            {/* Slide Switchers */}
            <div className="flex gap-4 items-center">
              {blueprintSlides.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`text-[10px] tracking-widest uppercase font-serif pb-1 transition-all ${
                    idx === activeIdx 
                      ? 'text-champagne border-b border-champagne' 
                      : 'text-titanium hover:text-platinum border-b border-transparent'
                  }`}
                >
                  0{idx + 1} {item.title.split(' ')[1]}
                </button>
              ))}
            </div>

          </div>

          {/* Right: Technical Specification & Blueprint Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] tracking-[0.4em] font-semibold text-champagne uppercase block">
              {slide.subtitle}
            </span>
            <ScrollReveal
              key={slide.title}
              containerClassName="font-serif text-3xl md:text-5xl font-normal leading-tight text-platinum"
              textClassName="font-serif text-3xl md:text-5xl font-normal leading-tight text-platinum"
            >
              {slide.title}
            </ScrollReveal>
            <p className="font-sans text-sm text-titanium leading-relaxed">
              {slide.desc}
            </p>

            {/* Technical Spec Matrix (Blueprint look) */}
            <div className="glass rounded-xl p-6 border border-white/5 space-y-3 font-mono text-[11px] text-titanium">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-champagne" /> COMPOSITION</span>
                <span className="text-platinum uppercase">{slide.material}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="flex items-center gap-1.5"><Hammer className="w-3.5 h-3.5 text-champagne" /> WEIGHT</span>
                <span className="text-platinum">{slide.weight}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="flex items-center gap-1.5"><GitCommit className="w-3.5 h-3.5 text-champagne" /> STONE VALUE</span>
                <span className="text-platinum uppercase">{slide.stone}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1.5"><Compass className="w-3.5 h-3.5 text-champagne" /> SHAPE RADIUS</span>
                <span className="text-platinum uppercase">{slide.aspectRatio}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => navigate('/shop')}
                className="flex-grow bg-platinum hover:bg-champagne text-obsidian py-4 rounded-lg font-sans text-xs font-bold tracking-[0.2em] uppercase premium-transition shadow-lg"
              >
                ACQUIRE PIECE
              </button>
              <button 
                onClick={() => navigate('/about')}
                className="border border-white/10 text-platinum hover:bg-white/5 px-6 py-4 font-sans text-xs font-bold tracking-[0.2em] uppercase premium-transition rounded-lg"
              >
                OUR LEGACY
              </button>
            </div>

          </div>

        </div>

      </section>

      {/* Featured Categories (Translucent Glass Bento Grid) */}
      <section className="relative py-32 bg-obsidian border-b border-white/5 overflow-hidden">
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-lg mx-auto mb-16 space-y-3">
            <span className="text-xs tracking-[0.2em] font-semibold text-champagne uppercase">Curated Catalog</span>
            <h2 className="text-3xl md:text-4xl font-normal font-serif text-platinum">Shop by Category</h2>
            <p className="text-sm text-titanium leading-relaxed">Pieces mapped by geometric forms and metal structures.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <div 
                key={cat}
                onClick={() => navigate(`/shop?category=${cat}`)}
                className="group cursor-pointer flex flex-col items-center p-8 glass rounded-2xl hover:border-white/10 premium-transition duration-500 hover:-translate-y-1.5"
              >
                <div className="w-20 h-20 rounded-full bg-slateSurface border border-white/5 flex items-center justify-center mb-4 group-hover:bg-champagne/10 premium-transition duration-500">
                  <span className="material-symbols-outlined text-3xl text-champagne">
                    {cat === 'Rings' ? 'diamond' : cat === 'Earrings' ? 'star' : cat === 'Necklaces' ? 'straighten' : cat === 'Bracelets' ? 'watch' : 'auto_awesome'}
                  </span>
                </div>
                <span className="font-serif text-xs tracking-widest uppercase text-platinum group-hover:text-champagne premium-transition duration-500">
                  {cat}
                </span>
                <span className="text-[10px] text-titanium mt-2 opacity-0 group-hover:opacity-100 premium-transition duration-500 flex items-center gap-1 font-sans">
                  EXPLORE <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections Grid */}
      <section className="py-32 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-xs tracking-[0.2em] font-semibold text-champagne uppercase">Selected Series</span>
              <h2 className="text-3xl md:text-4xl font-normal font-serif text-platinum mt-1">Featured Collections</h2>
            </div>
            <Link 
              to="/shop" 
              className="group text-xs font-semibold tracking-widest text-champagne hover:text-platinum premium-transition duration-300 flex items-center gap-2 font-sans border-b border-champagne/30 pb-1"
            >
              EXPLORE ATELIER <ArrowRight className="w-4 h-4 premium-transition duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Duarte Sparkline Editorial Quote Section */}
      <section className="py-24 bg-obsidian border-y border-white/5 overflow-hidden relative">
        <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] rounded-full bg-champagne/5 liquid-orb-3 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10 space-y-6">
          <span className="text-[10px] tracking-[0.4em] font-semibold text-champagne uppercase block">THE PHILOSOPHY</span>
          <p className="font-serif italic text-2xl md:text-3xl text-platinum leading-relaxed">
            "Simplicity is the ultimate sophistication, polished in the purest gold. We don't just shape fine metals—we craft silent heirlooms of human emotion."
          </p>
          <span className="text-[10px] tracking-[0.2em] font-semibold text-titanium uppercase block font-sans">— London Atelier Journal</span>
        </div>
      </section>

      {/* Brand Story Banner Section */}
      <section className="relative py-36 bg-obsidian text-platinum overflow-hidden">
        <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-20 md:opacity-70">
          <img 
            src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80" 
            alt="Jewelry workshop artisan"
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs tracking-[0.2em] font-semibold text-champagne uppercase">Artisanship</span>
            <ScrollReveal
              containerClassName="text-3xl md:text-5xl font-normal font-serif text-platinum tracking-tight leading-tight uppercase"
              textClassName="text-3xl md:text-5xl font-normal font-serif text-platinum tracking-tight leading-tight uppercase"
            >
              ETHICALLY METICULOUS. TIMELESSLY CRAFTED
            </ScrollReveal>
            <p className="text-sm text-titanium leading-relaxed font-sans max-w-md">
              At Golden Glow, we believe that fine jewelry is more than an accessory—it is an heirloom of human emotion. Every diamond is conflict-free, and every gram of gold is recycled to protect the world that inspires us.
            </p>
            <div className="flex gap-6 items-center pt-2">
              <button 
                onClick={() => navigate('/about')}
                className="bg-platinum text-obsidian hover:bg-champagne px-6 py-3 text-xs tracking-wider uppercase font-semibold premium-transition font-sans rounded-lg"
              >
                Learn Our Philosophy
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Jewelry Grid */}
      <section className="py-32 bg-obsidian border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs tracking-[0.2em] font-semibold text-champagne uppercase">Hot items</span>
              <h2 className="text-3xl md:text-4xl font-normal font-serif text-platinum mt-1">Trending Jewels</h2>
            </div>
            <Link 
              to="/shop" 
              className="text-xs font-semibold tracking-widest text-champagne hover:text-platinum premium-transition duration-300 flex items-center gap-2 font-sans"
            >
              VIEW ALL
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="relative py-32 bg-obsidian overflow-hidden">
        
        {/* Floating Liquid Glass Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] rounded-full bg-champagne/5 liquid-orb-3" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-lg mx-auto mb-16 space-y-3">
            <span className="text-xs tracking-[0.2em] font-semibold text-champagne uppercase">Kind Words</span>
            <h2 className="text-3xl md:text-4xl font-normal font-serif text-platinum">Client Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 glass rounded-2xl border border-white/5 flex flex-col justify-between hover:border-white/10 premium-transition duration-500 hover:-translate-y-1">
              <div className="space-y-4">
                <div className="flex gap-1 text-champagne">
                  <Star className="w-4 h-4 fill-champagne" />
                  <Star className="w-4 h-4 fill-champagne" />
                  <Star className="w-4 h-4 fill-champagne" />
                  <Star className="w-4 h-4 fill-champagne" />
                  <Star className="w-4 h-4 fill-champagne" />
                </div>
                <p className="font-serif italic text-sm text-titanium leading-relaxed">
                  "The quality of the gold and the precision of the diamond claw setting exceeded all my expectations. Truly a future heirloom piece."
                </p>
              </div>
              <div className="flex items-center gap-3 mt-6 border-t border-white/5 pt-4">
                <div className="w-10 h-10 rounded-full bg-champagne/10 text-champagne flex items-center justify-center font-bold font-serif text-sm">
                  EV
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-platinum font-sans">Eleanor Vance</h4>
                  <p className="text-[10px] text-titanium font-sans">Verified Buyer</p>
                </div>
              </div>
            </div>

            <div className="p-8 glass rounded-2xl border border-white/5 flex flex-col justify-between hover:border-white/10 premium-transition duration-500 hover:-translate-y-1">
              <div className="space-y-4">
                <div className="flex gap-1 text-champagne">
                  <Star className="w-4 h-4 fill-champagne" />
                  <Star className="w-4 h-4 fill-champagne" />
                  <Star className="w-4 h-4 fill-champagne" />
                  <Star className="w-4 h-4 fill-champagne" />
                  <Star className="w-4 h-4 fill-champagne" />
                </div>
                <p className="font-serif italic text-sm text-titanium leading-relaxed">
                  "Golden Glow designed our custom anniversary rings. The interactive drawing stages and metals suggestions were extremely professional."
                </p>
              </div>
              <div className="flex items-center gap-3 mt-6 border-t border-white/5 pt-4">
                <div className="w-10 h-10 rounded-full bg-champagne/10 text-champagne flex items-center justify-center font-bold font-serif text-sm">
                  MT
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-platinum font-sans">Marcus Thorne</h4>
                  <p className="text-[10px] text-titanium font-sans">Custom Order</p>
                </div>
              </div>
            </div>

            <div className="p-8 glass rounded-2xl border border-white/5 flex flex-col justify-between hover:border-white/10 premium-transition duration-500 hover:-translate-y-1">
              <div className="space-y-4">
                <div className="flex gap-1 text-champagne">
                  <Star className="w-4 h-4 fill-champagne" />
                  <Star className="w-4 h-4 fill-champagne" />
                  <Star className="w-4 h-4 fill-champagne" />
                  <Star className="w-4 h-4 fill-champagne" />
                  <Star className="w-4 h-4 fill-champagne" />
                </div>
                <p className="font-serif italic text-sm text-titanium leading-relaxed">
                  "Understated, elegant, yet undeniably luxury. I wear my geometric signet ring daily and get compliments constantly."
                </p>
              </div>
              <div className="flex items-center gap-3 mt-6 border-t border-white/5 pt-4">
                <div className="w-10 h-10 rounded-full bg-champagne/10 text-champagne flex items-center justify-center font-bold font-serif text-sm">
                  SC
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-platinum font-sans">Sophia Chen</h4>
                  <p className="text-[10px] text-titanium font-sans">Verified Buyer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Gallery Feed */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-8">
          <span className="text-xs tracking-[0.3em] font-semibold text-champagne uppercase">Follow the Glow</span>
          <p className="text-xs font-semibold tracking-widest text-platinum uppercase mt-1">@GOLDENGLOWJEWELRY</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {[
            'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=400&q=80',
            '/bangle-instagram.png',
            'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=400&q=80'
          ].map((imgUrl, i) => (
            <div key={i} className="aspect-square relative overflow-hidden group cursor-pointer border border-white/5 rounded-lg">
              <img 
                src={imgUrl} 
                alt="Instagram jewelry lifestyle"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="material-symbols-outlined text-white text-3xl">favorite</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
