import express from 'express';
import { getUserProfile, login, logout, register } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/profile', authMiddleware, getUserProfile);


export default router;