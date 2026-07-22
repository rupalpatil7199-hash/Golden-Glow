import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Coupon from '../models/Coupon.js';

dotenv.config();

const categoriesData = [
  { name: 'Rings', slug: 'rings', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPlTKlFbtjogeBjvDmrUeyv6a_a5DpKMSR7Gh4Wc8d2cR6TYC1R19ZcDqBkvAyE4ktlJ3iM69ko3G8DhC8d_ZLuzNZ4zTTdGlp7zSAy-PtGKqHAdoBlRLpdxziPKxUWQk8YFk_DhjmqdADcZG4B2W-f9WSZPotf00wVqz0hKbknqbkgIQkLTRqq6ge3ZHwuLb6V9s27iizwn-hXWzJleA1rhuvwTLtH4EzWJxDs3bPv55KLcxoPVDC6kCrvVsmCGmOocGxWtPwwig', description: 'Graceful statements for your fingers' },
  { name: 'Earrings', slug: 'earrings', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-j05MfHAu32diN6AF776Wd6WWOiB0XnFY4XrUaeXxvDTHTE2q2dp5WIPuvMODDCYzzuIwn3ZSk84KnDDjy0w3o7lV8wXwhM463wPoD1QMABoRO-rhYT0d6NdRgb-RXqfshE8Xdu6-Yw_HLoxu_8KDMFZvY_MmRtu1adRl7RkT1Mip88rgAIhlKQeIonYhxbjtTTZVYhfDzOZbkSd2cc1XnqoPTsMwdxyuKULrgrPZHUwEJ2bJRi9Twa6NtEK7YUNr25gZWQJxhcU', description: 'Frame your face with delicate shimmer' },
  { name: 'Necklaces', slug: 'necklaces', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWLBl2l6Tz-HYvqOA_Bo3lYks5rPPUfQOEinnEj9cQDrGDhCUJKGzGnowSImR1R7E7V1o4BcODUqSGo6oR5gqQLnUB-SBtpNvnZsDGlbIoFxfq6YIMPgyGkcRV-ZxWj4T0NDmIa8fo0BVcs8u8AcbKPYfeI-Hrc01vPBaJnVFNQcZSod6TPi-5PviNZOlcXXrhq-U3ShyXkcDVqSECsaDe4pgPy58fufjZlhRpB40V1a3JF3bu00CuGrEnt1zaMpPdUKDFyRK6llY', description: 'Sculptured details to grace the collar' },
  { name: 'Bracelets', slug: 'bracelets', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb5TFOhzutiWC1yEPv7IwIgA8Mrfr5MQqk59Oh26IMFn3n4_jgn5YNwgmEeoBfuR35HrQvzLnaSfRHFqua1wao5SlovzK771t6mDgzDtvucAU78WHLqXA3RTpVqqAe0O-NNsxVjix5oDdOujccTWW_Da-Mk5jw_noUjB6fPpULUPa7BIKYYNQgwdv5RvJ4vRDrPTgncm728IkxM_x6FUZrg5qRGrnnouuvc7pLJaS3ZAvC7iB-59zXEIhHoC4_tMP_kFyhSxXMp7U', description: 'Elegance that flows with every movement' },
  { name: 'Bangles', slug: 'bangles', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVEnwYcLsPZ2260kfauZHwykNM4NBuZPkWiQdagtIyx9SWgfDX9fSY3ckB2sVVlHXpYA5joX1kjqrTFU1yPpAt2PgBop84isV6ZpOfy9M0gy1ZZtlPQ_LEDbTm_7aw7s-PKnYeETKI0fFIYxRzE_TiRZH_9T_UrobFJ6zQHqxzygjXpc0J4eWXngu0yUPQgvyWQNMLSYKQm579tNcM4j-6ampqhDmNQXsVmMd64hrP-gwmhdgbGmsNfrQcyiUWLNbfRogIH_QOzQs', description: 'Timeless circular gold cuffs' }
];

const productsData = [
  {
    title: 'Geometric Signet Ring',
    description: 'A stunning gold signet ring with a minimalist geometric design, crafted in solid 18K Yellow Gold. Features clean architecture and micro-polished lines reflecting a warm, golden glow. Perfect for standard styling or stack sets.',
    price: 1250,
    discount: 10,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDPlTKlFbtjogeBjvDmrUeyv6a_a5DpKMSR7Gh4Wc8d2cR6TYC1R19ZcDqBkvAyE4ktlJ3iM69ko3G8DhC8d_ZLuzNZ4zTTdGlp7zSAy-PtGKqHAdoBlRLpdxziPKxUWQk8YFk_DhjmqdADcZG4B2W-f9WSZPotf00wVqz0hKbknqbkgIQkLTRqq6ge3ZHwuLb6V9s27iizwn-hXWzJleA1rhuvwTLtH4EzWJxDs3bPv55KLcxoPVDC6kCrvVsmCGmOocGxWtPwwig',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBOckzl1rf34oYBqeYu4_FsuyBeqgAt3Uu46Salfr_MCQLibQ8UnlU2yvQErTQQnwCMb7ipZwyd9-E7nPwar6gEFgFzLaU0WB-Bbu-WRD_VjzhfLeJsH98QU9wPmymBSIdISrQC6uJ6xvByY1y_05QLYLHAOdUvlCD5LbAfIDBtHFV1LRAzLQ7dUN7ugtqYu0nUkknwNaMAM3sCNcRXUtwWfkq_nnIEFC512WOKVUsbHj2NrAWR4JebJbNaZxvVNkufr02gaomWEko'
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
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWLBl2l6Tz-HYvqOA_Bo3lYks5rPPUfQOEinnEj9cQDrGDhCUJKGzGnowSImR1R7E7V1o4BcODUqSGo6oR5gqQLnUB-SBtpNvnZsDGlbIoFxfq6YIMPgyGkcRV-ZxWj4T0NDmIa8fo0BVcs8u8AcbKPYfeI-Hrc01vPBaJnVFNQcZSod6TPi-5PviNZOlcXXrhq-U3ShyXkcDVqSECsaDe4pgPy58fufjZlhRpB40V1a3JF3bu00CuGrEnt1zaMpPdUKDFyRK6llY',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDZw670Mo6vvHmqFz-l-1YV2xR6wS3_Xi148RlrXMosXE8kAfW3XrzfXWbruqpkNcKL8v2vvxBlO2Egf1wqfufz8Kjt0whUuAf3-Nq4Kfy2CsrNmQM1EDzO2NRKoKkVY5yU9qO0w7_TpISVFboURIMMSOw9yLbpuvPIBkGCr8FZgFSFC2nqG8HcSjwvXkgJ0nCJufjJsATYxoAa9tiM13r458qA_HUbIbf3xe3witECl4oA3D5oPXDvyJIrC4z6OzzYPvW9Rf8LQ7s'
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
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAlhgs2Cb6GAs-lnJ5MXEykScInAFmBtVQbVaQrITHVcTuBH9nQwL8_Tt3eBe4qJkd3o2yEDUGXPLZPybxFUO4flX6mn2Mv7Rqi7nSwo14pUrbgI-7TvWbaMs4z94ejnBS-QylFuVXJcr-RL5-q0OXQs7buBPcbn_OAF3y4FZYC4hiHU4OypSWEKqAp1XlS4hYx_WkG3-eneKYSY8F5p_KY2kieKDajBlL7rFhclV5ZmmfgzlFyHVP00z4hYjHTuzwihjk-OOlCnqA'
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
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAB7kBbqJ0zfV3TZtfJT-7m8QXy7Z56zSnkDGXlxBz7kW0l90I3Pyfdwwf0sJwLy_FAPB0ZrWVKthQZ6UCHxVLbB4I1K7VaZgz4iB4qsGpFXRmKgKUmBwId8NojAEZWlmF4KnH9KEcyVxvBXyRcNKHuJeBhhJh2JtnJ_KQ7UTK7RxBRWieK0XfJ_FeX-GV3xQglof1G3D9aCQAoG2Sn5d-BQwhzz97ZNwjBF9KPR2SaQMzEKUb3-LXIWujxQ41lVvXylzTWBsUL5AU'
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
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA-j05MfHAu32diN6AF776Wd6WWOiB0XnFY4XrUaeXxvDTHTE2q2dp5WIPuvMODDCYzzuIwn3ZSk84KnDDjy0w3o7lV8wXwhM463wPoD1QMABoRO-rhYT0d6NdRgb-RXqfshE8Xdu6-Yw_HLoxu_8KDMFZvY_MmRtu1adRl7RkT1Mip88rgAIhlKQeIonYhxbjtTTZVYhfDzOZbkSd2cc1XnqoPTsMwdxyuKULrgrPZHUwEJ2bJRi9Twa6NtEK7YUNr25gZWQJxhcU'
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
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB7ZgXK7gX_jZ_WDTtm7UCbroS8kZzVO3FHlU5qcOJ0asnPFsaWFmKp5VRFbsykjo3z2yDSLMF8hm3YpGsuVcouOFucmJQrJ2Ss6wcPz1VmIRlY_93aWFY7Mk3czD9JnXiwuUoPpPmhmyHcSU9UHl8qC2etfsLcXvkaw9s5auUOX9a94ezYFKtx1Wy_S0bsrcAPamkmgN_KUiOoaIReuHZUv5aAR1h30F5JN3fMcLJzMNtP0WrnNE25HWwA2czPuLE53Obreh0NhGE'
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
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80'
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
