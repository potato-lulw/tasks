import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { BiMessageAltAdd } from "react-icons/bi";
import { CiCircleList } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";
import { TASK_TYPE } from '@/utils/utils';
import { FaPlus } from "react-icons/fa6";
import { tasks } from '@/assets/data';
import TaskDetailsCard from '@/components/ui/TaskDetailsCard';
import TaskDetailsCardSkeleton from '@/components/ui/TaskDetailsCardSkeleton';
import TaskDetailsList from '@/components/ui/TaskDetailsList';

const Task = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(false);

  return (
    <div className='h-full  flex flex-col gap-4 my-2'>
      <div className='flex items-center justify-between py-2'>
        <p className='text-2xl font-medium'>Tasks</p>
        <Button className="font-medium flex gap-2 py-6 px-4 items-center md:text-xl text-base hover:cursor-pointer">
          <BiMessageAltAdd size={24} />
          <p>Create Task</p>
        </Button>

      </div>
      <div className='flex gap-4 items-center'>

        <Button variant={'secondary'} onClick={() => setList(false)} className={`border border-border hover:cursor-pointer flex items-center gap-2`}><CiGrid41 />Grid View</Button>
        <Button variant={'secondary'} onClick={() => setList(true)} className={`border border-border hover:cursor-pointer flex items-center gap-2`}><CiCircleList />List View</Button>

      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        <div className='flex flex-row items-center justify-between gap-4 bg-background p-3 rounded-xl border border-border'>
          <div className='flex items-center gap-4'>

            <div className={`w-4 h-4 rounded-full ${TASK_TYPE.completed}`}></div>
            <p>Completed</p>
          </div>
          <FaPlus />
        </div>
        <div className='flex flex-row items-center justify-between gap-4 bg-background p-3 rounded-xl border border-border'>
          <div className='flex items-center gap-4'>
            <div className={`w-4 h-4 rounded-full ${TASK_TYPE['in progress']}`}></div>
            <p>In Progress</p>
          </div>
          <FaPlus />
        </div>
        <div className='flex flex-row items-center justify-between gap-4 bg-background p-3 rounded-xl border border-border'>
          <div className='flex items-center gap-4'>
            <div className={`w-4 h-4 rounded-full ${TASK_TYPE.todo}`}></div>
            <p>Todo</p>
          </div>
          <FaPlus />
        </div>
      </div>

      {
        loading ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {[1,2,3,4,5].map((_, i) => (
              <TaskDetailsCardSkeleton key={i} />
            ))}
          </div>
        )
          :
          (
            list ? <TaskDetailsList tasks={tasks}/> : (<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {
                tasks.map((task) => {
                  return (
                    <TaskDetailsCard task={task} key={task._id} />
                  )
                })
              }
            </div>)


          )
      }




    </div>
  )
}

export default Task