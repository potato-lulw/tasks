import mongoose from "mongoose";
import { Schema } from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    priority: {
        type: String,
        enum: ["low", "medium", "high", "normal"],
        default: "normal",
    },
    stage: {
        type: String,
        enum: ["todo", "in progress", "completed"],
        default: "todo",
    },
    activities: [
      {
        type: {
          type: String,
          default: "assigned",
          enum: [
            "assigned",
            "started",
            "in progress",
            "bug",
            "completed",
            "commented",
          ],
        },
        activity: String,
        date: { type: Date, default: new Date() },
        by: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    assets: [String],
    links: [String],
    team: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isTrashed: { type: Boolean, default: false },
    subTasks: [
        {
            title: String,
            date: Date,
            tag: String,
            isCompleted: Boolean,
        },
    ],
    description: String,
}, { timestamps: true });


const Task = mongoose.model("Task", taskSchema);


export default Task;
