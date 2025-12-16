import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const urlApi = {
  shorten: (url: string) => api.post('/api/url/shorten', { url }),
  getStats: (code: string) => api.get(`/api/stats/${code}`),
  health: () => api.get('/health')
};

export default api;