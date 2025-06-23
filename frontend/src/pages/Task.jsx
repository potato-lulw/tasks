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

import CustomDialog from '@/components/ui/CustomDialog';
import { useParams } from 'react-router-dom';
import { useCreateTaskMutation, useGetTasksQuery } from '@/redux/slices/api/taskApiSlice';
import { useForm, FormProvider } from 'react-hook-form';
import TaskStageDialog from '@/components/ui/TaskStageDialogue';
import { useGetTeamQuery } from '@/redux/slices/api/userApiSlice';
import { toast } from 'sonner';

const Task = () => {
  const { status } = useParams();
  const { data: tasks = [], isLoading } = useGetTasksQuery({
    stage: status,
    isTrashed: "false",
  });
  const { data: users = [] } = useGetTeamQuery();
  const [createTask] = useCreateTaskMutation();

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

  const handleCreateTask = async (data) => {
    console.log("✅ Submitted Task:", data);
    // title, team, stage, priority, assets
    try {
      await createTask({title: data.title, team: data.assignedUsers, stage: data.stage, priority: data.priority}).unwrap();
      methods.reset(defaultValues);
      toast.success("Task created successfully!");
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task: " + (error?.data?.message || error?.error));
    }
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
          onSubmit={methods.handleSubmit(handleCreateTask)}
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
          <div className='bg-background p-2 rounded-lg border border-border'>

            <TaskDetailsList tasks={tasks} />
          </div>
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
