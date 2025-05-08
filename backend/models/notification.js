import e from "express";
import mongoose from "mongoose";
import { Schema } from "mongoose";

const notificationSchema = new mongoose.Schema({
    team: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    text: {
        type: String,
        
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
    },
    notiType: {
        type: String,
        default: "alert",
        enum: ["alert", "message",],
    },
    isRead: [{type: Schema.Types.ObjectId, ref: 'User'}],

}, { timestamps: true });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;