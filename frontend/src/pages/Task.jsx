import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { BiMessageAltAdd } from "react-icons/bi";
import { CiCircleList, CiGrid41 } from "react-icons/ci";
import { TASK_TYPE } from '@/utils/utils';
import { FaPlus } from "react-icons/fa6";
import TaskDetailsCard from '@/components/ui/TaskDetailsCard';
import TaskDetailsCardSkeleton from '@/components/ui/TaskDetailsCardSkeleton';
import TaskDetailsList from '@/components/ui/TaskDetailsList';
import AddTaskForm from '@/components/ui/AddTaskForm';
import { users } from '@/assets/data';
import CustomDialog from '@/components/ui/CustomDialog';
import { useParams } from 'react-router-dom';
import { useGetTasksQuery } from '@/redux/slices/api/taskApiSlice';
import { useForm, FormProvider } from 'react-hook-form';
import TaskStageDialog from '@/components/ui/TaskStageDialogue';

const Task = () => {
  const { status } = useParams();
  const { data: tasks = [], isLoading } = useGetTasksQuery({
    stage: status,
    isTrashed: "false",
  });

  const [list, setList] = useState(false);

  const defaultValues = {
    title: "",
    assignedUsers: [],
    stage: "",
    date: null,
    priority: "",
    asset: null,
  };

  const methods = useForm({ defaultValues });

  const handleSubmit = async (data) => {
    console.log("✅ Submitted Task:", data);
    // send it to backend via mutation or api
  };

  const taskStages = [
    { label: 'Completed', colorClass: TASK_TYPE.completed },
    { label: 'In Progress', colorClass: TASK_TYPE['in progress'] },
    { label: 'Todo', colorClass: TASK_TYPE.todo },
  ];

  return (
    <div className='h-full flex flex-col gap-4 my-2'>

      {/* Header & Create Task */}
      <div className='flex items-center justify-between py-2'>
        <p className='text-2xl font-medium'>Tasks</p>
        <CustomDialog
          triggerLabel='Create Task'
          description='Fill in the details below to create a task.'
          onSubmit={methods.handleSubmit(handleSubmit)}
          submitLabel='Submit'
          title='Create Task'
          triggerIcon={<BiMessageAltAdd size={16} />}
          customCss='bg-primary text-secondary p-2'
        >
          <FormProvider {...methods}>
            <AddTaskForm users={users} />
          </FormProvider>
        </CustomDialog>
      </div>

      {/* View Switcher */}
      <div className='flex gap-4 items-center'>
        <Button
          variant='secondary'
          onClick={() => setList(false)}
          className='border border-border flex items-center gap-2'
        >
          <CiGrid41 /> Grid View
        </Button>
        <Button
          variant='secondary'
          onClick={() => setList(true)}
          className='border border-border flex items-center gap-2'
        >
          <CiCircleList /> List View
        </Button>
      </div>

      {/* Add Task to Stage Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {taskStages.map(({ label, colorClass }) => {
          <TaskStageDialog key={label} label={label} colorClass={colorClass} users={users} />
        })}
      </div>

      {/* Tasks Grid/List */}
      {
        isLoading ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {[...Array(5)].map((_, i) => <TaskDetailsCardSkeleton key={i} />)}
          </div>
        ) : list ? (
          <TaskDetailsList tasks={tasks} />
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {tasks.map((task) => (
              <TaskDetailsCard task={task} key={task._id} />
            ))}
          </div>
        )
      }
    </div>
  );
};

export default Task;
