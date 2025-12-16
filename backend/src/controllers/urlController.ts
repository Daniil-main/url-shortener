import { urlService } from '../services/urlService.js';
import { statsService } from '../services/statsService.js';
import { urlValidator } from '../utils/urlValidator.js';
import { parseUserAgent } from '../utils/userAgentParser.js';

export const urlController = {
  shorten: (req, res) => {
    try {
      const { url } = req.body;
      
      if (!url) {
        return res.status(400).json({ error: 'URL is required' });
      }
      
      const normalizedUrl = urlValidator.normalizeUrl(url);
      
      if (!urlValidator.isValidUrl(normalizedUrl)) {
        return res.status(400).json({ error: 'Invalid URL format' });
      }

      const baseUrl = process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
      const result = urlService.shortenUrl(normalizedUrl, baseUrl);
      
      res.json({
        success: true,
        data: result
      });
      
    } catch (error) {
      console.error('Shorten controller error:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: error.message 
      });
    }
  },

  redirect: async (req, res) => {
    try {
      const { code } = req.params;
      const urlData = urlService.getUrl(code);
      
      if (!urlData) {
        return res.status(404).json({ error: 'URL not found' });
      }

      // Get user data
      const ip = req.headers['x-forwarded-for'] || req.ip || 'unknown';
      const cleanIp = ip.toString().replace('::ffff:', '');
      const userAgent = req.get('User-Agent') || '';
      
      const userData = {
        ip: cleanIp,
        userAgent,
        ...parseUserAgent(userAgent)
      };

      // Record click
      await statsService.recordClick(code, userData);
      
      // Increment click count
      urlService.incrementClicks(code);
      
      // Redirect to original URL
      res.redirect(urlData.originalUrl);
      
    } catch (error) {
      console.error('Redirect controller error:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: error.message 
      });
    }
  }
};