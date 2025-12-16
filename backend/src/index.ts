import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config } from './config/index.js';
import { connectRedis } from './data/store.js';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { rateLimiterMiddleware } from './middleware/rateLimiter.js';

const app = express();
const PORT = config.port;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: config.frontendUrl,
  credentials: true
}));
app.use(express.json());

// Rate limiting
app.use(rateLimiterMiddleware);

// API Routes
app.use('/api', routes);

// OpenAPI documentation
app.use('/api-docs', express.static('docs'));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'url-shortener'
  });
});

// Error handling
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectRedis();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📚 API Docs: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();