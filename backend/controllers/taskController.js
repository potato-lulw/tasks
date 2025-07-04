import mongoose, { now } from "mongoose";
import Notification from "../models/notification.js";
import Task from "../models/task.js";
import User from "../models/user.js";

export const createTask = async (req, res) => {
    try {
        let { title, team, stage, priority, assets } = req.body;
        let date = req.body.date ? new Date(req.body.date) : new Date();
     
        let task = await Task.create({title, team, date, stage: stage.toLowerCase(), priority : priority.toLowerCase(), assets});
        if (!task) {
            return res.status(400).json({ message: 'Task creation failed' });
        }

        let text = "A new task has been assigned to you";
        if(task.team.length > 1) {
            text += ` and ${task.team.length - 1} other member/s.`;
        }

        text += ` The task priority is ${task.priority} and the due date is ${task.date.toDateString()}.`;

        await Notification.create({
            team,
            text, 
            task: task._id,
        })

        return res.status(201).json({message: "Task created successfully: " , task});


    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}
export const duplicateTask = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Duplicating task with ID:', id);
        const { userID } = req.user;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Task ID' });
        }

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        let text = `A new task has been assigned to you: ${task.title}.`;
        const { title, team, stage, date, priority, assets } = task;
        text =
            text +
            ` The task priority is set to ${
                task.priority
            } priority, so check and act accordingly. The task date is ${new Date(
                task.date
            ).toDateString()}. Thank you!!!`;

        const activity = {
            type: 'assigned',
            activity: text,
            by: userID,
        }

        const newTask = await Task.create({
            title: title + ' (copy)',
            team,
            date,
            stage: stage.toLowerCase(),
            priority: priority.toLowerCase(),
            assets,
        });

        
        if (!newTask) {
            return res.status(400).json({ message: 'Task duplication failed' });
        }
        newTask.activities.push(activity);
        await newTask.save();

        const text2 = `A duplicate task "${newTask.title}" has been created with priority "${newTask.priority}" and due date ${newTask.date.toDateString()}.`;

        await Notification.create({
            team,
            text2,
            task: newTask._id,
        });

        return res.status(200).json({
            message: 'Task duplicated successfully',
            task: newTask,
        });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
};
export const postTaskActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, activity } = req.body;
        const { userID } = req.user;
        
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        const activityData = {
            type,
            activity,
            by: userID,
        };
        task.activity.push(activityData);

        await task.save();
        const text = `A new activity has been added to the task: ${task.title}. The activity type is ${type} and the activity is ${activity}.`;
        await Notification.create({
            team: task.team,
            text, 
            task: task._id,
        })
        return res.status(200).json({ message: 'Activity added successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}
export const dashboardStatistics = async (req, res) => {
    try {
        const { userID, isAdmin } = req.user;
        console.log('User ID:', userID, 'Is Admin:', isAdmin);
        const allTasks = isAdmin ? 
            await Task.find({isTrashed: false}).populate({path: 'team', select: 'name role title email'}).sort({createdAt: -1}) 
            : await Task.find({team: {$all: [userID]}, isTrashed: false}).populate({path: 'team', select: 'name role title email'}).sort({createdAt: -1}); 

        const allUsers = await User.find({isActive: true}).select('name role title isAdmin createdAt').limit(10).sort({createdAt: -1});
        
        const totalTasks = allTasks.length;
        const last10Tasks = allTasks.slice(0, 10);
        const groupByStage = allTasks.reduce((acc, task) => {
            const stage = task.stage;
            if(!acc[stage]) {
                acc[stage] = 1;
            } else acc[stage]++;
            return acc;
        },{});
        const groupByPriority = Object.entries(allTasks.reduce((acc, task) => {
            const priority = task.priority;
            acc[priority] = (acc[priority] || 0) + 1;
            return acc;
        },{})).map(([name, total]) => ({name, total}));

        const summary = {
            users: isAdmin ? allUsers : [],
            totalTasks,
            last10Tasks,
            groupByStage,
            groupByPriority,
        }

        return res.status(200).json({status: 'success', ...summary, message: 'Dashboard statistics retrieved successfully'});   

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}
export const getTasks = async (req, res) => {
  try {
    const { stage, isTrashed } = req.query;
    const { userID, isAdmin } = req.user;

    console.log('Stage:', stage, 'Is Trashed:', isTrashed);
    console.log('User ID:', userID, 'Is Admin:', isAdmin);

    let query = {};

    // Only show the user's own tasks unless admin
    if (!isAdmin) {
      query.team = { $in: [userID] };
    }

    if (typeof isTrashed !== "undefined") {
      query.isTrashed = isTrashed === "true";
    }

    if (stage) {
      query.stage = stage;
    }

    const tasks = await Task.find(query)
      .populate({ path: 'team', select: 'name title email' })
      .sort({ createdAt: -1 });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found' });
    }

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error: ' + error.message });
  }
}

export const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id)
            .populate({path: 'team', select: 'name title email'})
            .populate({path: 'activity.by', select: 'name'})
            .sort({createdAt: -1});
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}
export const createSubTask = async (req, res) => {
    try {
        const { title, date = new Date(), tag } = req.body;
        const { id } = req.params;  
        const subtask = {
            title,
            date,
            tag,
            isCompleted: false,
        }
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task.subTasks.push(subtask);
        await task.save();
        const text = `A new subtask has been added to the task: ${task.title}. The subtask title is ${title} and the due date is ${new Date(date).toDateString()}.`;
        await Notification.create({
            team: task.team,
            text, 
            task: task._id,
        });
        return res.status(200).json({ message: 'Subtask added successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, team, stage, date, priority, assets } = req.body;

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.title = title;
        task.team = team;
        task.stage = stage.toLowerCase();
        task.date = date;
        task.priority = priority.toLowerCase();
        task.assets = assets;
        await task.save();
        const text = `The task has been updated: ${task.title}. The new priority is ${task.priority} and the due date is ${task.date.toDateString()}.`;
        await Notification.create({
            team,
            text, 
            task: task._id,
        });
        return res.status(200).json({ message: 'Task updated successfully' });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}
export const trashTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task.isTrashed = true;
        await task.save();
        const text = `The task has been trashed: ${task.title}.`;
        await Notification.create({
            team: task.team,
            text, 
            task: task._id,
        });
        return res.status(200).json({ message: `Task ${task.isTrashed ? 'trashed' : 'untrashed'} successfully` });  
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}
export const deleteRestoreTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { actionType } = req.query;

        if (['delete', 'restore'].includes(actionType)) {
            const task = await Task.findById(id);
            if (!task) return res.status(404).json({ message: 'Task not found' });

            if (actionType === 'delete') {
                await task.deleteOne();
                await Notification.create({
                    team: task.team,
                    text: `The task has been deleted: ${task.title}.`,
                    task: task._id,
                });
                return res.status(200).json({ message: 'Task deleted successfully' });
            } else {
                task.isTrashed = false;
                await task.save();
                await Notification.create({
                    team: task.team,
                    text: `The task has been restored: ${task.title}.`,
                    task: task._id,
                });
                return res.status(200).json({ message: 'Task restored successfully' });
            }
        }

        if (['deleteAll', 'restoreAll'].includes(actionType)) {
            const tasks = await Task.find({ isTrashed: true });
            if (!tasks.length) return res.status(404).json({ message: 'No trashed tasks found' });

            if (actionType === 'deleteAll') {
                await Task.deleteMany({ isTrashed: true });
                await Notification.create({
                    team: tasks[0].team,
                    text: `All trashed tasks have been deleted.`,
                    task: tasks[0]._id,
                });
                return res.status(200).json({ message: 'All trashed tasks deleted successfully' });
            } else {
                await Task.updateMany({ isTrashed: true }, { isTrashed: false });
                await Notification.create({
                    team: tasks[0].team,
                    text: `All trashed tasks have been restored.`,
                    task: tasks[0]._id,
                });
                return res.status(200).json({ message: 'All trashed tasks restored successfully' });
            }
        }

        return res.status(400).json({ message: 'Invalid action type' });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
};

// export const registerUser = async (req, res) => {
//     try {
        
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal server error: ' + error.message });
//     }
// }