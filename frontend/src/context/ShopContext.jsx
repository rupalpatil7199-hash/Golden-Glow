import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthBridge } from './AuthContext';
import { useNotification } from './NotificationContext';

const ShopContext = createContext(null);

// Static mock fallback data
const mockProducts = [
  {
    _id: 'prod_1',
    title: 'Geometric Signet Ring',
    description: 'A stunning gold signet ring with a minimalist geometric design, crafted in solid 18K Yellow Gold. Features clean architecture and micro-polished lines reflecting a warm, golden glow.',
    price: 1250,
    discount: 10,
    images: ['https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80'],
    category: 'Rings',
    material: '18K Yellow Gold',
    weight: '5.2 grams',
    stoneInfo: 'None',
    sku: 'GG-RG-001',
    stock: 12,
    rating: 4.8,
    reviewsCount: 16,
    isFeatured: true,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true,
    occasion: ['Daily Wear']
  },
  {
    _id: 'prod_2',
    title: 'Floating Pearl Choker',
    description: 'A delicate gold chain necklace holding a single, premium saltwater Akoya pearl. The pearls luster matches perfectly with the hand-drawn gold chain.',
    price: 890,
    discount: 0,
    images: ['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80'],
    category: 'Necklaces',
    material: '14K Rose Gold',
    weight: '3.8 grams',
    stoneInfo: '8.5mm Akoya Saltwater Pearl',
    sku: 'GG-NK-002',
    stock: 8,
    rating: 4.9,
    reviewsCount: 22,
    isFeatured: true,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: true,
    occasion: ['Wedding']
  },
  {
    _id: 'prod_3',
    title: 'Filigree Gold Hoops',
    description: 'Artisanal hand-crafted hoop earrings displaying intricate gold filigree pattern lines. Delicate circular curves that highlight gold craftsmanship.',
    price: 1400,
    discount: 15,
    images: ['https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80'],
    category: 'Earrings',
    material: '18K Yellow Gold',
    weight: '6.5 grams',
    stoneInfo: 'None',
    sku: 'GG-ER-003',
    stock: 5,
    rating: 4.7,
    reviewsCount: 14,
    isFeatured: false,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    occasion: ['Anniversary']
  },
  {
    _id: 'prod_4',
    title: 'Architectural Gold Bangle',
    description: 'Sleek, heavy, modern gold bangle featuring a hidden mechanical clasp lock. Structured with a flat mirror finish that captures reflections beautifully.',
    price: 2100,
    discount: 5,
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80'],
    category: 'Bangles',
    material: '18K Yellow Gold',
    weight: '12.4 grams',
    stoneInfo: 'None',
    sku: 'GG-BR-004',
    stock: 2,
    rating: 5.0,
    reviewsCount: 8,
    isFeatured: true,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: false,
    occasion: ['Wedding']
  },
  {
    _id: 'prod_5',
    title: 'Diamond Starlight Studs',
    description: 'Breathtaking 1 carat round-cut laboratory diamonds mounted in platinum prongs. Designed to reflect light with spectacular fire and scintillation.',
    price: 3500,
    discount: 0,
    images: ['https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80'],
    category: 'Earrings',
    material: 'Platinum 950',
    weight: '3.1 grams',
    stoneInfo: '1.0 ct VVS1 Ideal Cut Round Diamond',
    sku: 'GG-ER-005',
    stock: 4,
    rating: 4.9,
    reviewsCount: 31,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: true,
    occasion: ['Anniversary']
  },
  {
    _id: 'prod_6',
    title: 'Solitaire Promise Ring',
    description: 'An iconic symbol of devotion. High-set 0.75 ct cushion cut diamond nestled on a thin band of polished 18K Yellow Gold.',
    price: 2800,
    discount: 0,
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'],
    category: 'Rings',
    material: '18K Yellow Gold',
    weight: '4.2 grams',
    stoneInfo: '0.75 ct Cushion Cut Diamond VVS2',
    sku: 'GG-RG-006',
    stock: 6,
    rating: 4.8,
    reviewsCount: 19,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    occasion: ['Anniversary']
  },
  {
    _id: 'prod_7',
    title: 'Minimalist Chain Bracelet',
    description: 'A classic chain bracelet featuring delicate interlocking links in solid 18K Yellow Gold. Designed for simple elegance.',
    price: 950,
    discount: 0,
    images: ['https://images.unsplash.com/photo-1667013829921-b1c1719a0cfa?auto=format&fit=crop&w=800&q=80'],
    category: 'Bracelets',
    material: '18K Yellow Gold',
    weight: '4.8 grams',
    stoneInfo: 'None',
    sku: 'GG-BR-007',
    stock: 15,
    rating: 4.8,
    reviewsCount: 10,
    isFeatured: true,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true,
    occasion: ['Daily Wear']
  }
];

export const ShopProvider = ({ children }) => {
  const { user, getToken } = useAuthBridge();
  const { showSuccess, showError } = useNotification();

  const [products, setProducts] = useState(mockProducts);
  const [categories, setCategories] = useState(['Rings', 'Earrings', 'Necklaces', 'Bracelets', 'Bangles']);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  
  // Filtering & Search states
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMaterial, setSelectedMaterial] = useState('All');
  const [selectedOccasion, setSelectedOccasion] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [selectedRating, setSelectedRating] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Load products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const minPriceQuery = priceRange.min > 0 ? `&priceMin=${priceRange.min}` : '';
      const maxPriceQuery = priceRange.max < 10000 ? `&priceMax=${priceRange.max}` : '';
      const categoryQuery = selectedCategory !== 'All' ? `&category=${selectedCategory}` : '';
      const materialQuery = selectedMaterial !== 'All' ? `&material=${selectedMaterial}` : '';
      const occasionQuery = selectedOccasion !== 'All' ? `&occasion=${selectedOccasion}` : '';
      const ratingQuery = selectedRating !== 'All' ? `&rating=${selectedRating}` : '';
      const searchQuery = search ? `&search=${search}` : '';

      const res = await fetch(`/api/products?sort=${sortBy}${searchQuery}${categoryQuery}${materialQuery}${occasionQuery}${ratingQuery}${minPriceQuery}${maxPriceQuery}`);
      const data = await res.json();
      if (data.success && data.products.length > 0) {
        setProducts(data.products);
      } else {
        // Apply frontend filter over mock products if DB fetch returns nothing
        applyLocalFilters();
      }
    } catch (err) {
      console.warn('Backend products API offline, filtering local mock database.');
      applyLocalFilters();
    } finally {
      setLoading(false);
    }
  };

  const applyLocalFilters = () => {
    let filtered = [...mockProducts];
    if (search) {
      filtered = filtered.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    if (selectedMaterial !== 'All') {
      filtered = filtered.filter(p => p.material.toLowerCase().includes(selectedMaterial.toLowerCase()));
    }
    if (priceRange.min > 0) {
      filtered = filtered.filter(p => p.price >= priceRange.min);
    }
    if (priceRange.max < 10000) {
      filtered = filtered.filter(p => p.price <= priceRange.max);
    }
    if (selectedRating !== 'All') {
      filtered = filtered.filter(p => p.rating >= Number(selectedRating));
    }

    // Sort
    if (sortBy === 'price_asc') filtered.sort((a,b) => a.price - b.price);
    else if (sortBy === 'price_desc') filtered.sort((a,b) => b.price - a.price);
    else if (sortBy === 'rating') filtered.sort((a,b) => b.rating - a.rating);

    setProducts(filtered);
  };

  useEffect(() => {
    fetchProducts();
  }, [search, selectedCategory, selectedMaterial, selectedOccasion, priceRange, selectedRating, sortBy]);

  // Load wishlist
  const fetchWishlist = async () => {
    if (!user) return;
    try {
      const token = await getToken();
      const res = await fetch('/api/users/wishlist', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setWishlist(data.wishlist.map(p => p._id));
      }
    } catch (err) {
      console.warn('Backend wishlist fetch failed, staying local.');
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  // Toggle wishlist item
  const toggleWishlist = async (productId) => {
    if (!user) {
      showError('Please sign in to add items to your wishlist.');
      return;
    }

    // Optimistic UI update
    const isFav = wishlist.includes(productId);
    if (isFav) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showSuccess('Removed from wishlist.');
    } else {
      setWishlist(prev => [...prev, productId]);
      showSuccess('Added to wishlist.');
    }

    try {
      const token = await getToken();
      await fetch('/api/users/wishlist/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId })
      });
    } catch (err) {
      console.warn('Failed to sync wishlist with DB');
    }
  };

  return (
    <ShopContext.Provider value={{
      products,
      categories,
      loading,
      wishlist,
      toggleWishlist,
      search,
      setSearch,
      selectedCategory,
      setSelectedCategory,
      selectedMaterial,
      setSelectedMaterial,
      selectedOccasion,
      setSelectedOccasion,
      priceRange,
      setPriceRange,
      selectedRating,
      setSelectedRating,
      sortBy,
      setSortBy
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within ShopProvider');
  }
  return context;
};
