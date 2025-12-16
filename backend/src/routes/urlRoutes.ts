import express from 'express';
import { shorten, redirect } from '../controllers/urlController.js';

const router = express.Router();

router.post('/shorten', shorten);
router.get('/s/:code', redirect);

export default router;