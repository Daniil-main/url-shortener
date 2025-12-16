import express from 'express';
import urlRoutes from './urlRoutes.js';
import statsRoutes from './statsRoutes.js';
import docsRoutes from './docsRoutes.js';

const router = express.Router();

router.use('/url', urlRoutes);
router.use('/stats', statsRoutes);
router.use('/docs', docsRoutes);

export default router;