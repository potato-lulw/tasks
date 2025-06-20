import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from './input';
import { DatePicker } from './DatePicker';

const AddSubtaskForm = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <div className='flex flex-col gap-4'>
      {/* Subtask Title */}
      <div>
        <p className="mb-1">Subtask Title</p>
        <Input
          {...register("title", { required: true })}
          placeholder="Enter subtask title"
          className="w-full"
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">Title is required</p>}
      </div>

      {/* Date & Tag */}
      <div className='flex items-center gap-2'>
        {/* Subtask Date */}
        <div>
          <p className="mb-1">Task Date</p>
          <DatePicker
            date={watch("date")}
            setDate={(val) => setValue("date", val)}
          />
        </div>

        {/* Subtask Tag */}
        <div>
          <p className="mb-1">Task Tag</p>
          <Input
            {...register("tag")}
            placeholder="Enter task tag"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AddSubtaskForm;
