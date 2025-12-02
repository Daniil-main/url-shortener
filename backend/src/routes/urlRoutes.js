import express from 'express';
import { urlController } from '../controllers/urlController.js';
import { apiRateLimiter } from '../middleware/rateLimiter.js';

export const urlRouter = express.Router();

// Apply rate limiting to all URL routes
urlRouter.use(apiRateLimiter);

// POST /api/url/shorten
urlRouter.post('/shorten', urlController.shorten);

// GET /s/:code (redirect route - без префикса /api)
export const redirectRouter = express.Router();
redirectRouter.get('/:code', urlController.redirect);