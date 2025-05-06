import React from 'react'
import { Input } from './input'
import { DatePicker } from './DatePicker'

const AddSubtaskForm = ({ taskTitle, setTaskTitle, taskDate, setTaskDate, taskTag, setTaskTag }) => {
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <p className="mb-1">Subtask Title</p>
        <Input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Enter subtask title"
          className="w-full"
        />
      </div>
      <div className='flex items-center gap-2'>
        <div className=''>
          <p className="mb-1">Task Date</p>
          <DatePicker date={taskDate} setDate={setTaskDate} />
        </div>
        <div>

          <p className="mb-1">Task Tag</p>
          <Input
            type="text"
            value={taskTag}
            onChange={(e) => setTaskTag(e.target.value)}
            placeholder="Enter task tag"
            className="w-full"
          />
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default AddSubtaskForm