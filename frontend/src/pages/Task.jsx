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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddTaskForm from '@/components/ui/AddTaskForm';
import { users } from '@/assets/data'
import CustomDialog from '@/components/ui/CustomDialog';

const Task = () => {
  // const [loading, setLoading] = useState(false);
  const loading = false;
  const [list, setList] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [assignedUser, setAssignedUser] = useState('');
  const [taskStage, setTaskStage] = useState('');
  const [taskDate, setTaskDate] = useState(null);
  const [taskPriority, setTaskPriority] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const taskStages = [
    { label: 'Completed', colorClass: TASK_TYPE.completed },
    { label: 'In Progress', colorClass: TASK_TYPE['in progress'] },
    { label: 'Todo', colorClass: TASK_TYPE.todo },
  ];

  const handleTaskSubmit = () => { }

  const handleSubmit = async () => {

  }
  return (
    <div className='h-full  flex flex-col gap-4 my-2'>
      <div className='flex items-center justify-between py-2'>
        <p className='text-2xl font-medium'>Tasks</p>
        <CustomDialog
          triggerLabel='Create Task'
          description='Fill in the details below to create a task.'
          onSubmit={handleSubmit}
          submitLabel='Submit'
          title='Create Task'
          triggerIcon={<BiMessageAltAdd size={16} />}
          customCss='bg-primary text-secondary p-2'
        >
          <AddTaskForm
            users={users}
            taskTitle={taskTitle}
            setTaskTitle={setTaskTitle}
            assignedUser={assignedUser}
            setAssignedUser={setAssignedUser}
            taskStage={taskStage}
            setTaskStage={setTaskStage}
            taskDate={taskDate}
            setTaskDate={setTaskDate}
            taskPriority={taskPriority}
            setTaskPriority={setTaskPriority}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
        </CustomDialog>


      </div>
      <div className='flex gap-4 items-center'>

        <Button variant={'secondary'} onClick={() => setList(false)} className={`border border-border hover:cursor-pointer flex items-center gap-2`}><CiGrid41 />Grid View</Button>
        <Button variant={'secondary'} onClick={() => setList(true)} className={`border border-border hover:cursor-pointer flex items-center gap-2`}><CiCircleList />List View</Button>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {taskStages.map(({ label, colorClass }) => (
          <CustomDialog
            key={label}
            title={`Add ${label} Task`}
            description={`Add a task to the ${label} stage.`}
            triggerLabel={
              <div
                onClick={() => setTaskStage(label)}
                className="flex flex-row items-center justify-between gap-4 bg-background p-3 w-full rounded-xl border border-border cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full ${colorClass}`}></div>
                  <p>{label}</p>
                </div>
                <FaPlus />
              </div>
            }
            triggerIcon=""
            customCss="bg-none text-foreground"
            onSubmit={(data) => handleTaskSubmit(data, label)}
          >
            <AddTaskForm
              users={users}
              taskTitle={taskTitle}
              setTaskTitle={setTaskTitle}
              assignedUser={assignedUser}
              setAssignedUser={setAssignedUser}
              taskStage={taskStage}
              setTaskStage={setTaskStage}
              taskDate={taskDate}
              setTaskDate={setTaskDate}
              taskPriority={taskPriority}
              setTaskPriority={setTaskPriority}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
          </CustomDialog>
        ))}
      </div>



      {
        loading ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {[1, 2, 3, 4, 5].map((_, i) => (
              <TaskDetailsCardSkeleton key={i} />
            ))}
          </div>
        )
          :
          (
            list ? <TaskDetailsList tasks={tasks} /> : (<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
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