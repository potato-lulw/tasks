import User from "../models/user.js";
import { createJWT } from "../utils/index.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, isAdmin, password, title, role } = req.body;
        const userExists = await User.findOne({ email});
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User.create({
            name,
            email,
            isAdmin,
            password,
            title,
            role
        });
        if (user) {
            isAdmin ? createJWT(res, user._id) : null;

            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                title: user.title,
                role: user.role,
            });
        } else {
            return res.status(400).json({ message: 'Invalid user data' });
        }
        
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        if(!user.isActive) {
            return res.status(401).json({ message: 'User is not active. Contact admin.' });
        }
        const isMatch = await user.matchPassword(password);
        if(!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        createJWT(res, user._id);
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            title: user.title,
            role: user.role,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}
export const logoutUser = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0, // 0 day
        });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}
// export const registerUser = async (req, res) => {
//     try {
        
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// }