import React  from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from './input';
import { useFormContext, Controller } from "react-hook-form";

const AddUserForm = () => {
  const { register, control } = useFormContext();
  

  return (
    <div className='flex flex-col gap-4'>

      <div>
        <p>User Name</p>
        <Input
          type="text"
          placeholder="Enter full name"
          className="w-full"
          {...register("name")}
        />
      </div>

      <div>
        <p>Email Address</p>
        <Input
          type="email"
          placeholder="Enter email"
          className="w-full"
          {...register("email")}
        />
      </div>

      <div>
        <p>Title</p>
        <Input
          type="text"
          placeholder="e.g., Administrator"
          className="w-full"
          {...register("title")}
        />
      </div>

      <div>
        <p>Role</p>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full border-2">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Developer">Developer</SelectItem>
                <SelectItem value="Viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className='flex items-center gap-4'>
        <div className='w-full'>
          <p>Is Admin</p>
          <Controller
            name="isAdmin"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(val) => field.onChange(val === "true")}
                value={field.value?.toString()}
              >
                <SelectTrigger className="w-full border-2">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      

    </div>
  );
};

export default AddUserForm;
