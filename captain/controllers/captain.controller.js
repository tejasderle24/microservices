import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import  BlacklistToken  from '../models/blacklistToken.model.js';
import Captain from '../models/captain.model.js';


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const captain = await Captain.findOne({ email });

        if (captain) {
            return res.status(400).json({ message: "captain already exists" });
        }

        const hash = await bcrypt.hash(password, 10);
        const newcaptain = new Captain({ name, email, password: hash });
        await newcaptain.save();

        // Generate JWT token
        const token = jwt.sign({ id: newcaptain._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

        delete newcaptain._doc.password; // Remove password from captain object

        // Set token in cookie
        res.cookie('token', token);

        res.status(201).json({ message: "captain registered successfully", token, captain: { name, email } });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error" });

    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const captain = await Captain.findOne({ email });

        if (!captain) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, captain.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // Generate JWT token
        const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

        delete captain._doc.password; // Remove password from captain object

        // Set token in cookie
        res.cookie('token', token);
        res.status(200).json({ message: "Logged in successfully", token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        await BlacklistToken.create({ token });
        res.clearCookie('token');
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getcaptainProfile = async (req, res) => {
    try {
        const captain = req.captain;
        if (!captain) {
            return res.status(404).json({ message: "captain not found" });
        }
        res.status(200).json({ message: "captain profile retrieved successfully", captain });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const captainAvailability = async (req, res) => {
    try {
        const captain = await Captain.findById(req.captain._id);
        captain.isAvailable = !captain.isAvailable;
        await captain.save();
        res.send(captain);
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
};



