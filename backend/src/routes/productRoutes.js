import express from 'express';
import {
  getProducts,
  getProductById,
  getSearchSuggestions,
  getCategories,
  getSimilarProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { requireAuth, requireAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/suggestions', getSearchSuggestions);
router.get('/categories', getCategories);
router.get('/similar/:category/:id', getSimilarProducts);
router.get('/:id', getProductById);

// Admin routes
router.post('/', requireAuth, requireAdmin, createProduct);
router.put('/:id', requireAuth, requireAdmin, updateProduct);
router.delete('/:id', requireAuth, requireAdmin, deleteProduct);

export default router;
