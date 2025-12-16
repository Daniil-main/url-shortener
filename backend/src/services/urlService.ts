import { Request, Response, NextFunction } from 'express';
import { createShortUrl, getOriginalUrl, incrementClickCount } from '../services/urlService.js';
import { recordClick } from '../services/statsService.js';
import { parseUserAgent } from '../utils/userAgentParser.js';
import { config } from '../config/index.js';

export const shorten = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const result = await createShortUrl(
      url,
      config.apiBaseUrl,
      config.frontendUrl
    );
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const redirect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code } = req.params;
    const originalUrl = await getOriginalUrl(code);

    const userData = {
      ip: req.ip,
      userAgent: req.get('User-Agent') || '',
      ...parseUserAgent(req.get('User-Agent'))
    };

    await recordClick(code, userData);
    await incrementClickCount(code);

    res.redirect(originalUrl);
  } catch (error) {
    next(error);
  }
};