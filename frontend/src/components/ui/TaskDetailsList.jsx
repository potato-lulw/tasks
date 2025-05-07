import { formatDate, TASK_TYPE } from '@/utils/utils'
import React, { useState } from 'react'
import { MdChecklist, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from 'react-icons/md'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import UserInfo from './UserInfo'
import { FaRegCommentDots } from 'react-icons/fa'
import { HiPaperClip } from 'react-icons/hi'
import Assets from './Assets'
import { users } from '@/assets/data'
import CustomDialog from './CustomDialog'
import AddTaskForm from './AddTaskForm'

const TaskDetailsList = ({ tasks }) => {


    const [taskTitle, setTaskTitle] = useState('');
    const [assignedUser, setAssignedUser] = useState('');
    const [taskStage, setTaskStage] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const icons = {
        high: <MdKeyboardDoubleArrowUp size={24} />,
        medium: <MdKeyboardArrowUp size={24} />,
        low: <MdKeyboardArrowDown size={24} />
    }
    const handleEditSubmit = (updated) => {
        // call your API / context / parent callback
        console.log('saving edits for', updated);
    };
    const handleDelete = () => {
        // call your API / context / parent callback
        console.log('deleting task');
    };



    return (
        <Table className={`bg-background rounded-xl text-xs`}>

            <TableHeader>
                <TableRow>
                    <TableHead className="w-[80px] sm:w-[120px] md:w-[160px]">Task Title</TableHead>
                    <TableHead className="w-[80px] sm:w-[100px]">Priority</TableHead>
                    <TableHead className="w-[100px] sm:w-[160px]">Created at</TableHead>
                    <TableHead className="w-[100px] sm:w-[160px]">Stats</TableHead>
                    <TableHead className="w-[100px] sm:w-[160px]">Team</TableHead>
                    <TableHead className="text-right w-[100px] sm:w-[140px]">Actions</TableHead>

                </TableRow>
            </TableHeader>

            <TableBody>
                {tasks.map((task) => (
                    <TableRow key={task._id}>
                        <TableCell className="align-middle font-medium max-w-[100px] sm:max-w-none overflow-auto whitespace-nowrap text-ellipsis">
                            <div className="inline-flex items-center gap-2">
                                <div className={`${TASK_TYPE[task.stage]} rounded-full h-4 w-4`}></div>
                                {task.title}
                            </div>
                        </TableCell>

                        <TableCell className="align-middle">
                            {task.priority === 'high'
                                ? icons.high
                                : task.priority === 'medium'
                                    ? icons.medium
                                    : icons.low}
                        </TableCell>
                        <TableCell className="align-middle">
                            {formatDate(new Date(task.createdAt))}
                        </TableCell>
                        <TableCell className="align-middle">
                            <Assets task={task} />
                        </TableCell>

                        <TableCell className="align-middle">
                            <div className="flex -space-x-2">
                                {task.team.map(({ _id, name, title, email }, index) => (
                                    <div key={_id}>

                                        <UserInfo name={name} title={title} email={email} index={index} />
                                    </div>

                                ))}
                            </div>
                        </TableCell>


                        <TableCell className="align-middle text-right">
                            <div className='flex flex-col gap-2'>
                                <CustomDialog
                                    title="Edit Task"
                                    description="Change the fields below and save."
                                    submitLabel="Save"
                                    onSubmit={() => handleEditSubmit({
                                        id: task._id,
                                        title: taskTitle,
                                        assigned: assignedUser,
                                        stage: taskStage,
                                        date: taskDate,
                                        priority: taskPriority,
                                    })}
                                    triggerLabel={

                                        <p onClick={() => {
                                            setTaskTitle(task.title);
                                            setAssignedUser(task.assignedUser);
                                            setTaskStage(task.stage);
                                            setTaskDate(task.date);
                                            setTaskPriority(task.priority);
                                        }}>Edit</p>

                                    }
                                    triggerIcon={null}
                                    customCss="hover:cursor-pointer text-blue-500 self-end"

                                >
                                    {/* inside the dialog render your form, wired up to local state */}
                                    <AddTaskForm
                                        users={users}
                                        taskTitle={taskTitle} setTaskTitle={setTaskTitle}
                                        assignedUser={assignedUser} setAssignedUser={setAssignedUser}
                                        taskStage={taskStage} setTaskStage={setTaskStage}
                                        taskDate={taskDate} setTaskDate={setTaskDate}
                                        taskPriority={taskPriority} setTaskPriority={setTaskPriority}
                                        selectedFile={selectedFile} setSelectedFile={setSelectedFile}
                                    />
                                </CustomDialog>
                                <CustomDialog
                                    title="Delete Task"
                                    description="Are you sure you want to delete this task?"
                                    submitLabel="Delete"
                                    onSubmit={handleDelete}
                                    triggerLabel='Delete'
                                    triggerIcon={null}
                                    customCss="hover:cursor-pointer text-destructive self-end"
                                />

                            </div>
                        </TableCell>
                    </TableRow>

                ))}
            </TableBody>

        </Table>
    )
}

export default TaskDetailsList