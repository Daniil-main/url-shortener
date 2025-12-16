import { urlService } from '../services/urlService.js';
import { statsService } from '../services/statsService.js';

export const statsController = {
  getStats: (req, res) => {
    try {
      const { code } = req.params;
      const urlData = urlService.getUrl(code);
      
      if (!urlData) {
        return res.status(404).json({ error: 'URL not found' });
      }

      const stats = statsService.getStats(code);
      
      res.json({
        success: true,
        data: {
          url: {
            original: urlData.originalUrl,
            short: urlData.shareUrl,
            createdAt: urlData.createdAt,
            clicks: urlData.clicks
          },
          analytics: {
            totalClicks: stats.length,
            clicks: stats
          }
        }
      });
      
    } catch (error) {
      console.error('Stats controller error:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: error.message 
      });
    }
  }
};