import { Request, Response, NextFunction } from 'express';
import { config } from '../config/index.js';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    error: 'Internal server error',
    message: config.nodeEnv === 'development' ? error.message : undefined
  });
};