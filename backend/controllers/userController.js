import Notification from "../models/notification.js";
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

export const getTeamList = async (req, res) => {
    try {
        const user = await User.find({}).select('-password -tasks -isAdmin');
        if (!user) {
            return res.status(404).json({ message: 'No users found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}
export const getNotificationsList = async (req, res) => {
    try {
        const { userID } = req.user;
        const notifications = await Notification.find({
            team: userID,
            isRead: {$nin: [userID]}
             }).populate('task', 'title').sort({ createdAt: -1 });

        if (!notifications) {
            return res.status(404).json({ message: 'No notifications found' });
        }
        return res.status(200).json(notifications);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}
export const updateUserProfile = async (req, res) => {
    try {
        const { userID, isAdmin } = req.user;
        const { _id } = req.body;
        const id = isAdmin ? _id : userID;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { name, email, title, role } = req.body;
        user.name = name || user.name;
        user.email = email || user.email;
        user.title = title || user.title;
        user.role = role || user.role;
        const updatedUser = await user.save();
        if (!updatedUser) {
            return res.status(400).json({ message: 'Couldnt update user data' || 'Invalid user data' });
        }
        return res.status(200).json(updatedUser); 
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}
export const markNotificationRead = async (req, res) => {
    try {
        const { userID } = req.user;
        const { isReadType, id } = req.query;

        if (isReadType === 'all') {
            const notifications = await Notification.updateMany(
                { team: userID, isRead: {$nin: [userID]} },
                { $push: { isRead: userID } },
                { new: true }
            );
            if (!notifications) {
                return res.status(404).json({ message: 'No notifications found' });
            }
            return res.status(200).json({ message: 'All notifications marked as read' });
        } else {
            const notification = await Notification.findById({_id: id});
            if (!notification) {
                return res.status(404).json({ message: 'Notification not found' });
            }
            const updatedNotification = await Notification.findOneAndUpdate(
                {_id : id, isRead: {$nin: [userID]}},
                { $push: { isRead: userID } },
                { new: true }
            );
            if (!updatedNotification) {
                return res.status(400).json({ message: 'Couldnt update notification' });
            }
            return res.status(200).json(updatedNotification);
        }
        
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}
export const changeUserPassword = async (req, res) => {
    try {
        const { userID } = req.user;
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await user.matchPassword(oldPassword);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid old password' });
        }
        user.password = newPassword;
        const updatedUser = await user.save();
        if (!updatedUser) {
            return res.status(400).json({ message: 'Couldnt update password' });
        }
        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}
export const activateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if(user) {
            user.isActive = req.body.isActive;
        }
        const updatedUser = await user.save();
        if (!updatedUser) {
            return res.status(400).json({ message: 'Couldnt update user data' || 'Invalid user data' });
        }
        updatedUser.password = undefined;
        return res.status(200).json({message: 'User account has been successfully ' + (user.isActive ? 'activated' : 'deactivated'), updatedUser});
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}
export const deleteUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(400).json({ message: 'Couldnt delete user data' || 'Invalid user data' });
        }
        deletedUser.password = undefined;
        return res.status(200).json({message: 'User account has been successfully deleted', deletedUser});
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}
// export const registerUser = async (req, res) => {
//     try {
        
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal server error: ' + error.message });
//     }
// }