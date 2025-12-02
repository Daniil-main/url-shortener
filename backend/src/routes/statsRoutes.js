import express from 'express';
import { statsController } from '../controllers/statsController.js';
import { apiRateLimiter } from '../middleware/rateLimiter.js';

export const statsRouter = express.Router();

// Apply rate limiting to stats routes
statsRouter.use(apiRateLimiter);

// GET /api/stats/:code
statsRouter.get('/:code', statsController.getStats);