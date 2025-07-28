import jwt from 'jsonwebtoken';
import axios from 'axios';

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        // Optionally, you can fetch user details from the user service
        const response = await axios.get(`${process.env.BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const user = response.data;

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;

        next();

    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(403).json({ message: 'Forbidden' });
    }
}