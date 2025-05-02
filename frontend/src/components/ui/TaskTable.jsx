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
const TaskTable = ({ tasks, isTrash = false }) => {


    const icons = {
        high: <MdKeyboardDoubleArrowUp size={24} />,
        medium: <MdKeyboardArrowUp size={24} />,
        low: <MdKeyboardArrowDown size={24} />
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
                {tasks.map((task) => (
                    <TableRow key={task._id}>
                        <TableCell className="align-middle font-medium max-w-[100px] sm:max-w-none overflow-auto whitespace-nowrap text-ellipsis">
                            <div className="inline-flex items-center gap-2">
                                <div className={`${TASK_TYPE[task.stage]} rounded-full h-4 w-4`}></div>
                                {task.title}
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
                                <button className="text-green-500"><BiRecycle size={20}/></button>
                                <button className="text-destructive"><BiTrash size={20}/></button>
                            </div>
                        </TableCell>}
                    </TableRow>

                ))}
            </TableBody>

        </Table>
    )
}

export default TaskTable