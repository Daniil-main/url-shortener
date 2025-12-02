import { nanoid } from 'nanoid';

// In-memory stores
const urlStore = new Map();
const statsStore = new Map();

export const urlService = {
  shortenUrl: (originalUrl, baseUrl) => {
    const shortCode = nanoid(8);
    const shareUrl = `${baseUrl}/s/${shortCode}`;
    const statsUrl = `${process.env.FRONTEND_URL}/stats/${shortCode}`;

    const urlData = {
      shortCode,
      originalUrl,
      shareUrl,
      statsUrl,
      createdAt: new Date().toISOString(),
      clicks: 0
    };

    urlStore.set(shortCode, urlData);
    statsStore.set(shortCode, []);

    return {
      shortCode,
      shareUrl,
      statsUrl
    };
  },

  getUrl: (shortCode) => {
    return urlStore.get(shortCode);
  },

  incrementClicks: (shortCode) => {
    const urlData = urlStore.get(shortCode);
    if (urlData) {
      urlData.clicks += 1;
      urlStore.set(shortCode, urlData);
    }
  }
};