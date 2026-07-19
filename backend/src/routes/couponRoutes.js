import express from 'express';
import {
  validateCoupon,
  createCoupon,
  getCoupons,
  toggleCouponStatus
} from '../controllers/couponController.js';
import { requireAuth, requireAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.post('/validate', validateCoupon);

// Admin-only endpoints
router.post('/', requireAuth, requireAdmin, createCoupon);
router.get('/', requireAuth, requireAdmin, getCoupons);
router.patch('/:id/toggle', requireAuth, requireAdmin, toggleCouponStatus);

export default router;
