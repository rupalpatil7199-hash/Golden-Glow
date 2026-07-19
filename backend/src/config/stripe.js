import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripeSecret = process.env.STRIPE_SECRET_KEY || 'sk_test_mock_secret_key_golden_glow_12345';
const stripe = new Stripe(stripeSecret);

export default stripe;
