import { Request, Response, NextFunction } from 'express';
import { getUrlStats } from '../services/statsService.js';

export const getStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code } = req.params;
    const stats = await getUrlStats(code);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};