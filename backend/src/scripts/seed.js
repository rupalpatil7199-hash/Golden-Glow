import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Coupon from '../models/Coupon.js';

dotenv.config();

const categoriesData = [
  { name: 'Rings', slug: 'rings', image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80', description: 'Graceful statements for your fingers' },
  { name: 'Earrings', slug: 'earrings', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80', description: 'Frame your face with delicate shimmer' },
  { name: 'Necklaces', slug: 'necklaces', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80', description: 'Sculptured details to grace the collar' },
  { name: 'Bracelets', slug: 'bracelets', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80', description: 'Elegance that flows with every movement' },
  { name: 'Bangles', slug: 'bangles', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80', description: 'Timeless circular gold cuffs' }
];

const productsData = [
  {
    title: 'Geometric Signet Ring',
    description: 'A stunning gold signet ring with a minimalist geometric design, crafted in solid 18K Yellow Gold. Features clean architecture and micro-polished lines reflecting a warm, golden glow. Perfect for standard styling or stack sets.',
    price: 1250,
    discount: 10,
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: '',
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
    occasion: ['Daily Wear', 'Anniversary']
  },
  {
    title: 'Floating Pearl Choker',
    description: 'A delicate gold chain necklace holding a single, premium saltwater Akoya pearl. The pearls luster matches perfectly with the hand-drawn gold chain. A romantic tribute to ocean treasures.',
    price: 890,
    discount: 0,
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: '',
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
    occasion: ['Wedding', 'Bridal']
  },
  {
    title: 'Filigree Gold Hoops',
    description: 'Artisanal hand-crafted hoop earrings displaying intricate gold filigree pattern lines. Delicate circular curves that highlight gold craftsmanship. A classic piece representing heritage styling.',
    price: 1400,
    discount: 15,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: '',
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
    occasion: ['Anniversary', 'Daily Wear']
  },
  {
    title: 'Architectural Gold Bangle',
    description: 'Sleek, heavy, modern gold bangle featuring a hidden mechanical clasp lock. Structured with a flat mirror finish that captures reflections beautifully.',
    price: 2100,
    discount: 5,
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: '',
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
    occasion: ['Wedding', 'Anniversary']
  },
  {
    title: 'Diamond Starlight Studs',
    description: 'Breathtaking 1 carat round-cut laboratory diamonds mounted in platinum prongs. Designed to reflect light with spectacular fire and scintillation.',
    price: 3500,
    discount: 0,
    images: [
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: '',
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
    occasion: ['Anniversary', 'Wedding']
  },
  {
    title: 'Solitaire Diamond Promise Ring',
    description: 'An iconic symbol of devotion. High-set 0.75 ct cushion cut diamond nestled on a thin band of polished 18K Yellow Gold. An elegant luxury masterpiece.',
    price: 2800,
    discount: 0,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: '',
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
    occasion: ['Anniversary', 'Wedding']
  },
  {
    title: 'Minimalist Chain Bracelet',
    description: 'A classic chain bracelet featuring delicate interlocking links in solid 18K Yellow Gold. Designed for simple elegance.',
    price: 950,
    discount: 0,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: '',
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

const couponsData = [
  { code: 'GLOW10', discountType: 'percentage', discountAmount: 10, minPurchaseAmount: 100, expiryDate: '2028-12-31' },
  { code: 'ETERNAL20', discountType: 'percentage', discountAmount: 20, minPurchaseAmount: 500, expiryDate: '2028-12-31' },
  { code: 'WELCOME250', discountType: 'fixed', discountAmount: 250, minPurchaseAmount: 2000, expiryDate: '2028-12-31' }
];

const seedDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/goldenglow';
    await mongoose.connect(connStr);
    console.log('Database Connected for Seeding');

    // Clean current database data
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Coupon.deleteMany({});

    // Insert categories
    await Category.insertMany(categoriesData);
    console.log('Categories seeded successfully!');

    // Insert products
    await Product.insertMany(productsData);
    console.log('Products seeded successfully!');

    // Insert coupons
    await Coupon.insertMany(couponsData);
    console.log('Coupons seeded successfully!');

    console.log('=================================');
    console.log('  Database Seeding Completed!');
    console.log('=================================');
    process.exit(0);
  } catch (error) {
    console.error('Database seeding failed:', error);
    process.exit(1);
  }
};

seedDB();
