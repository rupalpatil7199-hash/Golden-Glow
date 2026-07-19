import Cart from '../models/Cart.js';

// Get user's cart
export const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user.clerkId }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ user: req.user.clerkId, items: [] });
    }
    res.status(200).json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

// Sync / Update user's cart
export const syncCart = async (req, res, next) => {
  try {
    const { items } = req.body; // Array of { product: id, quantity: n }
    let cart = await Cart.findOne({ user: req.user.clerkId });

    if (!cart) {
      cart = new Cart({ user: req.user.clerkId, items });
    } else {
      cart.items = items;
      cart.updatedAt = Date.now();
    }

    await cart.save();
    const populatedCart = await cart.populate('items.product');
    
    res.status(200).json({ success: true, cart: populatedCart });
  } catch (error) {
    next(error);
  }
};
