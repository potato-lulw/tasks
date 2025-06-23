import { useForm, FormProvider } from 'react-hook-form';
import CustomDialog from './CustomDialog';
import AddTaskForm from './AddTaskForm';
import { formatDate, TASK_TYPE } from '@/utils/utils';
import UserInfo from './UserInfo';
import Assets from './Assets';
import { MdKeyboardDoubleArrowUp, MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

const icons = {
  high: <MdKeyboardDoubleArrowUp size={24} />,
  medium: <MdKeyboardArrowUp size={24} />,
  low: <MdKeyboardArrowDown size={24} />,
};

const TaskRow = ({ task, users, onEdit, onDelete }) => {
  const methods = useForm({
    defaultValues: {
      title: task.title,
      assignedUsers: task.team || [],
      stage: task.stage,
      date: task.date,
      priority: task.priority,
      asset: null,
    },
  });

  return (
    <tr>
      <td>
        <div className="inline-flex items-center gap-2">
          <div className={`${TASK_TYPE[task.stage]} rounded-full h-4 w-4`} />
          {task.title}
        </div>
      </td>
      <td>{icons[task.priority]}</td>
      <td>{formatDate(new Date(task.createdAt))}</td>
      <td><Assets task={task} /></td>
      <td>
        <div className="flex -space-x-2">
          {task.team.map((user, i) => (
            <UserInfo key={user._id} {...user} index={i} />
          ))}
        </div>
      </td>
      <td className="text-right">
        <div className="flex flex-row gap-2 justify-end">
          <CustomDialog
            title="Edit Task"
            description="Change the fields below and save."
            submitLabel="Save"
            onSubmit={methods.handleSubmit((data) => onEdit({id:task._id, ...data}))}
            triggerLabel="Edit"
            customCss="hover:cursor-pointer text-blue-500"
          >
            <FormProvider {...methods}>
              <AddTaskForm users={users} />
            </FormProvider>
          </CustomDialog>

          <CustomDialog
            title="Delete Task"
            description="Are you sure you want to delete this task?"
            submitLabel="Delete"
            onSubmit={() => onDelete(task._id)}
            triggerLabel="Delete"
            customCss="hover:cursor-pointer text-destructive"
          />
        </div>
      </td>
    </tr>
  );
};

export default TaskRow;
