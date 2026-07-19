import express from 'express';
import {
  createOrder,
  confirmPayment,
  getMyOrders,
  getOrderById
} from '../controllers/orderController.js';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();

router.use(requireAuth); // Protect all order routes

router.post('/', createOrder);
router.post('/confirm-payment', confirmPayment);
router.get('/my-orders', getMyOrders);
router.get('/:id', getOrderById);

export default router;
