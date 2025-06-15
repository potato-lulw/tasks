import React, { useEffect }  from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from './input';
import { useFormContext, Controller } from "react-hook-form";

const AddUserForm = ({data}) => {

  
  const { register, control, reset } = useFormContext();

  useEffect(() => {
    if (data) {
      reset({
        name: data.name || '',
        email: data.email || '',
        title: data.title || '',
        role: data.role || '',
        isAdmin: data.isAdmin || false,
      });
    }
  }, [data, reset]);

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
        <Input
          type="text"
          placeholder="e.g., Developer"
          className="w-full"
          {...register("role")}
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
