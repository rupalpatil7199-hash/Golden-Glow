import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { useCart } from '../../context/CartContext';
import { useAuthBridge } from '../../context/AuthContext';
import ProductCard from '../../components/shop/ProductCard';
import { Star, ShieldCheck, Truck, RefreshCw, Heart, Plus, Minus, ArrowLeft } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, wishlist, toggleWishlist } = useShop();
  const { addToCart } = useCart();
  const { user } = useAuthBridge();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  
  // Review inputs
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  // Fetch product details
  useEffect(() => {
    const matched = products.find(p => p._id === id);
    if (matched) {
      setProduct(matched);
      setSelectedImage(matched.images[0]);
      
      // Load mock reviews
      setReviews([
        { id: '1', userName: 'Diana Prince', rating: 5, comment: 'Perfect shine! Wore it for my gala event, absolute showstopper.', createdAt: '2026-06-12' },
        { id: '2', userName: 'Bruce Wayne', rating: 4, comment: 'Clean architectural lines. The solid metal weight feels premium.', createdAt: '2026-05-30' }
      ]);
    }
  }, [id, products]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 pt-40 pb-24 text-center bg-obsidian min-h-screen text-platinum animate-fade-in">
        <p className="text-sm text-titanium">Loading atelier piece details...</p>
      </div>
    );
  }

  const isFavorite = wishlist.includes(product._id);
  const discountPrice = product.price * (1 - (product.discount || 0) / 100);

  // Zoom magnifier effect
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left - window.pageXOffset) / width) * 100;
    const y = ((e.pageY - top - window.pageYOffset) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${selectedImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '200%'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  // Submit mock review
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to submit a review.');
      return;
    }
    if (newComment.trim()) {
      const added = {
        id: Date.now().toString(),
        userName: user.fullName || 'Anonymous User',
        rating: newRating,
        comment: newComment.trim(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      setReviews(prev => [added, ...prev]);
      setNewComment('');
    }
  };

  // Find similar products
  const similarProducts = products
    .filter(p => p.category === product.category && p._id !== product._id)
    .slice(0, 4);

  return (
    <div className="w-full bg-obsidian min-h-screen text-platinum pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 font-sans">
        
        {/* Back button link */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs text-titanium hover:text-platinum uppercase tracking-widest font-semibold mb-8 font-sans transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO CATALOG
        </button>

        {/* Main Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          
          {/* Left Side: Images Gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] relative bg-slateSurface rounded-xl overflow-hidden group cursor-crosshair border border-white/5">
              <img 
                src={selectedImage} 
                alt={product.title}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="w-full h-full object-cover" 
              />
              {/* Zoom Screen Overlay */}
              <div 
                style={zoomStyle}
                className="absolute inset-0 pointer-events-none border border-white/10 shadow-inner bg-no-repeat rounded-xl"
              />
            </div>

            {/* Thumbnail row */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`w-20 h-24 rounded-lg overflow-hidden bg-slateSurface border-2 premium-transition ${
                      selectedImage === imgUrl ? 'border-champagne' : 'border-transparent'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Specifications & Order Actions */}
          <div className="space-y-6">
            <div className="border-b border-white/5 pb-6 space-y-2">
              <span className="text-xs tracking-[0.2em] font-semibold text-champagne uppercase block">{product.category}</span>
              <h2 className="font-serif text-3xl font-normal text-platinum tracking-wide uppercase">{product.title}</h2>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex gap-1 text-champagne items-center">
                  <Star className="w-4 h-4 fill-champagne" />
                  <span className="text-xs font-semibold font-sans text-platinum ml-1">{product.rating}</span>
                </div>
                <span className="text-xs text-titanium font-medium font-sans">({reviews.length} Customer Reviews)</span>
                <span className="text-xs text-titanium font-medium font-sans">| SKU: {product.sku}</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-4">
              {product.discount > 0 ? (
                <>
                  <span className="text-2xl font-semibold text-champagne font-sans">${discountPrice.toLocaleString()}</span>
                  <span className="text-sm text-titanium line-through font-sans">${product.price.toLocaleString()}</span>
                </>
              ) : (
                <span className="text-2xl font-semibold text-champagne font-sans">${product.price.toLocaleString()}</span>
              )}
            </div>

            <p className="text-sm text-titanium leading-relaxed font-sans">{product.description}</p>

            {/* Specs Table - Upgraded to Glassmorphism */}
            <div className="glass rounded-xl p-6 border border-white/5 space-y-3 shadow-sm">
              <div className="flex justify-between text-xs py-1.5 border-b border-white/5">
                <span className="text-titanium font-medium font-sans">Metal Material</span>
                <span className="font-semibold text-platinum font-sans">{product.material}</span>
              </div>
              <div className="flex justify-between text-xs py-1.5 border-b border-white/5">
                <span className="text-titanium font-medium font-sans">Metal Weight</span>
                <span className="font-semibold text-platinum font-sans">{product.weight}</span>
              </div>
              <div className="flex justify-between text-xs py-1.5">
                <span className="text-titanium font-medium font-sans">Stone Details</span>
                <span className="font-semibold text-platinum font-sans">{product.stoneInfo}</span>
              </div>
            </div>

            {/* Action forms */}
            {product.stock > 0 ? (
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-6">
                  
                  {/* Quantity */}
                  <div className="flex items-center border border-white/5 rounded-lg bg-slateSurface">
                    <button 
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="p-2 px-3 hover:bg-white/5 premium-transition rounded-l-lg"
                    >
                      <Minus className="w-4 h-4 text-platinum" />
                    </button>
                    <span className="text-sm font-semibold font-sans w-8 text-center text-platinum">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="p-2 px-3 hover:bg-white/5 premium-transition rounded-r-lg"
                    >
                      <Plus className="w-4 h-4 text-platinum" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button 
                    onClick={() => addToCart(product, quantity)}
                    className="flex-grow bg-platinum hover:bg-champagne text-obsidian py-4 rounded-lg text-xs font-bold tracking-[0.2em] uppercase premium-transition duration-500 shadow-lg"
                  >
                    ADD TO ATELIER BAG
                  </button>
                </div>

                {/* Wishlist toggle */}
                <button 
                  onClick={() => toggleWishlist(product._id)}
                  className={`w-full border py-3 rounded-lg text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 premium-transition duration-500 ${
                    isFavorite 
                      ? 'border-red-950 bg-red-950/20 text-red-400' 
                      : 'border-white/10 hover:bg-white/5 text-platinum'
                  }`}
                >
                  <Heart className={`w-4 h-4 premium-transition duration-350 ${isFavorite ? 'fill-red-400' : 'text-platinum'}`} />
                  {isFavorite ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
                </button>
              </div>
            ) : (
              <div className="bg-red-950/40 text-red-400 p-4 rounded-lg text-xs font-semibold uppercase tracking-wider text-center border border-red-950/50">
                Piece Currently Sold Out
              </div>
            )}

            {/* Trust assurances - Upgraded to elegant inline glass badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5 text-center">
              <div className="flex flex-col items-center gap-2 p-3 glass rounded-xl border border-white/5 premium-transition hover:border-white/10 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-champagne" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-platinum font-sans">Lifetime Care</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 glass rounded-xl border border-white/5 premium-transition hover:border-white/10 shadow-sm">
                <Truck className="w-5 h-5 text-champagne" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-platinum font-sans">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 glass rounded-xl border border-white/5 premium-transition hover:border-white/10 shadow-sm">
                <RefreshCw className="w-5 h-5 text-champagne" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-platinum font-sans">30-Day Returns</span>
              </div>
            </div>

          </div>
        </div>

        {/* Reviews Feed Section */}
        <section className="border-t border-white/5 pt-16 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Feedback items */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="font-serif text-lg font-normal tracking-wider uppercase text-platinum mb-6">Verified Client Feedback</h3>
              
              {reviews.length === 0 ? (
                <p className="text-xs text-titanium">No reviews yet. Be the first to share your experience with this piece.</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-6 glass rounded-xl border border-white/5 space-y-3 hover:border-white/10 premium-transition">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-platinum font-sans">{rev.userName}</span>
                        <span className="text-[10px] text-titanium font-sans">{rev.createdAt}</span>
                      </div>
                      <div className="flex gap-1 text-champagne">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-champagne text-champagne' : 'opacity-10'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-xs text-titanium leading-relaxed font-sans">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Leave a review */}
            <div className="glass rounded-xl p-6 border border-white/5 h-fit shadow-luxury">
              <h4 className="font-serif text-sm font-normal tracking-wide uppercase text-platinum mb-4">Leave Feedback</h4>
              {user ? (
                <form onSubmit={handleReviewSubmit} className="space-y-4 font-sans">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-titanium mb-2">Rating</label>
                    <select 
                      value={newRating} 
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="bg-slateSurface border border-white/5 rounded-lg text-xs p-2.5 w-full text-platinum focus:outline-none focus:ring-1 focus:ring-champagne/45 premium-transition"
                    >
                      <option value="5">5 Stars (Excellent)</option>
                      <option value="4">4 Stars (Good)</option>
                      <option value="3">3 Stars (Average)</option>
                      <option value="2">2 Stars (Poor)</option>
                      <option value="1">1 Star (Terrible)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-titanium mb-2">Comment</label>
                    <textarea
                      rows="3"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Describe your experience with this jewelry piece..."
                      className="bg-slateSurface border border-white/5 text-xs p-3 rounded-lg w-full text-platinum focus:outline-none focus:ring-1 focus:ring-champagne/45 font-sans premium-transition placeholder-titanium/30"
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-platinum hover:bg-champagne text-obsidian py-3 text-xs uppercase font-bold tracking-widest font-sans premium-transition duration-300 rounded-lg shadow-sm"
                  >
                    Submit Review
                  </button>
                </form>
              ) : (
                <p className="text-xs text-titanium font-sans">Please log in to submit a verification review.</p>
              )}
            </div>

          </div>
        </section>

        {/* Similar products cross-selling */}
        {similarProducts.length > 0 && (
          <section className="border-t border-white/5 pt-16">
            <h3 className="font-serif text-lg font-normal tracking-wider uppercase text-platinum mb-8">You May Also Admire</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {similarProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default ProductDetails;
