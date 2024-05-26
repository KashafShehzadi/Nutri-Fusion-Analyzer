
import jwt from 'jsonwebtoken';

export const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ status: false, message: "Unauthorized: No token provided" });
        }
        const decoded = await jwt.verify(token, process.env.KEY);
        req.userId = decoded.userId; // Assuming the token payload includes userId
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({ status: false, message: "Unauthorized: Invalid token" });
    }
};

