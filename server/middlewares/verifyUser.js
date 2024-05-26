import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ status: false, message: "Unauthorized: No token provided" });
        }
        const decoded = await jwt.verify(token, process.env.KEY);
        req.userId = decoded.userId; // Ensure this is correct based on your token structure
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({ status: false, message: "Unauthorized: Invalid token" });
    }
};
