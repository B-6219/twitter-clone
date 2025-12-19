import User from "../models/user.model";
import jwt from "jsonwebtoken";


export const protectRoute = async (req, res,next) => {

    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized No token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);  
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: "Unauthorized Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Unauthorized User not found" });
        }
        res.user = user;
        next();
    } catch (error) {
        console.log('Error in protected middleware');
        res.status(401).json({ message: "Unauthorized" });
    }
}