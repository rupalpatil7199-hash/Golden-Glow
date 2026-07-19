import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0, min: 0, max: 100 }, // percentage discount
  images: [{ type: String, required: true }], // Cloudinary or mock urls
  videoUrl: { type: String, default: '' },
  category: { type: String, required: true }, // e.g. Rings, Earrings, Necklaces
  material: { type: String, required: true }, // e.g. 18K Yellow Gold, 14K Rose Gold, 925 Sterling Silver
  weight: { type: String, required: true }, // e.g. 4.5 grams, 12.2 grams
  stoneInfo: { type: String, default: 'None' }, // e.g. VVS1 Diamond 0.5 carat, Pearl
  sku: { type: String, required: true, unique: true },
  stock: { type: Number, default: 10, min: 0 },
  rating: { type: Number, default: 5, min: 0, max: 5 },
  reviewsCount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: true },
  occasion: [{ type: String }], // e.g. Bridal, Wedding, Anniversary, Daily Wear
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
