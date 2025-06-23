import { useGetTeamQuery } from '@/redux/slices/api/userApiSlice';
import TaskRow from './TaskRow';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { useDeleteTaskMutation, useEditTaskMutation } from '@/redux/slices/api/taskApiSlice';
import { toast } from 'sonner';


const TaskDetailsList = ({ tasks }) => {

    const { data: users } = useGetTeamQuery();
    const [editTask] = useEditTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();
    const handleEditSubmit = async (data) => {
        console.log("Saving edits for", data.id, data);
        try {
            const results = await editTask({
                id: data.id,
                title: data.title,
                team: data.assignedUsers,
                stage: data.stage,
                date: data.date,
                priority: data.priority,
                asset: data.asset
            }).unwrap();
            console.log("Task updated successfully:", results);
            toast.success("Task updated successfully!");
        } catch (error) {
            console.error("Error updating task:", error);
            toast.error("Failed to update task: " + (error.data?.message || error.message));
        }
    };

    const handleDelete = async (id) => {
        console.log("Deleting task", id);
        try {
            await deleteTask(id).unwrap();
            toast.success("Task deleted successfully!");
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error("Failed to delete task: " + (error.data?.message || error.message));
        }
    };

    return (
        <Table className="bg-background rounded-xl text-xs">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[260px]">Task Title</TableHead>
                    <TableHead className="w-[100px]">Priority</TableHead>
                    <TableHead className="w-[160px]">Created at</TableHead>
                    <TableHead className="w-[160px]">Stats</TableHead>
                    <TableHead className="w-[160px]">Team</TableHead>
                    <TableHead className="text-right w-[140px]">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tasks.map((task) => (
                    <TaskRow
                        key={task._id}
                        task={task}
                        users={users}
                        onEdit={handleEditSubmit}
                        onDelete={handleDelete}
                    />
                ))}
            </TableBody>
        </Table>
    );
};

export default TaskDetailsList;
