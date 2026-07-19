import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true }, // Clerk user ID
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  updatedAt: { type: Date, default: Date.now }
});

const Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);
export default Wishlist;
