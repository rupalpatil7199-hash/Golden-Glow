import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Authentication middleware
export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authorization token required' });
    }

    const token = authHeader.split(' ')[1];

    // Mock Authentication for preview and local execution
    if (token.startsWith('mock-')) {
      const role = token === 'mock-admin' ? 'admin' : 'customer';
      const clerkId = token === 'mock-admin' ? 'user_admin_12345' : 'user_customer_67890';
      const email = role === 'admin' ? 'admin@goldenglow.com' : 'buyer@goldenglow.com';
      const fullName = role === 'admin' ? 'Alexander Thorne' : 'Eleanor Vance';

      req.user = {
        clerkId,
        email,
        fullName,
        role
      };
      
      // Ensure mock user is synced in DB
      let dbUser = await User.findOne({ clerkId });
      if (!dbUser) {
        dbUser = await User.create({
          clerkId,
          email,
          fullName,
          role,
          avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${fullName}`
        });
      }
      return next();
    }

    // Verify Local JWT Token first
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'goldenglow-secret');
      let dbUser = await User.findById(decoded.id) || await User.findOne({ clerkId: decoded.clerkId });
      if (!dbUser) {
        return res.status(401).json({ success: false, message: 'User session invalid' });
      }
      req.user = dbUser;
      return next();
    } catch (err) {
      // Fallback: Parse token as a Clerk/Mock token (claims structure)
      try {
        const base64Url = token.split('.')[1];
        if (!base64Url) {
          return res.status(401).json({ success: false, message: 'Invalid token format' });
        }
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const claims = JSON.parse(jsonPayload);
        
        // Check expiration
        if (claims.exp && claims.exp * 1000 < Date.now()) {
          return res.status(401).json({ success: false, message: 'Authentication token expired' });
        }

        const clerkId = claims.sub; // subject is the clerkId
        const email = claims.email || claims.primary_email_address || 'user@example.com';
        const fullName = claims.name || 'Valued Customer';
        
        let dbUser = await User.findOne({ clerkId });
        if (!dbUser) {
          dbUser = await User.create({
            clerkId,
            email,
            fullName,
            avatar: claims.picture || `https://api.dicebear.com/7.x/adventurer/svg?seed=${fullName}`
          });
        }

        req.user = dbUser;
        return next();
      } catch (fallbackError) {
        console.error('Auth verification error:', fallbackError);
        return res.status(401).json({ success: false, message: 'Unauthorized access', error: err.message });
      }
    }
  } catch (error) {
    console.error('Auth handler error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

// Admin middleware
export const requireAdmin = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Forbidden: Admin access required' });
  }
  
  next();
};
