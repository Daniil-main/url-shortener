import fetch from 'node-fetch';

const statsStore = new Map();

export const statsService = {
  recordClick: async (shortCode, userData) => {
    const geoInfo = await getGeoInfo(userData.ip);
    
    const clickData = {
      id: `${shortCode}-${Date.now()}`,
      shortCode,
      timestamp: new Date().toISOString(),
      ip: userData.ip,
      userAgent: userData.userAgent,
      browser: userData.browser,
      os: userData.os,
      region: geoInfo.region,
      country: geoInfo.country,
      city: geoInfo.city
    };

    const stats = statsStore.get(shortCode) || [];
    stats.push(clickData);
    statsStore.set(shortCode, stats);

    return clickData;
  },

  getStats: (shortCode) => {
    return statsStore.get(shortCode) || [];
  }
};

// Helper function to get geo info
const getGeoInfo = async (ip) => {
  try {
    // Local IPs
    if (ip === '::1' || ip === '127.0.0.1' || ip.includes('::ffff:127.0.0.1')) {
      return {
        region: 'Local',
        country: 'Local',
        city: 'Local'
      };
    }

    // Clean IP address
    const cleanIp = ip.replace('::ffff:', '');
    
    // Skip private IPs
    if (cleanIp.startsWith('192.168.') || 
        cleanIp.startsWith('10.') || 
        cleanIp.startsWith('172.16.')) {
      return {
        region: 'Private',
        country: 'Private',
        city: 'Private'
      };
    }

    const response = await fetch(`https://ipapi.co/${cleanIp}/json/`);
    if (!response.ok) throw new Error(`IP API error: ${response.status}`);
    
    const data = await response.json();
    
    return {
      region: data.region || 'Unknown',
      country: data.country_name || 'Unknown',
      city: data.city || 'Unknown'
    };
  } catch (error) {
    console.log('Geo service fallback:', error.message);
    return {
      region: 'Unknown',
      country: 'Unknown',
      city: 'Unknown'
    };
  }
};