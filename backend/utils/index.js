import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit the process with failure
    }
}

export const createJWT = (res, id) => {
    const token = jwt.sign({userID:id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge:  7 * 24 * 60 * 60 * 1000, // 7 day
    });
    
}


export default dbConnect;