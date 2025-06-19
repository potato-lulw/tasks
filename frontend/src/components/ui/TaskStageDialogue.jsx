import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import CustomDialog from '@/components/ui/CustomDialog';
import AddTaskForm from '@/components/ui/AddTaskForm';

const TaskStageDialog = ({ label, colorClass, users }) => {
  const methods = useForm({
    defaultValues: {
      title: '',
      assignedUsers: [],
      stage: label.toLowerCase(),
      date: null,
      priority: '',
      asset: null,
    },
  });

  const onSubmit = (data) => {
    console.log(`🎯 ${label} task submitted:`, data);
    // handle API call here
  };

  return (
    <CustomDialog
      title={`Add ${label} Task`}
      description={`Add a task to the ${label} stage.`}
      triggerLabel={
        <div className="flex justify-between items-center gap-4 bg-background p-3 w-full rounded-xl border border-border cursor-pointer">
          <div className="flex items-center gap-4">
            <div className={`w-4 h-4 rounded-full ${colorClass}`}></div>
            <p>{label}</p>
          </div>
          <span>➕</span>
        </div>
      }
      triggerIcon=""
      customCss="bg-none text-foreground"
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <FormProvider {...methods}>
        <AddTaskForm users={users} />
      </FormProvider>
    </CustomDialog>
  );
};

export default TaskStageDialog;
