import moment from 'moment';
import { MdOutlineMessage, MdPlayArrow, MdCheckCircle, MdUpdate } from 'react-icons/md';
import { FaTasks, FaRegClock } from 'react-icons/fa';

const TASKTYPEICON = {
  commented: (
    <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
      <MdOutlineMessage />
    </div>
  ),
  started: (
    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
      <MdPlayArrow />
    </div>
  ),
  completed: (
    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
      <MdCheckCircle />
    </div>
  ),
  updated: (
    <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white">
      <MdUpdate />
    </div>
  ),
  assigned: (
    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white">
      <FaTasks />
    </div>
  ),
  delayed: (
    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white">
      <FaRegClock />
    </div>
  ),
};

const dummyActivities = [
  {
    name: 'Codewave Asante',
    action: 'commented',
    timestamp: moment().subtract(1, 'hours').toISOString(),
    message: 'Hello Team',
  },
  {
    name: 'Jane Doe',
    action: 'started',
    timestamp: moment().subtract(2, 'hours').toISOString(),
    message: 'Working on the UI fixes.',
  },
  {
    name: 'John Smith',
    action: 'completed',
    timestamp: moment().subtract(1, 'days').toISOString(),
    message: 'Finished the backend API integration.',
  },
  {
    name: 'Alice Johnson',
    action: 'assigned',
    timestamp: moment().subtract(3, 'days').toISOString(),
    message: 'Assigned the new mobile feature.',
  },
];

export default function ActivityTimeline({activities}) {
  return (
    <div className="p-4">
      <h2 className="font-semibold text-lg mb-4">Activities</h2>
      <div className="relative pl-10 border-l border-gray-300 space-y-6">
        {activities.map((activity) => (
          <div key={activity._id} className="relative">
            <div className="absolute -left-15 top-0">
              {TASKTYPEICON[activity.type]}
            </div>
            <div className="ml-2">
              <p className="font-semibold">{activity.by}</p>
              <p className="text-sm text-gray-500">
                {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}{' '}
                <span className="ml-1">{moment(activity.date).fromNow()}</span>
              </p>
              <p className="mt-1">{activity.activity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
