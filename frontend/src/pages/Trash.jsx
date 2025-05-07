import React from 'react'
import { tasks } from '@/assets/data'
import TaskTable from '@/components/ui/TaskTable'
import { Button } from '@/components/ui/button'

import { BiTrash, BiReset } from 'react-icons/bi'
import CustomDialog from '@/components/ui/CustomDialog'

const Trash = () => {
  console.log(tasks)
  const trashedtasks = tasks.filter(task => task.isTrashed === true)
  console.log(trashedtasks)
  const handleRestoreAllButton = () => {
    console.log('restore all')
  }
  const handleDeleteAllTaskButton = () => {
    console.log('delete all')
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
      <TaskTable tasks={trashedtasks} isTrash={true} />
    </div>
  )
}

export default Trash