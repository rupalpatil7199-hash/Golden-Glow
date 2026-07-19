const requestCache = new Map();

// Simple in-memory rate limiter middleware
const rateLimiter = (limit = 100, windowMs = 15 * 60 * 1000) => {
  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const now = Date.now();
    
    if (!requestCache.has(ip)) {
      requestCache.set(ip, []);
    }
    
    const timestamps = requestCache.get(ip);
    
    // Filter timestamps within window
    const activeTimestamps = timestamps.filter(time => now - time < windowMs);
    activeTimestamps.push(now);
    requestCache.set(ip, activeTimestamps);
    
    if (activeTimestamps.length > limit) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests from this IP, please try again later.',
      });
    }
    
    next();
  };
};

export default rateLimiter;
