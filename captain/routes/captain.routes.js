import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { register, login, logout, getcaptainProfile, captainAvailability } from '../controllers/captain.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/profile', authMiddleware, getcaptainProfile);
router.patch('/captain-availability', authMiddleware, captainAvailability);

export default router;