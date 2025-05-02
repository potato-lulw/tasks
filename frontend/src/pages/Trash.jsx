import React from 'react'
import { tasks } from '@/assets/data'
import TaskTable from '@/components/ui/TaskTable'
import { Button } from '@/components/ui/button'

import { BiTrash, BiReset } from 'react-icons/bi'

const Trash = () => {
  console.log(tasks)
  const trashedtasks = tasks.filter(task => task.isTrashed === true)
  console.log(trashedtasks)
  return (

    <div className='h-full flex flex-col gap-4 my-2 w-full'>

      <div className='flex items-center justify-between py-2'>
        <p className='text-2xl font-medium'>Trash</p>

        <div className='flex items-center gap-4'>
          <Button className="font-medium flex gap-2 py-3 px-2 items-center text-sm bg-green-500 hover:cursor-pointer">
            <BiReset className=" text-lg" />
            <p>Restore All</p>
          </Button>

          <Button className="font-medium  flex gap-2 py-3 px-2 items-center text-sm bg-red-400 hover:cursor-pointer">
            <BiTrash className=" text-lg" />
            <p>Delete All</p>
          </Button>
        </div>
      </div>
      <TaskTable tasks={trashedtasks} isTrash={true} />
    </div>
  )
}

export default Trash