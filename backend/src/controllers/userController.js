import User from '../models/User.js';
import Wishlist from '../models/Wishlist.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Get current user profile
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({ clerkId: req.user.clerkId });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// Update user details
export const updateUserProfile = async (req, res, next) => {
  try {
    const { fullName, avatar } = req.body;
    const user = await User.findOneAndUpdate(
      { clerkId: req.user.clerkId },
      { fullName, avatar },
      { new: true }
    );
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// Add an address to address book
export const addAddress = async (req, res, next) => {
  try {
    const user = await User.findOne({ clerkId: req.user.clerkId });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User profile not found' });
    }

    const { fullName, phone, addressLine1, addressLine2, city, state, postalCode, country, isDefault } = req.body;
    
    // If setting default, unset all others
    if (isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    user.addresses.push({
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault: isDefault || user.addresses.length === 0 // default if first one
    });

    await user.save();
    res.status(201).json({ success: true, addresses: user.addresses });
  } catch (error) {
    next(error);
  }
};

// Delete address
export const deleteAddress = async (req, res, next) => {
  try {
    const user = await User.findOne({ clerkId: req.user.clerkId });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.addresses = user.addresses.filter(addr => addr._id.toString() !== req.params.addressId);
    
    // Ensure at least one default exists if addresses remain
    if (user.addresses.length > 0 && !user.addresses.some(a => a.isDefault)) {
      user.addresses[0].isDefault = true;
    }

    await user.save();
    res.status(200).json({ success: true, addresses: user.addresses });
  } catch (error) {
    next(error);
  }
};

// Get user wishlist
export const getWishlist = async (req, res, next) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.clerkId }).populate('products');
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user.clerkId, products: [] });
    }
    res.status(200).json({ success: true, wishlist: wishlist.products });
  } catch (error) {
    next(error);
  }
};

// Toggle wishlist item (Add / Remove)
export const toggleWishlistItem = async (req, res, next) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user.clerkId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user.clerkId, products: [productId] });
    } else {
      const idx = wishlist.products.indexOf(productId);
      if (idx > -1) {
        wishlist.products.splice(idx, 1); // remove
      } else {
        wishlist.products.push(productId); // add
      }
      wishlist.updatedAt = Date.now();
    }

    await wishlist.save();
    const populated = await wishlist.populate('products');

    res.status(200).json({
      success: true,
      message: 'Wishlist updated successfully',
      wishlist: populated.products
    });
  } catch (error) {
    next(error);
  }
};

// Helper to generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id || user.id, email: user.email, role: user.role, clerkId: user.clerkId },
    process.env.JWT_SECRET || 'goldenglow-secret',
    { expiresIn: '30d' }
  );
};

// Register a new user locally
export const registerUser = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email and password' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create unique mock clerkId (to satisfy other modules querying clerkId)
    const mockClerkId = `user_local_${Math.random().toString(36).substr(2, 9)}${Date.now().toString(36)}`;

    // Create user
    const user = await User.create({
      clerkId: mockClerkId,
      email,
      password: hashedPassword,
      fullName,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(fullName)}`,
      role: 'customer'
    });

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        clerkId: user.clerkId,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// Login user locally
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Check if user has a password set (either seeded or locally registered)
    if (!user.password) {
      return res.status(400).json({ 
        success: false, 
        message: 'This account does not have local password authentication configured.' 
      });
    }

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        clerkId: user.clerkId,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};
