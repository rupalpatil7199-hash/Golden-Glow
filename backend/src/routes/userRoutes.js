import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  addAddress,
  deleteAddress,
  getWishlist,
  toggleWishlistItem,
  registerUser,
  loginUser
} from '../controllers/userController.js';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();

// Public auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);

router.use(requireAuth); // Protect all profile/wishlist routes below

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.post('/address', addAddress);
router.delete('/address/:addressId', deleteAddress);
router.get('/wishlist', getWishlist);
router.post('/wishlist/toggle', toggleWishlistItem);

export default router;
