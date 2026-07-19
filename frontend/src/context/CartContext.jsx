import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthBridge } from './AuthContext';
import { useNotification } from './NotificationContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user, getToken } = useAuthBridge();
  const { showSuccess, showError } = useNotification();

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('goldenglow_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [savedForLater, setSavedForLater] = useState(() => {
    const saved = localStorage.getItem('goldenglow_saved');
    return saved ? JSON.parse(saved) : [];
  });

  // Coupons
  const [couponCode, setCouponCode] = useState('');
  const [discountInfo, setDiscountInfo] = useState(null);

  // Gift wrap
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');

  // Persist cart to local storage & sync with DB
  useEffect(() => {
    localStorage.setItem('goldenglow_cart', JSON.stringify(cartItems));
    syncCartWithBackend();
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('goldenglow_saved', JSON.stringify(savedForLater));
  }, [savedForLater]);

  const syncCartWithBackend = async () => {
    if (!user) return;
    try {
      const token = await getToken();
      const items = cartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      }));
      await fetch('/api/cart/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ items })
      });
    } catch (err) {
      console.warn('Backend cart sync offline.');
    }
  };

  // Add to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product._id === product._id);
      if (existing) {
        showSuccess(`Increased ${product.title} quantity in cart.`);
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      showSuccess(`Added ${product.title} to cart.`);
      return [...prev, { product, quantity }];
    });
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product._id !== productId));
    showSuccess('Item removed from cart.');
  };

  // Update quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    setCouponCode('');
    setDiscountInfo(null);
    setGiftWrap(false);
    setGiftMessage('');
  };

  // Save for later
  const saveForLater = (product) => {
    removeFromCart(product._id);
    setSavedForLater((prev) => {
      if (prev.find(item => item._id === product._id)) return prev;
      return [...prev, product];
    });
    showSuccess('Moved to Saved for Later.');
  };

  // Move back to cart
  const moveToCart = (product) => {
    setSavedForLater((prev) => prev.filter(item => item._id !== product._id));
    addToCart(product, 1);
  };

  // Remove from saved
  const removeSaved = (productId) => {
    setSavedForLater(prev => prev.filter(item => item._id !== productId));
    showSuccess('Removed from saved items.');
  };

  // Validate coupon
  const applyCoupon = async (code) => {
    if (!code) return;
    const cleanCode = code.toUpperCase().trim();
    const cartTotal = subtotal;

    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: cleanCode, cartTotal })
      });
      const data = await res.json();
      
      if (data.success) {
        setDiscountInfo(data.coupon);
        setCouponCode(cleanCode);
        showSuccess(data.message);
      } else {
        showError(data.message);
      }
    } catch (err) {
      // Local mockup coupon logic if backend is offline
      if (cleanCode === 'GLOW10' && cartTotal >= 100) {
        setDiscountInfo({ code: 'GLOW10', discountType: 'percentage', discountAmount: 10 });
        setCouponCode('GLOW10');
        showSuccess('Coupon GLOW10 applied (10% discount).');
      } else if (cleanCode === 'ETERNAL20' && cartTotal >= 500) {
        setDiscountInfo({ code: 'ETERNAL20', discountType: 'percentage', discountAmount: 20 });
        setCouponCode('ETERNAL20');
        showSuccess('Coupon ETERNAL20 applied (20% discount).');
      } else {
        showError('Invalid coupon code or minimum purchase amount not met.');
      }
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountInfo(null);
    showSuccess('Coupon removed.');
  };

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => {
    const discountedPrice = item.product.price * (1 - (item.product.discount || 0) / 100);
    return sum + discountedPrice * item.quantity;
  }, 0);

  const discount = discountInfo
    ? discountInfo.discountType === 'percentage'
      ? subtotal * (discountInfo.discountAmount / 100)
      : discountInfo.discountAmount
    : 0;

  const giftWrapFee = giftWrap ? 15 : 0;
  const shippingFee = subtotal > 1500 || subtotal === 0 ? 0 : 25; // Free shipping above $1500
  const tax = (subtotal - discount) * 0.08; // 8% sales tax estimate
  const total = subtotal - discount + giftWrapFee + shippingFee + tax;

  return (
    <CartContext.Provider value={{
      cartItems,
      savedForLater,
      couponCode,
      discountInfo,
      giftWrap,
      setGiftWrap,
      giftMessage,
      setGiftMessage,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      saveForLater,
      moveToCart,
      removeSaved,
      applyCoupon,
      removeCoupon,
      subtotal,
      discount,
      giftWrapFee,
      shippingFee,
      tax,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
