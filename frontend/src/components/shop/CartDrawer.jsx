import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { X, Trash2, Gift, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    tax,
    shippingFee,
    total,
    couponCode,
    applyCoupon,
    removeCoupon,
    giftWrap,
    setGiftWrap,
    giftMessage,
    setGiftMessage
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [showGiftInput, setShowGiftInput] = useState(false);

  if (!isOpen) return null;

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyCoupon(promoInput.trim());
      setPromoInput('');
    }
  };

  const handleCheckoutClick = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop blur overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer slide panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-slide-up z-10 border-l border-surface-container">
        
        {/* Header */}
        <div className="p-6 border-b border-surface-container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary-glow" />
            <h3 className="font-serif text-lg font-bold">Your Atelier Bag</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface hover:bg-surface-container flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-luxuryBlack" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 hide-scrollbar">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-20">
              <span className="material-symbols-outlined text-surface-container-high text-6xl">shopping_bag</span>
              <p className="font-serif text-md font-semibold text-luxuryBlack">Your bag is empty</p>
              <p className="text-xs text-secondary max-w-xs">Explore our premium collections and add brilliant items to your bag.</p>
              <button 
                onClick={() => { onClose(); navigate('/shop'); }}
                className="mt-4 bg-luxuryBlack text-white hover:bg-primary-glow px-6 py-3 text-xs tracking-wider uppercase font-semibold transition-colors rounded"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => {
                const discPrice = item.product.price * (1 - (item.product.discount || 0) / 100);
                return (
                  <div key={item.product._id} className="flex gap-4 border-b border-surface-container/60 pb-4">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.title} 
                      className="w-20 h-24 object-cover bg-surface-container rounded-lg"
                    />
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif text-sm font-semibold text-luxuryBlack line-clamp-1">{item.product.title}</h4>
                          <button 
                            onClick={() => removeFromCart(item.product._id)}
                            className="text-secondary hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[10px] text-secondary mt-1">{item.product.material}</p>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-surface-container rounded-lg bg-surface">
                          <button 
                            onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-1 px-2 hover:bg-surface-container disabled:opacity-40"
                          >
                            <Minus className="w-3 h-3 text-luxuryBlack" />
                          </button>
                          <span className="text-xs px-2 font-semibold font-sans">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                            className="p-1 px-2 hover:bg-surface-container"
                          >
                            <Plus className="w-3 h-3 text-luxuryBlack" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-sm font-semibold text-primary font-sans">
                          ${(discPrice * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="space-y-4 pt-4">
              
              {/* Promo validation */}
              <form onSubmit={handlePromoSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="COUPON CODE"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="border border-surface-container text-xs p-2 rounded flex-grow focus:outline-none focus:ring-1 focus:ring-primary-glow font-sans"
                  disabled={!!couponCode}
                />
                {couponCode ? (
                  <button 
                    type="button"
                    onClick={removeCoupon}
                    className="border border-red-200 text-red-600 px-4 py-2 text-xs rounded hover:bg-red-50"
                  >
                    Remove
                  </button>
                ) : (
                  <button 
                    type="submit"
                    className="bg-luxuryBlack text-white hover:bg-primary-glow px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded"
                  >
                    Apply
                  </button>
                )}
              </form>
              {couponCode && (
                <p className="text-[11px] text-primary-glow font-semibold font-sans">✓ Code {couponCode} applied successfully!</p>
              )}

              {/* Gift wrap option */}
              <div className="border-t border-surface-container/60 pt-4">
                <button 
                  onClick={() => setShowGiftInput(!showGiftInput)}
                  className="flex items-center gap-2 text-xs text-secondary hover:text-luxuryBlack font-medium transition-colors"
                >
                  <Gift className="w-4 h-4 text-primary-glow" /> 
                  <span>Add Premium Gift Wrapping? (+$15)</span>
                </button>
                
                {showGiftInput && (
                  <div className="mt-2 space-y-2 animate-scale-up">
                    <label className="flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={giftWrap}
                        onChange={(e) => setGiftWrap(e.target.checked)}
                        className="rounded border-gray-300 text-primary-glow focus:ring-primary-glow"
                      />
                      <span>Select Gift Wrap Packaging</span>
                    </label>
                    <textarea
                      placeholder="Add a handwritten gift message..."
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      className="border border-surface-container text-xs p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-primary-glow font-sans h-16"
                    />
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        {/* Footer Totals */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-surface-container bg-surface space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-secondary">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-xs text-primary-glow font-semibold">
                  <span>Discount</span>
                  <span>-${discount.toLocaleString()}</span>
                </div>
              )}
              {giftWrap && (
                <div className="flex justify-between text-xs text-secondary">
                  <span>Gift Wrapping</span>
                  <span>+$15.00</span>
                </div>
              )}
              <div className="flex justify-between text-xs text-secondary">
                <span>Estimated Shipping</span>
                <span>{shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-xs text-secondary">
                <span>Estimated Tax (8%)</span>
                <span>${tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold border-t border-surface-container/60 pt-2 text-luxuryBlack">
                <span>Order Total</span>
                <span className="text-primary font-sans">${total.toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckoutClick}
              className="w-full bg-luxuryBlack hover:bg-primary-glow text-white py-4 rounded-lg text-xs font-semibold tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 shadow-luxury"
            >
              PROCEED TO ATELIER CHECKOUT <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartDrawer;
