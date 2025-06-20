import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from "react-icons/md"

import { formatDate } from "@/utils/utils"
import { TASK_TYPE } from "@/utils/utils"
import UserInfo from "./UserInfo"
import { FiDelete } from "react-icons/fi"
import { BiRecycle, BiTrash } from "react-icons/bi"
import CustomDialog from "./CustomDialog"
import { toast } from "sonner"
import { useDeleteRestoreTaskMutation } from "@/redux/slices/api/taskApiSlice"
const TaskTable = ({ tasks, isTrash = false }) => {

    const [deleteRestoreTask] = useDeleteRestoreTaskMutation();


    const icons = {
        high: <MdKeyboardDoubleArrowUp size={24} />,
        medium: <MdKeyboardArrowUp size={24} />,
        low: <MdKeyboardArrowDown size={24} />
    }

    const handleRestoreButton = async (id) => {
        console.log('restoring task', id)
        try {
            await deleteRestoreTask({ id, actionType: 'restore' }).unwrap();
            toast.success('Task restored successfully!');
        } catch (error) {
            console.error('Error restoring task:', error);
            toast.error('Failed to restore task: ' + error.data?.message || error.message);
        }
    }

    const handleDeleteButton = async (id) => {
        console.log('deleting task', id)
        try {
            await deleteRestoreTask({ id, actionType: 'delete' }).unwrap();
            toast.success('Task deleted successfully!');
        } catch (error) {
            console.error('Error deleting task:', error);
            toast.error('Failed to delete task: ' + error.data?.message || error.message);
        }
    }

    return (
        <Table className={`bg-background rounded-xl text-xs`}>

            <TableHeader>
                <TableRow>
                    <TableHead className="w-[80px] sm:w-[120px] md:w-[160px]">Task Title</TableHead>
                    <TableHead className="w-[80px] sm:w-[100px]">Priority</TableHead>
                    <TableHead className="w-[100px] sm:w-[160px]">Team</TableHead>
                    <TableHead className="text-right w-[100px] sm:w-[140px]">Created At</TableHead>
                    {isTrash && <TableHead className="text-right w-[100px] sm:w-[140px]">Updated At</TableHead>}
                    {isTrash && <TableHead className="text-right w-[100px] sm:w-[140px]">Actions</TableHead>}
                </TableRow>
            </TableHeader>

            <TableBody>

                {tasks && tasks.map((task) => (
                    <TableRow key={task._id}>
                        <TableCell className="align-middle font-medium">
                            <div className="inline-flex items-center gap-2 max-w-[150px] overflow-hidden">
                                <div className={`${TASK_TYPE[task.stage]} rounded-full h-4 w-4`} />
                                <p className="overflow-hidden whitespace-nowrap text-ellipsis">
                                    {task.title}
                                </p>
                            </div>
                        </TableCell>

                        <TableCell className="align-middle">
                            {task.priority === 'high'
                                ? icons.high
                                : task.priority === 'medium'
                                    ? icons.medium
                                    : icons.low}
                        </TableCell>

                        <TableCell className="align-middle">
                            <div className="flex -space-x-2">
                                {task.team.map(({ _id, name, title, email }, index) => (
                                    <div key={_id}>

                                        <UserInfo name={name} title={title} email={email} index={index} />
                                    </div>

                                ))}
                            </div>
                        </TableCell>


                        <TableCell className="align-middle text-right">
                            {formatDate(new Date(task.createdAt))}
                        </TableCell>
                        {
                            isTrash && <TableCell className="align-middle text-right">
                                {formatDate(new Date(task.updatedAt))}
                            </TableCell>
                        }

                        {isTrash && <TableCell className=" text-right">
                            <div className="flex gap-2 text-right justify-end">
                                <CustomDialog
                                    title='Restore this task?'
                                    triggerLabel=""
                                    triggerIcon={<BiRecycle size={20} className="text-green-500" />}
                                    onSubmit={() => handleRestoreButton(task._id)}
                                    description='Are you sure you want to restore this task?'
                                    submitLabel='Restore'
                                    customCss=''
                                />


                                <CustomDialog
                                    title='Delete this task?'
                                    triggerLabel=""
                                    triggerIcon={<BiTrash size={20}
                                        className="text-destructive" />}
                                    description='Are you sure you want to delete this task?'
                                    submitLabel='Delete'
                                    onSubmit={() => handleDeleteButton(task._id)}
                                    customCss='' />

                            </div>
                        </TableCell>}
                    </TableRow>

                ))}
            </TableBody>

        </Table>
    )
}

export default TaskTable