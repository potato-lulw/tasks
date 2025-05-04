import React from 'react'
import { useParams } from 'react-router-dom'

import { formatDate, getInitials, PRIOTITYSTYLES, TASK_TYPE } from '@/utils/utils'
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from "react-icons/md";
import { CiCircleList, CiViewList } from 'react-icons/ci';
import { Button } from '@/components/ui/button';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import ActivityTimeline from '@/components/ui/ActivityTimeline';



let task = {
  _id: "65c5f12ab5204a81bde866a9",
  title: "Test task",
  date: "2024-02-09T00:00:00.000Z",
  priority: "high",
  stage: "todo",
  assets: [
    "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707471138863original-a005132062ca5bafc505c4c74f0e1865.jpg?alt=media&token=55f909f2-7f05-42f3-af4f-dc7f87cdea1d",
    "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707471144712PsZch9E1_400x400.jpg?alt=media&token=7ce62c7e-c240-4032-83c6-bb6c9cdc0d4b",
  ],
  team: [
    {
      _id: "65c202d4aa62f32ffd1303cc",
      name: "Codewave Asante",
      title: "Administrator",
      email: "admin@gmail.com",
    },
    {
      _id: "65c30b96e639681a13def0b5",
      name: "Jane Smith",
      title: "Product Manager",
      email: "jane.smith@example.com",
    },
    {
      _id: "65c317360fd860f958baa08e",
      name: "Alex Johnson",
      title: "UX Designer",
      email: "alex.johnson@example.com",
    },
  ],
  isTrashed: false,
  activities: [
    {
      _id: "0",
      type: "started",
      activity: "started this task.",
      date: new Date("2023-01-15").toISOString(),
      by: "Akwasi Asante",
    },
    {
      _id: "1",
      type: "commented",
      activity:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam.",
      date: new Date("2023-01-15").toISOString(),
      by: "Eduardo Benz",
    },
    {
      _id: "2",
      type: "assigned",
      activity: "task to Codewave Asante",
      date: new Date("2023-01-15").toISOString(),
      by: "Akwasi Asante",
    },

    {
      _id: "3",
      type: "in progress",
      activity:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum.",
      date: new Date("2024-01-15").toISOString(),
      by: "Jason Meyers",
    },
    {
      _id: "5",
      type: "bug",
      activity: "bug to Codewave Asante",
      date: new Date("2023-01-15").toISOString(),
      by: "Akwasi Asante",
    },
    {
      _id: "4",
      type: "completed",
      activity: "Codewave Asante has completed the task assigned",
      date: new Date("2023-01-15").toISOString(),
      by: "Akwasi Asante",
    },
  ],
  subTasks: [
    {
      title: "Task manager youtube tutorial",
      date: "2024-02-09T00:00:00.000Z",
      tag: "tutorial",
      _id: "65c5f153b5204a81bde866c8",
    },
  ],
  createdAt: "2024-02-09T09:32:26.574Z",
  updatedAt: "2024-02-09T09:36:53.339Z",
  __v: 1,
}

const TaskDetails = () => {
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(true)
  const PRIORITY_ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  }



  const images = [
    'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/31884248/pexels-photo-31884248/free-photo-of-close-up-of-hand-drilling-metal-in-workshop.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/31799768/pexels-photo-31799768/free-photo-of-hands-measuring-with-ruler-and-pen-in-workspace.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ]
  const { id } = useParams()
  return (
    <div className='h-full  flex flex-col gap-4 my-2'>
      <div className='flex items-center justify-between py-2'>
        <p className='text-2xl font-medium'>TaskId: {id} Details</p>


      </div>
      <div className='flex gap-4 items-center'>

        <Button variant={'secondary'} onClick={() => setIsDetailsOpen(true)} className={`border border-border hover:cursor-pointer flex items-center gap-2`}><CiCircleList />Task Details</Button>
        <Button variant={'secondary'} onClick={() => setIsDetailsOpen(false)} className={`border border-border hover:cursor-pointer flex items-center gap-2`}><CiViewList />Activities and Timeline</Button>

      </div>

      {isDetailsOpen && (
        <div className="bg-background rounded-xl flex flex-col lg:flex-row gap-4 justify-between p-3 md:p-6 border border-border min-h-[450px]">
          {/* Left section */}
          <div className="w-full md:flex-1 flex flex-col justify-between gap-8">
            {/* Priority and Stage */}
            <div className="flex gap-2 items-center">
              <span
                className={`flex flex-row gap-2 px-3 py-1 rounded-full items-center ${PRIOTITYSTYLES[task.priority]} ${task.priority === 'high'
                  ? 'bg-red-200'
                  : task.priority === 'medium'
                    ? 'bg-yellow-200'
                    : 'bg-green-200'
                  }`}
              >
                {PRIORITY_ICONS[task.priority]} {task.priority.toUpperCase()} PRIORITY
              </span>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${TASK_TYPE[task.stage]}`} />
                <p className="text-sm">{task.stage.toUpperCase()}</p>
              </div>
            </div>

            {/* Title and created date */}
            <div>
              <p className="text-gray-500 text-sm">Created at: {formatDate(new Date(task.createdAt))}</p>
              <p className="font-bold text-xl md:text-2xl">{task.title}</p>
            </div>

            {/* Subtask and asset count */}
            <div className="flex gap-2 items-center border-b border-t border-border w-full p-2">
              <div className="border-r border-border pr-2">
                <p>Subtask: {task.subTasks.length}</p>
              </div>
              <div>
                <p>Asset: {task.assets.length}</p>
              </div>
            </div>

            {/* Task Team */}
            <div className="w-full">
              <p className="text-gray-500 text-sm">Task Team</p>
              <div>
                {task.team?.map((member, index) => (
                  <div
                    className="flex flex-row gap-2 items-center py-2 border-t border-border w-full"
                    key={index}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full text-white flex items-center bg-purple-500 justify-center text-sm">
                        {getInitials(member.name)}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 justify-center items-start">
                      <p className="font-medium">{member.name}</p>
                      <p className="text-gray-500 text-sm">{member.title}</p>
                      <p className="text-gray-500 text-sm">{member.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtasks */}
            <div>
              <p className="text-gray-500 text-sm">Subtasks</p>
              <div>
                {task.subTasks?.map((subtask, index) => (
                  <div
                    className="flex flex-row gap-2 items-center py-2 border-t border-border w-full"
                    key={index}
                  >
                    <div className="bg-purple-500 rounded-full p-1">
                      <IoMdCheckmarkCircleOutline color="#fff" size={24} />
                    </div>
                    <div className="flex flex-col gap-1 justify-center items-start">
                      <p className="text-sm text-gray-500">
                        {formatDate(new Date(subtask.date))}{' '}
                        <span className="px-1 py-0.5 border border-border text-xs rounded-full text-primary bg-secondary">
                          {subtask.tag}
                        </span>
                      </p>
                      <p className="font-medium">{subtask.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right image grid */}
          <div className="w-full xl:w-1/3 lg:w-1/2  grid grid-cols-2 gap-2 items-start h-fit">
            {images.map((image, index) => (
              <div key={index} className="w-full  aspect-square overflow-hidden rounded-md">
                <img
                  src={image}
                  alt={`image-${index}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      )}



      {
        !isDetailsOpen &&
        <ActivitiesTimeline />


      }


    </div>
  )
}

export default TaskDetails


const ActivitiesTimeline = () => {


  return (
    <div className='bg-background rounded-xl flex flex-col lg:flex-row gap-8 justify-between p-3 md:p-6 border border-border min-h-[450px]'>
      <div>
        <ActivityTimeline activities={task.activities} />
      </div>
      <div className='flex flex-col gap-8'>
        <div>
          <p className="font-medium mb-2">Add Activity</p>
          <div className="flex flex-wrap gap-4">
            {['Started', 'Completed', 'In Progress', 'Commented', 'Bug', 'Assigned'].map((activity) => (
              <label key={activity} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="activity"
                  value={activity.toLowerCase()}
                  className="accent-blue-600"
                />
                {activity}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <textarea
            placeholder="Add a comment"
            className="w-full h-32 p-2 border border-gray-300 rounded-md resize-none"
          />
          <Button className="w-full mt-2">Add</Button>
        </div>
      </div>
    </div>
  )
}