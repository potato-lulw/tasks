import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true,
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task',
        },
    ],
    isActive: {
        type: Boolean,
        default: true,
    }

}, { timestamps: true });


userSchema.pre('save', async function (next) {

    // The `isModified` method returns a boolean indicating whether a particular
    // path has been modified. If the password has not been modified, we can skip
    // the password hashing step. This is useful when we're updating a user's
    // profile information, but not their password.
    if (!this.isModified('password')) {
        next();
    }


    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;

