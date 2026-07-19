import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import ProductCard from '../../components/shop/ProductCard';
import { ProductGridSkeleton } from '../../components/common/Skeleton';
import { Filter, SlidersHorizontal, Search, X } from 'lucide-react';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    products,
    categories,
    loading,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    selectedMaterial,
    setSelectedMaterial,
    priceRange,
    setPriceRange,
    selectedRating,
    setSelectedRating,
    sortBy,
    setSortBy
  } = useShop();

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [liveSuggestions, setLiveSuggestions] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);

  // Sync initial search query from URL parameter if present
  useEffect(() => {
    const searchParam = searchParams.get('search');
    const categoryParam = searchParams.get('category');
    if (searchParam) setSearch(searchParam);
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [searchParams]);

  // Handle typing search with live suggestions
  useEffect(() => {
    if (!search.trim()) {
      setLiveSuggestions([]);
      return;
    }
    
    // Simple frontend live matching
    const matches = products
      .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 5);
    setLiveSuggestions(matches);
  }, [search]);

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedMaterial('All');
    setPriceRange({ min: 0, max: 10000 });
    setSelectedRating('All');
    setSearch('');
  };

  const handleSuggestionClick = (title) => {
    setSearch(title);
    setLiveSuggestions([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24 font-sans bg-obsidian text-platinum">
      
      {/* Search & Toolbar Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-white/5 pb-8">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-normal text-platinum animate-fade-in uppercase tracking-wider">The Atelier Catalog</h1>
          <p className="text-xs text-titanium mt-1 font-semibold tracking-widest uppercase font-sans">Fine metals, curated stones, crafted legacy</p>
        </div>

        {/* Live Search Box */}
        <div className="relative w-full md:w-96">
          <div className="flex items-center glass border border-white/5 rounded-xl p-3 shadow-sm focus-within:border-champagne/40 premium-transition">
            <Search className="w-4 h-4 text-titanium mr-2" />
            <input
              type="text"
              placeholder="Search gems, rings, necklaces..."
              value={search}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none text-xs flex-grow focus:outline-none text-platinum placeholder-titanium/50"
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-titanium hover:text-platinum premium-transition">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Suggestions Dropdown overlay */}
          {searchFocused && liveSuggestions.length > 0 && (
            <div className="absolute top-14 left-0 w-full glass rounded-xl shadow-luxury py-2 z-30 animate-scale-up border border-white/5 bg-obsidian/95">
              {liveSuggestions.map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleSuggestionClick(item.title)}
                  className="px-4 py-2 hover:bg-white/5 cursor-pointer flex items-center justify-between premium-transition duration-200"
                >
                  <span className="text-xs font-medium text-platinum truncate">{item.title}</span>
                  <span className="text-[10px] text-champagne font-semibold">${item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-8">
        
        {/* Left Filter Sidebar (Desktop) */}
        <aside className="hidden md:block w-64 flex-shrink-0 space-y-8 glass p-6 rounded-xl border border-white/5 shadow-luxury">
          
          {/* Header */}
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-sm tracking-wider uppercase font-normal flex items-center gap-2 text-platinum">
              <SlidersHorizontal className="w-4 h-4 text-champagne" /> Filters
            </h3>
            <button 
              onClick={clearAllFilters}
              className="text-[9px] font-bold text-champagne hover:text-platinum uppercase tracking-widest"
            >
              Clear All
            </button>
          </div>

          {/* Category Filter */}
          <div className="border-t border-white/5 pt-6">
            <h4 className="font-sans text-[10px] font-bold uppercase tracking-widest text-platinum mb-4">Category</h4>
            <div className="space-y-2">
              <button 
                onClick={() => setSelectedCategory('All')}
                className={`w-full text-left text-xs py-1 transition-colors ${
                  selectedCategory === 'All' ? 'text-champagne font-semibold' : 'text-titanium hover:text-platinum'
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left text-xs py-1 transition-colors ${
                    selectedCategory === cat ? 'text-champagne font-semibold' : 'text-titanium hover:text-platinum'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="border-t border-white/5 pt-6">
            <h4 className="font-sans text-[10px] font-bold uppercase tracking-widest text-platinum mb-4">Price Cap</h4>
            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                className="w-full accent-champagne"
              />
              <div className="flex items-center justify-between text-xs font-sans text-titanium font-medium">
                <span>$0</span>
                <span className="text-champagne font-semibold">${priceRange.max.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Material Filter */}
          <div className="border-t border-white/5 pt-6">
            <h4 className="font-sans text-[10px] font-bold uppercase tracking-widest text-platinum mb-4">Material</h4>
            <div className="space-y-2">
              {['All', '18K Yellow Gold', '14K Rose Gold', 'Platinum 950'].map((mat) => (
                <button
                  key={mat}
                  onClick={() => setSelectedMaterial(mat)}
                  className={`w-full text-left text-xs py-1 transition-colors ${
                    selectedMaterial === mat ? 'text-champagne font-semibold' : 'text-titanium hover:text-platinum'
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          {/* Rating filter */}
          <div className="border-t border-white/5 pt-6">
            <h4 className="font-sans text-[10px] font-bold uppercase tracking-widest text-platinum mb-4">Min Rating</h4>
            <div className="space-y-2">
              {['All', '5', '4', '3'].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setSelectedRating(rate)}
                  className={`w-full text-left text-xs py-1 transition-colors ${
                    selectedRating === rate ? 'text-champagne font-semibold' : 'text-titanium hover:text-platinum'
                  }`}
                >
                  {rate === 'All' ? 'All Ratings' : `${rate} Stars & Up`}
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* Products Grid & Toolbar (Right side) */}
        <div className="flex-grow">
          
          {/* Sorting / Mobile Filter Toggle */}
          <div className="flex justify-between items-center mb-6 glass border border-white/5 rounded-xl p-3.5 shadow-sm bg-obsidian/45">
            <button 
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden flex items-center gap-2 text-xs font-semibold text-platinum"
            >
              <Filter className="w-4 h-4 text-champagne" /> Filters
            </button>

            <span className="hidden md:inline text-xs text-titanium font-medium font-sans">
              Showing {products.length} precious pieces
            </span>

            {/* Sort options */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-titanium hidden sm:inline">Sort by</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slateSurface border border-white/5 rounded-lg text-xs p-2 text-platinum focus:outline-none focus:ring-1 focus:ring-champagne/45 premium-transition"
              >
                <option value="newest">New Arrivals</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Product Cards Container */}
          {loading ? (
            <ProductGridSkeleton count={6} />
          ) : products.length === 0 ? (
            <div className="text-center py-24 glass border border-white/5 rounded-xl p-12 space-y-4 bg-obsidian/30">
              <span className="material-symbols-outlined text-6xl text-titanium/30">info</span>
              <h3 className="font-serif text-lg text-platinum font-normal tracking-wider uppercase">No Jewels Found</h3>
              <p className="text-xs text-titanium max-w-xs mx-auto">No products matched your active filters. Try resetting search criteria or clearing filter nodes.</p>
              <button 
                onClick={clearAllFilters}
                className="bg-platinum hover:bg-champagne text-obsidian py-3 px-6 text-xs uppercase tracking-widest font-bold font-sans rounded-lg premium-transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {products.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Mobile Filters Drawer Panel */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[100] flex justify-end md:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)} />
          <div className="relative w-80 bg-obsidian/95 backdrop-blur-md border-l border-white/5 h-full p-6 space-y-8 overflow-y-auto flex flex-col justify-between z-10 animate-slide-up shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-serif text-lg text-platinum font-normal tracking-wide uppercase">Filters</h3>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X className="w-5 h-5 text-platinum" />
                </button>
              </div>

              {/* Mobile filter nodes */}
              <div className="space-y-6">
                
                {/* Category */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-platinum mb-3 font-sans">Category</h4>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setSelectedCategory('All')}
                      className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold border rounded-lg transition-colors ${
                        selectedCategory === 'All' ? 'bg-champagne text-obsidian border-champagne' : 'bg-slateSurface border-white/5 text-titanium'
                      }`}
                    >
                      All
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold border rounded-lg transition-colors ${
                          selectedCategory === cat ? 'bg-champagne text-obsidian border-champagne' : 'bg-slateSurface border-white/5 text-titanium'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Cap */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-platinum mb-3 font-sans">Price Cap</h4>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                    className="w-full accent-champagne"
                  />
                  <div className="flex justify-between text-xs text-titanium mt-1">
                    <span>$0</span>
                    <span className="text-champagne font-bold">${priceRange.max.toLocaleString()}</span>
                  </div>
                </div>

                {/* Metal Material */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-platinum mb-3 font-sans">Material</h4>
                  <div className="flex flex-wrap gap-2">
                    {['All', '18K Yellow Gold', '14K Rose Gold', 'Platinum 950'].map((mat) => (
                      <button
                        key={mat}
                        onClick={() => setSelectedMaterial(mat)}
                        className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold border rounded-lg transition-colors ${
                          selectedMaterial === mat ? 'bg-champagne text-obsidian border-champagne' : 'bg-slateSurface border-white/5 text-titanium'
                        }`}
                      >
                        {mat}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t border-white/5">
              <button 
                onClick={clearAllFilters}
                className="flex-grow border border-white/5 py-3 text-xs uppercase font-semibold font-sans hover:bg-white/5 text-platinum rounded-lg premium-transition"
              >
                Clear
              </button>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="flex-grow bg-platinum hover:bg-champagne text-obsidian py-3 text-xs uppercase font-semibold font-sans rounded-lg premium-transition"
              >
                Apply
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Shop;
