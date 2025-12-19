import { JsonWebTokenError } from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
    const token = JsonWebTokenError.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });
    
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });
}