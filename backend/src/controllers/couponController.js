import Coupon from '../models/Coupon.js';

// Validate a coupon code
export const validateCoupon = async (req, res, next) => {
  try {
    const { code, cartTotal } = req.body;
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), active: true });

    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Invalid or inactive coupon code' });
    }

    if (new Date() > new Date(coupon.expiryDate)) {
      return res.status(400).json({ success: false, message: 'This coupon has expired' });
    }

    if (cartTotal < coupon.minPurchaseAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum purchase of $${coupon.minPurchaseAmount} required for this coupon.`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Coupon applied successfully!',
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountAmount: coupon.discountAmount
      }
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Create coupon
export const createCoupon = async (req, res, next) => {
  try {
    const { code, discountType, discountAmount, minPurchaseAmount, expiryDate } = req.body;
    
    const existing = await Coupon.findOne({ code: code.toUpperCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Coupon code already exists' });
    }

    const coupon = new Coupon({
      code: code.toUpperCase(),
      discountType,
      discountAmount,
      minPurchaseAmount,
      expiryDate: new Date(expiryDate)
    });

    await coupon.save();
    res.status(201).json({ success: true, coupon });
  } catch (error) {
    next(error);
  }
};

// Admin: List all coupons
export const getCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, coupons });
  } catch (error) {
    next(error);
  }
};

// Admin: Toggle active status
export const toggleCouponStatus = async (req, res, next) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }
    coupon.active = !coupon.active;
    await coupon.save();
    res.status(200).json({ success: true, coupon });
  } catch (error) {
    next(error);
  }
};
