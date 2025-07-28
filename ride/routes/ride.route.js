import express from 'express';
import { createRide } from '../controllers/ride.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/createride', authMiddleware, createRide);

export default router;