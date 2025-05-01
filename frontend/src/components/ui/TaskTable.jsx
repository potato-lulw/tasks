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
import { tasks } from "@/assets/data"
import { formatDate, getInitials } from "@/utils/utils"
import { TASK_TYPE } from "@/utils/utils"
const TaskTable = () => {


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
                                {task.team.map((member, index) => {
                                    const bgColors = ["#f0766e", "#facc15", "#1d4ed8"];
                                    const colorClass = bgColors[index % bgColors.length];

                                    return (
                                        <div
                                            key={member._id}
                                            className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-sm bg-[${colorClass}]`}
                                            title={member.name}
                                        >
                                            {getInitials(member.name)}
                                        </div>
                                    );
                                })}
                            </div>
                        </TableCell>


                        <TableCell className="align-middle text-right">
                            {formatDate(new Date(task.createdAt))}
                        </TableCell>
                    </TableRow>

                ))}
            </TableBody>

        </Table>
    )
}

export default TaskTable