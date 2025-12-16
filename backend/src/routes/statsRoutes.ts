import express from 'express';
import { getStats } from '../controllers/statsController.js';

const router = express.Router();

router.get('/:code', getStats);

export default router;