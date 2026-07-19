import express from 'express';
import {
  getAdminStats,
  getAdminOrders,
  updateOrderStatus,
  getAdminUsers,
  toggleUserRole,
  getInventoryReport
} from '../controllers/adminController.js';
import { requireAuth, requireAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.use(requireAuth, requireAdmin); // Admin protection for all sub-routes

router.get('/stats', getAdminStats);
router.get('/orders', getAdminOrders);
router.put('/orders/:id', updateOrderStatus);
router.get('/users', getAdminUsers);
router.put('/users/:id/role', toggleUserRole);
router.get('/inventory', getInventoryReport);

export default router;
