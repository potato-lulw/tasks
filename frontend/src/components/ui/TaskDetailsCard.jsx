import React from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from "react-icons/md"
import { BsThreeDots } from "react-icons/bs";
import { formatDate, TASK_TYPE } from '@/utils/utils';
import { Button } from './button';
import { FaRegCommentDots } from 'react-icons/fa';
import { HiPaperClip } from 'react-icons/hi';
import { MdChecklist } from 'react-icons/md';
import { BiPlus } from 'react-icons/bi';
import UserInfo from './UserInfo';
import TaskDetailsCardSkeleton from './TaskDetailsCardSkeleton';
import Assets from './Assets';

const TaskDetailsCard = ({ task }) => {
    return (
        <div className='bg-background rounded-xl flex flex-col items-start justify-between gap-2 p-3 border border-border'>

            <div className='flex flex-col gap-2 max-h-[85px] w-full'>

                <div className='flex items-center justify-between w-full text-xs'>
                    <div className={`font-bold flex items-center gap-2  text-xs ${task.priority === 'high' ? 'text-destructive' : task.priority === 'medium' ? 'text-orange-500' : 'text-green-500'}`}>
                        {task.priority === 'high' ? <MdKeyboardDoubleArrowUp size={16} /> : task.priority === 'medium' ? <MdKeyboardArrowUp size={16} /> : <MdKeyboardArrowDown size={16} />}
                        <p >{task.priority.toUpperCase()}</p>
                    </div>
                    <BsThreeDots />
                </div>
                <div className='flex items-center gap-2 justify-start'>
                    <div className={`w-4 h-4 rounded-full ${TASK_TYPE[task.stage]}`}></div>
                    <p className='font-medium text-sm line-clamp-1'>{task.title}</p>
                </div>
                <div className='border-b border-border pb-2 w-full'>
                    <p className='text-gray-500'>{formatDate(new Date(task.createdAt))}</p>
                </div>
            </div>

            <div className='w-full'>
                <div className="flex justify-between items-center pt-1 w-full">
                    {/* Icons and counts */}
                    <Assets task={task}/>

                    {/* Team initials */}
                    <div className="flex -space-x-2">
                        {task.team?.map((member, index) => (
                            <UserInfo name={member.name} title={member.title} email={member.email} index={index} key={member._id}/>
                        ))}
                    </div>
                </div>
            </div>

            <div className='w-full flex-1 overflow-hidden'>
                <div className='w-full h-[80px] overflow-y-auto pr-1 space-y-2'>
                    {
                        task.subTasks.length > 0  ? (task.subTasks?.map((subtask) => (
                            <div className='flex justify-start items-start gap-2 flex-col w-full' key={subtask._id}>
                                <p className='font-medium text-sm w-full line-clamp-1 text-gray-500'>{subtask.title}</p>
                                <div className='p-2 flex items-center gap-2'>
                                    <p className='text-gray-500 text-xs'>{formatDate(new Date(subtask.date))}</p>
                                    <p className='text-xs bg-secondary p-1 px-2 rounded-full border border-border'>{subtask.tag}</p>
                                </div>
                            </div>
                        ))): (
                            <div>
                                <p className='font-medium text-sm w-full line-clamp-1 text-gray-500'>No Subtasks</p>
                            </div>
                        )
                    }
                </div>
            </div>

            <div>
                <Button variant={'outline'} className={'flex items-center gap-2'}><BiPlus size={16} />Add Subtask</Button>
            </div>

        </div>
    )
}

export default TaskDetailsCard