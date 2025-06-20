import React from 'react'

import TaskTable from '@/components/ui/TaskTable'
import { Button } from '@/components/ui/button'

import { BiTrash, BiReset } from 'react-icons/bi'
import CustomDialog from '@/components/ui/CustomDialog'
import { useDeleteRestoreTaskMutation, useGetTasksQuery } from '@/redux/slices/api/taskApiSlice'
import { toast } from 'sonner'
import SkeletonTable from '@/components/ui/SkeletonTable'

const Trash = () => {

  const {data: trashedTasks, isLoading, error } = useGetTasksQuery({
    isTrashed: true
  });
  const [deleteRestoreTask] = useDeleteRestoreTaskMutation();

  console.log(trashedTasks)

  const handleRestoreAllButton = async () => {
    console.log('restore all')
    try {
      await deleteRestoreTask({ actionType: 'restoreAll' }).unwrap();
      toast.success('All tasks restored successfully!');
    } catch (error) {
      console.error('Error restoring all tasks:', error);
      toast.error('Failed to restore all tasks: ' + error.data?.message || error.message);
    }
  }
  const handleDeleteAllTaskButton = async () => {
    console.log('delete all')
    try {
      await deleteRestoreTask({ actionType: 'deleteAll' }).unwrap();
      toast.success('All tasks deleted successfully!');
    } catch (error) {
      console.error('Error deleting all tasks:', error);
      toast.error('Failed to delete all tasks: ' + error.data?.message || error.message);
    }
  }
  return (

    <div className='h-full flex flex-col gap-4 my-2 w-full'>

      <div className='flex items-center justify-between py-2'>
        <p className='text-2xl font-medium'>Trash</p>

        <div className='flex items-center gap-4'>
          <CustomDialog
            title='Restore all tasks?'
            triggerLabel="Restore All"
            triggerIcon={<BiReset className=" text-lg" />}
            onSubmit={handleRestoreAllButton}
            description='Are you sure you want to restore all tasks?'
            submitLabel='Restore'
            customCss='bg-green-500 p-2 text-secondary font-medium'
            />
          
          
          <CustomDialog 
            triggerLabel="Delete All" 
            triggerIcon={<BiTrash className=" text-lg"/>} 
            className=" text-lg" 
            title='Delete all tasks?' 
            description='Are you sure you want to delete all tasks?' 
            customCss='bg-red-400 p-2 text-secondary font-medium' 
            onSubmit={handleDeleteAllTaskButton} 
            submitLabel='Delete'/>

          
        </div>
      </div>
      <div className='p-2 bg-background rounded-md shadow-md overflow-x-auto border-border border'>

      {isLoading ? <SkeletonTable rowCount={5} isTrash={true} /> : <TaskTable tasks={trashedTasks} isTrash={true} />}
      
      </div>
    </div>
  )
}

export default Trash