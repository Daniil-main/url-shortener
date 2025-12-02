import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  keyPrefix: 'api',
  points: 100, // 100 requests
  duration: 60, // per minute
  blockDuration: 300 // block for 5 minutes if exceeded
});

export const apiRateLimiter = (req, res, next) => {
  const key = req.ip || req.headers['x-forwarded-for'] || 'unknown';
  
  rateLimiter.consume(key)
    .then(() => next())
    .catch(() => {
      res.status(429).json({ 
        error: 'Too many requests',
        message: 'Please try again later'
      });
    });
};