import Review from '../models/Review.js';
import Product from '../models/Product.js';

// Get all reviews for a specific product
export const getProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    next(error);
  }
};

// Add a new review & update product rating
export const addReview = async (req, res, next) => {
  try {
    const { rating, comment, images } = req.body;
    const productId = req.params.productId;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Create the review
    const review = new Review({
      user: req.user.clerkId,
      userName: req.user.fullName || 'Anonymous Customer',
      userAvatar: req.user.avatar || '',
      product: productId,
      rating: Number(rating),
      comment,
      images: images || []
    });

    await review.save();

    // Recalculate average rating for the product
    const allReviews = await Review.find({ product: productId });
    const totalRating = allReviews.reduce((sum, rev) => sum + rev.rating, 0);
    const avgRating = totalRating / allReviews.length;

    product.rating = Number(avgRating.toFixed(1));
    product.reviewsCount = allReviews.length;
    await product.save();

    res.status(201).json({ success: true, review });
  } catch (error) {
    next(error);
  }
};

// Delete review & update product rating
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    // Check permission: owner or admin
    if (review.user !== req.user.clerkId && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this review' });
    }

    const productId = review.product;
    await Review.findByIdAndDelete(req.params.id);

    // Recalculate average rating
    const allReviews = await Review.find({ product: productId });
    const totalRating = allReviews.reduce((sum, rev) => sum + rev.rating, 0);
    const avgRating = allReviews.length > 0 ? (totalRating / allReviews.length) : 5;

    await Product.findByIdAndUpdate(productId, {
      rating: Number(avgRating.toFixed(1)),
      reviewsCount: allReviews.length
    });

    res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    next(error);
  }
};
