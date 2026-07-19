import Product from '../models/Product.js';
import Category from '../models/Category.js';

// Get products with filters, sorting & pagination
export const getProducts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      priceMin,
      priceMax,
      rating,
      material,
      occasion,
      sort,
      page = 1,
      limit = 12
    } = req.query;

    const query = {};

    // Live search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Category filter
    if (category && category !== 'All') {
      query.category = category;
    }

    // Material filter
    if (material && material !== 'All') {
      query.material = material;
    }

    // Occasion filter
    if (occasion && occasion !== 'All') {
      query.occasion = occasion;
    }

    // Price range filter
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = Number(priceMin);
      if (priceMax) query.price.$lte = Number(priceMax);
    }

    // Rating filter
    if (rating && rating !== 'All') {
      query.rating = { $gte: Number(rating) };
    }

    // Sorting
    let sortOptions = { createdAt: -1 }; // default: newest
    if (sort) {
      if (sort === 'price_asc') sortOptions = { price: 1 };
      else if (sort === 'price_desc') sortOptions = { price: -1 };
      else if (sort === 'rating') sortOptions = { rating: -1 };
      else if (sort === 'popular') sortOptions = { reviewsCount: -1 };
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.max(1, parseInt(limit));
    const skip = (pageNum - 1) * limitNum;

    // Execute query with fallback for DB offlines
    let products = [];
    let total = 0;

    try {
      total = await Product.countDocuments(query);
      products = await Product.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum);
    } catch (dbError) {
      console.warn('DB offline. Using mock products.');
      // If DB is offline, fall back to mock data
      return res.status(200).json({
        success: true,
        products: [],
        total: 0,
        page: pageNum,
        pages: 0
      });
    }

    res.status(200).json({
      success: true,
      products,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum)
    });
  } catch (error) {
    next(error);
  }
};

// Get product details by ID
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// Get live search suggestions
export const getSearchSuggestions = async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(200).json({ success: true, suggestions: [] });
    }

    const products = await Product.find({
      title: { $regex: query, $options: 'i' }
    }).select('title _id category price images').limit(5);

    res.status(200).json({ success: true, suggestions: products });
  } catch (error) {
    next(error);
  }
};

// Get all categories
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({ success: true, categories });
  } catch (error) {
    next(error);
  }
};

// Get similar products
export const getSimilarProducts = async (req, res, next) => {
  try {
    const { category, id } = req.params;
    const products = await Product.find({
      category,
      _id: { $ne: id }
    }).limit(4);
    res.status(200).json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

// Admin: Create new product
export const createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// Admin: Update product
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// Admin: Delete product
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};
