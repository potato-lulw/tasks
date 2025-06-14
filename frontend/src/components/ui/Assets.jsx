import React from 'react'
import { FaRegCommentDots } from 'react-icons/fa'
import { HiPaperClip } from 'react-icons/hi'
import { MdChecklist } from 'react-icons/md'
import UserInfo from './UserInfo'

const Assets = ({ task }) => {
    return (


        <div className="flex gap-4 my-2 items-center text-gray-500 text-sm">
            <div className="flex items-center gap-1">
                <FaRegCommentDots size={14} />
                <span>{task.activities?.length || 0}</span>
            </div>
            <div className="flex items-center gap-1">
                <HiPaperClip size={14} />
                <span>{task.assets?.length || 0}</span>
            </div>
            <div className="flex items-center gap-1">
                <MdChecklist size={14} />
                <span>0/{task.subTasks?.length}</span>
            </div>
        </div>



    )
}

export default Assets