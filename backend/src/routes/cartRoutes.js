import express from 'express';
import { getCart, syncCart } from '../controllers/cartController.js';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();

router.use(requireAuth);

router.get('/', getCart);
router.post('/sync', syncCart);

export default router;
