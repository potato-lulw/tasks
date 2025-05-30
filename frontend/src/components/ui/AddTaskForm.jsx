import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { DatePicker } from './DatePicker'
import { Input } from './input'


const AddTaskForm = ({
    users,
    taskTitle,
    setTaskTitle,
    assignedUser,
    setAssignedUser,
    taskStage,
    setTaskStage,
    taskDate,
    setTaskDate,
    taskPriority,
    setTaskPriority,
    selectedFile,
    setSelectedFile,
    }) => {


    console.log(taskTitle, assignedUser, taskStage, taskDate, taskPriority, selectedFile)
    return (
        <div className='flex flex-col gap-4'>
            {/* Task Title */}
            <div>
                <p className="mb-1">Task Title</p>
                <Input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="Enter task title"
                    className="w-full"
                />
            </div>


            {/* Assign Task to */}
            <div>
                <p className="mb-1">Assign Task to</p>
                <Select onValueChange={setAssignedUser}>
                    <SelectTrigger className="w-full border-2">
                        <SelectValue placeholder={users[0]?.name || "Select user"} />
                    </SelectTrigger>
                    <SelectContent>
                        {users.map((user) => (
                            <SelectItem key={user._id} value={user._id}>
                                {user.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Task Stage & Task Date */}
            <div className='flex items-center gap-2'>
                <div className='w-full'>
                    <p className="mb-1">Task Stage</p>
                    <Select value={taskStage} onValueChange={setTaskStage}>
                        <SelectTrigger className="w-full border-2">
                            <SelectValue placeholder={taskStage != "" ? taskStage : "Select stage"} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Todo">Todo</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className='w-full'>
                    <p className="mb-1">Task Date</p>
                    <DatePicker date={taskDate} setDate={setTaskDate} />
                </div>
            </div>

            {/* Task Priority & Assets Upload */}
            <div className='flex items-center gap-2'>
                <div className='w-full'>
                    <p className="mb-1">Task Priority</p>
                    <Select value={taskPriority}  onValueChange={setTaskPriority}>
                        <SelectTrigger className="w-full border-2">
                            <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className='w-full'>
                    <p className="mb-1">Select Assets</p>
                    <Input
                        type="file"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                </div>
            </div>

            {/* Submit Button */}

        </div>
    );
};

export default AddTaskForm
