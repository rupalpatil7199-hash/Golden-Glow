import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { useCart } from '../../context/CartContext';
import { Heart, ShoppingBag } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { wishlist, toggleWishlist } = useShop();
  const { addToCart } = useCart();
  
  const isFavorite = wishlist.includes(product._id);
  
  const hasDiscount = product.discount > 0;
  const discountedPrice = product.price * (1 - (product.discount || 0) / 100);

  return (
    <div className="group relative flex flex-col bg-transparent overflow-hidden hover:-translate-y-1.5 premium-transition duration-500">
      
      {/* Product Image Panel */}
      <div className="aspect-[3/4] relative bg-slateSurface rounded-xl overflow-hidden border border-white/5">
        <Link to={`/product/${product._id}`}>
          <img 
            src={product.images[0]} 
            alt={product.title} 
            className="w-full h-full object-cover premium-transition duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Favorite Icon Overlay */}
        <button 
          onClick={() => toggleWishlist(product._id)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-platinum hover:text-champagne shadow-glass hover:scale-110 premium-transition duration-300"
        >
          <Heart className={`w-4 h-4 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-platinum'}`} />
        </button>

        {/* Discount Badge */}
        {hasDiscount && (
          <span className="absolute top-4 left-4 bg-champagne text-obsidian text-[9px] tracking-wider uppercase font-bold font-sans py-1 px-3 rounded shadow-sm z-10">
            -{product.discount}%
          </span>
        )}

        {/* Stock Alert Badge */}
        {product.stock <= 0 ? (
          <span className="absolute bottom-4 left-4 glass border border-white/10 text-red-400 text-[8px] tracking-widest uppercase font-bold font-sans py-1.5 px-3 z-10 rounded-lg">
            Sold out
          </span>
        ) : product.stock <= 3 ? (
          <span className="absolute bottom-4 left-4 glass border border-white/10 text-champagne text-[8px] tracking-widest uppercase font-bold font-sans py-1.5 px-3 z-10 rounded-lg">
            Only {product.stock} left
          </span>
        ) : null}

        {/* Quick Add Overlay */}
        {product.stock > 0 && (
          <button 
            onClick={() => addToCart(product, 1)}
            className="absolute bottom-4 left-4 right-4 z-20 glass py-3 font-sans text-[10px] tracking-[0.2em] font-semibold text-platinum uppercase rounded-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-platinum hover:text-obsidian premium-transition duration-500 shadow-md border border-white/10"
          >
            QUICK ADD
          </button>
        )}
      </div>

      {/* Info Details */}
      <div className="py-4 flex flex-col flex-grow">
        <span className="text-[9px] tracking-[0.25em] text-titanium font-semibold uppercase font-sans mb-1.5">
          {product.category}
        </span>
        <Link 
          to={`/product/${product._id}`}
          className="font-serif text-sm font-normal text-platinum hover:text-champagne transition-colors truncate mb-1.5 block"
        >
          {product.title}
        </Link>
        <div className="flex items-center gap-2 mt-auto">
          {hasDiscount ? (
            <>
              <span className="text-sm font-semibold text-champagne font-sans">${discountedPrice.toLocaleString()}</span>
              <span className="text-xs text-titanium line-through font-sans">${product.price.toLocaleString()}</span>
            </>
          ) : (
            <span className="text-sm font-semibold text-champagne font-sans">${product.price.toLocaleString()}</span>
          )}
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
