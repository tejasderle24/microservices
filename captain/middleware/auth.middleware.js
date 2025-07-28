import Captain from "../models/captain.model.js";
import jwt from 'jsonwebtoken';
import BlacklistToken  from '../models/blacklistToken.model.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Check if token is blacklistedcaptain
        const blacklistedToken = await BlacklistToken.find({ token });

        if (blacklistedToken.length > 0) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.captain = await Captain.findById(decoded.id).select('-password');

        if (!req.captain) {
            return res.status(404).json({ message: "captain not found" });
        }

        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ message: "Invalid token" });
    }
} 