import mongoose from 'mongoose';
import { setupMockDB } from './dbMock.js';

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/goldenglow';
    console.log(`Connecting to MongoDB at: ${connStr.replace(/:([^@]+)@/, ':****@')}`);
    
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 2000
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Seed default users if using real DB
    try {
      const hasCustomer = await mongoose.model('User').findOne({ email: 'buyer@goldenglow.com' });
      if (!hasCustomer) {
        await mongoose.model('User').create({
          clerkId: 'user_customer_67890',
          email: 'buyer@goldenglow.com',
          fullName: 'Eleanor Vance',
          password: '$2a$10$/vuuyD3s.rMmD4wwQV8e/OGWJevUdwRM0IOP9XaLLHkvs4pOQlfOS',
          role: 'customer',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80'
        });
      }
      const hasAdmin = await mongoose.model('User').findOne({ email: 'admin@goldenglow.com' });
      if (!hasAdmin) {
        await mongoose.model('User').create({
          clerkId: 'user_admin_12345',
          email: 'admin@goldenglow.com',
          fullName: 'Alexander Thorne',
          password: '$2a$10$/vuuyD3s.rMmD4wwQV8e/OGWJevUdwRM0IOP9XaLLHkvs4pOQlfOS',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80'
        });
      }
    } catch (seedErr) {
      console.warn('Real DB default user seeding skipped/failed:', seedErr.message);
    }
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.log('Server will continue running in read-only / mock mode for local testing if DB is unreachable.');
    setupMockDB();
  }
};

export default connectDB;
