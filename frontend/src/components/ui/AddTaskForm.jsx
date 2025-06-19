import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "./DatePicker";
import  AssignedUserSelect  from "./AssignedUserSelect";

const AddTaskForm = ({ users }) => {
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <form id="add-task-form" className="flex flex-col gap-4">
      {/* Task Title */}
      <div>
        <p className="mb-1">Task Title</p>
        <Input {...register("title")} placeholder="Enter task title" />
      </div>

      {/* Assigned Users */}
      <div>
        <p className="mb-1">Assign Users</p>
        <Controller
          control={control}
          name="assignedUsers"
          render={({ field }) => (
            <AssignedUserSelect
              users={users}
              selectedUsers={field.value}
              setSelectedUsers={field.onChange}
            />
          )}
        />
      </div>

      {/* Stage & Date */}
      <div className="flex items-center gap-2">
        <div className="w-full">
          <p className="mb-1">Task Stage</p>
          <Controller
            control={control}
            name="stage"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full border-2">
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">Todo</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="w-full">
          <p className="mb-1">Task Date</p>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePicker date={field.value} setDate={field.onChange} />
            )}
          />
        </div>
      </div>

      {/* Priority & File Upload */}
      <div className="flex items-center gap-2">
        <div className="w-full">
          <p className="mb-1">Priority</p>
          <Controller
            control={control}
            name="priority"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full border-2">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="w-full">
          <p className="mb-1">Upload Asset</p>
          <Input
            type="file"
            onChange={(e) => setValue("asset", e.target.files?.[0])}
          />
        </div>
      </div>
    </form>
  );
};

export default AddTaskForm;
