import Order from '../models/Order.js';
import Product from '../models/Product.js';
import stripe from '../config/stripe.js';

// Create a new order
export const createOrder = async (req, res, next) => {
  try {
    const {
      items,
      shippingAddress,
      billingAddress,
      subtotal,
      tax,
      shippingFee,
      discount,
      total,
      giftWrap,
      giftMessage,
      paymentMethod
    } = req.body;

    const clerkId = req.user.clerkId;
    const customerEmail = req.user.email;
    const customerName = req.user.fullName;

    // Check inventory stock before finalizing
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product ${item.title} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${item.title}. Only ${product.stock} left.`
        });
      }
    }

    // Process payment intent if credit card / stripe
    let paymentIntentId = 'mock_stripe_intent_id';
    let paymentStatus = 'Pending';

    if (paymentMethod === 'Stripe' && process.env.STRIPE_SECRET_KEY) {
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(total * 100), // Stripe takes amounts in cents
          currency: 'usd',
          metadata: { clerkId, customerEmail },
          automatic_payment_methods: { enabled: true }
        });
        paymentIntentId = paymentIntent.id;
      } catch (stripeError) {
        console.error('Stripe Intent Error:', stripeError);
        return res.status(500).json({
          success: false,
          message: 'Error initiating Stripe checkout. ' + stripeError.message
        });
      }
    }

    const newOrder = new Order({
      user: clerkId,
      customerName,
      customerEmail,
      items,
      shippingAddress,
      billingAddress,
      paymentIntentId,
      paymentStatus,
      paymentMethod,
      subtotal,
      tax,
      shippingFee,
      discount,
      total,
      giftWrap,
      giftMessage
    });

    await newOrder.save();

    // Deduct stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }

    res.status(201).json({
      success: true,
      order: newOrder,
      clientSecret: paymentIntentId === 'mock_stripe_intent_id' ? 'mock_client_secret_12345' : paymentIntentId
    });
  } catch (error) {
    next(error);
  }
};

// Confirm order payment status
export const confirmPayment = async (req, res, next) => {
  try {
    const { orderId, paymentIntentId } = req.body;
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.paymentStatus = 'Paid';
    order.paymentIntentId = paymentIntentId;
    order.status = 'Processing';
    await order.save();

    res.status(200).json({ success: true, message: 'Payment confirmed successfully', order });
  } catch (error) {
    next(error);
  }
};

// Get orders of the logged-in customer
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.clerkId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

// Get order details by ID
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Access control: either admin or order owner
    if (order.user !== req.user.clerkId && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};
