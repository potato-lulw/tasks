import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { formatDate, TASK_TYPE } from '@/utils/utils';
import { FaRegCommentDots, FaTrash, FaFolderOpen, FaEdit, FaPlus } from 'react-icons/fa';
import { HiPaperClip } from 'react-icons/hi';
import { MdChecklist } from 'react-icons/md';
import { BiPlus } from 'react-icons/bi';
import UserInfo from './UserInfo';
import Assets from './Assets';
import CustomDialog from './CustomDialog';
import AddTaskForm from './AddTaskForm';
import AddSubtaskForm from './AddSubtaskForm';
import { useNavigate } from 'react-router-dom';
import { useGetTeamQuery } from '@/redux/slices/api/userApiSlice';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteTaskMutation, useEditTaskMutation } from '@/redux/slices/api/taskApiSlice';
import { toast } from 'sonner';

const TaskDetailsCard = ({ task }) => {
    const { data: users, isLoading: usersLoading } = useGetTeamQuery();
    const navigate = useNavigate();
    const [editTask, isLoading, error] = useEditTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();
    const [subTaskTitle, setSubTaskTitle] = useState("");
    const [subTaskDate, setSubTaskDate] = useState("");
    const [subTaskTag, setSubTaskTag] = useState("");

    const handleEditSubmit = async (data) => {
        console.log("Saving edits for", task._id, data);
        try {
            const results = await editTask({
                id: task._id,
                title: data.title,
                team: data.assignedUsers,
                stage: data.stage,
                date: data.date,
                priority: data.priority,
                asset: data.asset 
            }).unwrap();
            console.log("Task updated successfully:", results);
            toast.success("Task updated successfully!");
        } catch (error) {
            console.error("Error updating task:", error);
            toast.error("Failed to update task: " + (error.data?.message || error.message));
        }
    };

    const handleDelete = async (id) => {
        console.log("Deleting task", id);
        try {
            await deleteTask(id).unwrap();
            toast.success("Task deleted successfully!");
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error("Failed to delete task: " + (error.data?.message || error.message));
        }
    };

    const handleSubtaskSubmit = () => {
        console.log("Add subtask logic here");
    };

    const editFormMethods = useForm({
        defaultValues: {
            title: task.title,
            assignedUsers: task.team || [],
            stage: task.stage,
            date: task.date,
            priority: task.priority,
            asset: null,
        }
    });


    return (
        <div className='bg-background rounded-xl flex flex-col items-start justify-between gap-2 p-3 border border-border'>
            <div className='flex flex-col gap-2 max-h-[85px] w-full'>
                <div className='flex items-center justify-between w-full text-xs'>
                    <div className={`font-bold flex items-center gap-2 text-xs ${task.priority === 'high'
                            ? 'text-destructive'
                            : task.priority === 'medium'
                                ? 'text-orange-500'
                                : 'text-green-500'
                        }`}>
                        {task.priority === 'high' ? <MdKeyboardDoubleArrowUp size={16} /> : task.priority === 'medium' ? <MdKeyboardArrowUp size={16} /> : <MdKeyboardArrowDown size={16} />}
                        <p>{task.priority.toUpperCase()}</p>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="p-2">
                            <BsThreeDots size={20} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-52">
                            <DropdownMenuLabel>Task Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem onClick={() => navigate(`/task/${task._id}`)} className="flex items-center gap-2 hover:bg-blue-100 hover:text-blue-600 cursor-pointer">
                                <FaFolderOpen />
                                Open Task
                            </DropdownMenuItem>

                            <CustomDialog
                                title="Edit Task"
                                description="Change the fields below and save."
                                submitLabel="Save"
                                onSubmit={editFormMethods.handleSubmit(handleEditSubmit)}
                                triggerLabel={
                                    <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                                        <FaEdit />
                                        Edit
                                    </DropdownMenuItem>
                                }
                            >
                                <FormProvider {...editFormMethods}>
                                    <AddTaskForm users={users} />
                                </FormProvider>
                            </CustomDialog>

                            <CustomDialog
                                title="Add Subtask"
                                description="Fill in the details of the new subtask."
                                triggerLabel={<div className="flex items-center gap-2">Add Sub-Task</div>}
                                onSubmit={handleSubtaskSubmit}
                                submitLabel="Add"
                                triggerIcon={<FaPlus className='text-muted-foreground' />}
                                customCss="text-primary p-2 hover:bg-secondary"
                            >
                                <AddSubtaskForm
                                    taskTitle={subTaskTitle}
                                    setTaskTitle={setSubTaskTitle}
                                    taskDate={subTaskDate}
                                    setTaskDate={setSubTaskDate}
                                    taskTag={subTaskTag}
                                    setTaskTag={setSubTaskTag}
                                />
                            </CustomDialog>

                            <CustomDialog
                                title='Delete Task'
                                triggerLabel={<div className="flex items-center gap-2 cursor-pointer">Delete</div>}
                                triggerIcon={<FaTrash />}
                                onSubmit={() => handleDelete(task._id)}
                                description='Are you sure you want to delete this task?'
                                customCss="text-red-500 p-2 hover:bg-secondary"
                                submitLabel='Delete'
                            />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className='flex items-center gap-2 justify-start'>
                    <div className={`w-4 h-4 rounded-full ${TASK_TYPE[task.stage]}`}></div>
                    <p className='font-medium text-sm line-clamp-1'>{task.title}</p>
                </div>
                <div className='border-b border-border pb-2 w-full'>
                    <p className='text-gray-500'>{formatDate(new Date(task.createdAt))}</p>
                </div>
            </div>

            <div className='w-full mt-2'>
                <div className="flex justify-between items-center p-2 w-full">
                    <Assets task={task} />
                    <div className="flex -space-x-2">
                        {task.team?.map((member, index) => (
                            <UserInfo name={member.name} title={member.title} email={member.email} index={index} key={member._id} />
                        ))}
                    </div>
                </div>
            </div>

            <div className='w-full flex-1 overflow-hidden'>
                <div className='w-full h-[80px] overflow-y-auto pr-1 space-y-2'>
                    {
                        task.subTasks.length > 0
                            ? task.subTasks.map((subtask) => (
                                <div key={subtask._id} className='flex justify-start items-start gap-2 flex-col w-full'>
                                    <p className='font-medium text-sm w-full line-clamp-1 text-gray-500'>{subtask.title}</p>
                                    <div className='p-2 flex items-center gap-2'>
                                        <p className='text-gray-500 text-xs'>{formatDate(new Date(subtask.date))}</p>
                                        <p className='text-xs bg-secondary p-1 px-2 rounded-full border border-border'>{subtask.tag}</p>
                                    </div>
                                </div>
                            ))
                            : <p className='font-medium text-sm w-full text-gray-500'>No Subtasks</p>
                    }
                </div>
            </div>

            <CustomDialog
                title='Add Subtask'
                description='Fill in the details of the new subtask.'
                triggerLabel='Add Subtask'
                triggerIcon={<BiPlus size={16} />}
                onSubmit={handleSubtaskSubmit}
                submitLabel='Add'
                customCss='bg-secondary text-primary p-2'
            >
                <AddSubtaskForm
                    taskTitle={subTaskTitle}
                    setTaskTitle={setSubTaskTitle}
                    taskDate={subTaskDate}
                    setTaskDate={setSubTaskDate}
                    taskTag={subTaskTag}
                    setTaskTag={setSubTaskTag}
                />
            </CustomDialog>
        </div>
    );
};

export default TaskDetailsCard;
