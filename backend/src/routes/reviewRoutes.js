import express from 'express';
import {
  getProductReviews,
  addReview,
  deleteReview
} from '../controllers/reviewController.js';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router({ mergeParams: true });

router.get('/', getProductReviews);
router.post('/', requireAuth, addReview);
router.delete('/:id', requireAuth, deleteReview);

export default router;
