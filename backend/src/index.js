import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import { urlRouter, redirectRouter } from './routes/urlRoutes.js';
import { statsRouter } from './routes/statsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// Logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// API Routes
app.use('/api/url', urlRouter);
app.use('/api/stats', statsRouter);
app.use('/s', redirectRouter); // Redirect route

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    service: 'URL Shortener API',
    timestamp: new Date().toISOString()
  });
});

// Root
app.get('/', (req, res) => {
  res.json({
    service: 'URL Shortener API',
    version: '1.0.0',
    endpoints: {
      shorten: 'POST /api/url/shorten',
      redirect: 'GET /s/:code',
      stats: 'GET /api/stats/:code',
      health: 'GET /api/health'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend API running on: http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔗 Frontend: ${FRONTEND_URL}`);
});