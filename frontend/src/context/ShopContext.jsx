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
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDPlTKlFbtjogeBjvDmrUeyv6a_a5DpKMSR7Gh4Wc8d2cR6TYC1R19ZcDqBkvAyE4ktlJ3iM69ko3G8DhC8d_ZLuzNZ4zTTdGlp7zSAy-PtGKqHAdoBlRLpdxziPKxUWQk8YFk_DhjmqdADcZG4B2W-f9WSZPotf00wVqz0hKbknqbkgIQkLTRqq6ge3ZHwuLb6V9s27iizwn-hXWzJleA1rhuvwTLtH4EzWJxDs3bPv55KLcxoPVDC6kCrvVsmCGmOocGxWtPwwig'],
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
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCWLBl2l6Tz-HYvqOA_Bo3lYks5rPPUfQOEinnEj9cQDrGDhCUJKGzGnowSImR1R7E7V1o4BcODUqSGo6oR5gqQLnUB-SBtpNvnZsDGlbIoFxfq6YIMPgyGkcRV-ZxWj4T0NDmIa8fo0BVcs8u8AcbKPYfeI-Hrc01vPBaJnVFNQcZSod6TPi-5PviNZOlcXXrhq-U3ShyXkcDVqSECsaDe4pgPy58fufjZlhRpB40V1a3JF3bu00CuGrEnt1zaMpPdUKDFyRK6llY'],
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
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAlhgs2Cb6GAs-lnJ5MXEykScInAFmBtVQbVaQrITHVcTuBH9nQwL8_Tt3eBe4qJkd3o2yEDUGXPLZPybxFUO4flX6mn2Mv7Rqi7nSwo14pUrbgI-7TvWbaMs4z94ejnBS-QylFuVXJcr-RL5-q0OXQs7buBPcbn_OAF3y4FZYC4hiHU4OypSWEKqAp1XlS4hYx_WkG3-eneKYSY8F5p_KY2kieKDajBlL7rFhclV5ZmmfgzlFyHVP00z4hYjHTuzwihjk-OOlCnqA'],
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
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBb5TFOhzutiWC1yEPv7IwIgA8Mrfr5MQqk59Oh26IMFn3n4_jgn5YNwgmEeoBfuR35HrQvzLnaSfRHFqua1wao5SlovzK771t6mDgzDtvucAU78WHLqXA3RTpVqqAe0O-NNsxVjix5oDdOujccTWW_Da-Mk5jw_noUjB6fPpULUPa7BIKYYNQgwdv5RvJ4vRDrPTgncm728IkxM_x6FUZrg5qRGrnnouuvc7pLJaS3ZAvC7iB-59zXEIhHoC4_tMP_kFyhSxXMp7U'],
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
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuA-j05MfHAu32diN6AF776Wd6WWOiB0XnFY4XrUaeXxvDTHTE2q2dp5WIPuvMODDCYzzuIwn3ZSk84KnDDjy0w3o7lV8wXwhM463wPoD1QMABoRO-rhYT0d6NdRgb-RXqfshE8Xdu6-Yw_HLoxu_8KDMFZvY_MmRtu1adRl7RkT1Mip88rgAIhlKQeIonYhxbjtTTZVYhfDzOZbkSd2cc1XnqoPTsMwdxyuKULrgrPZHUwEJ2bJRi9Twa6NtEK7YUNr25gZWQJxhcU'],
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
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuB7ZgXK7gX_jZ_WDTtm7UCbroS8kZzVO3FHlU5qcOJ0asnPFsaWFmKp5VRFbsykjo3z2yDSLMF8hm3YpGsuVcouOFucmJQrJ2Ss6wcPz1VmIRlY_93aWFY7Mk3czD9JnXiwuUoPpPmhmyHcSU9UHl8qC2etfsLcXvkaw9s5auUOX9a94ezYFKtx1Wy_S0bsrcAPamkmgN_KUiOoaIReuHZUv5aAR1h30F5JN3fMcLJzMNtP0WrnNE25HWwA2czPuLE53Obreh0NhGE'],
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
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80'],
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
