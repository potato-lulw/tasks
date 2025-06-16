import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { BiLock, BiLockOpen, BiMessageAltAdd, BiTrash } from 'react-icons/bi'

import { formatDate, getInitials } from '@/utils/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddUserForm from '@/components/ui/AddUserForm'
import CustomDialog from '@/components/ui/CustomDialog'
import { useRegisterMutation } from '@/redux/slices/api/authApiSlice'
import { toast } from 'sonner'
import { useForm, FormProvider } from "react-hook-form";
import { useDeleteUserMutation, useGetTeamQuery, useUpdateUserMutation, useUserActionMutation } from '@/redux/slices/api/userApiSlice'
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '@/redux/slices/authSlice';

const Users = () => {
  const {user : currentUser} = useSelector((state) => state.auth);
  const [registerUser] = useRegisterMutation();
  const methods = useForm();
  const [userList, setUserList] = useState([]);
  const { data, isLoading: isFetching, error, refetch } = useGetTeamQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [userAction] = useUserActionMutation();
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users: " + (error.data?.message || error.message));
      return;
    }
    setUserList(data || []);
  }, [data, error])

  const userActionHandler = async ({ id, isActive }) => {
    if (!id || typeof isActive !== 'boolean') {
      toast.error("Invalid user data passed to handler.");
      return;
    }

    try {
      await userAction({ id, isActive: !isActive }).unwrap();
      toast.success(`User ${isActive ? 'deactivated' : 'activated'} successfully!`);
      refetch();
    } catch (error) {
      toast.error("Failed to perform user action: " + (error.data?.message || error.message));
      console.error("Error performing user action:", error);
    }
  }

  const onSubmit = async (data) => {
    try {


      const result = await registerUser({ ...data, password: data.email }).unwrap();
      console.log("User registered successfully:", result);
      toast.success("User registered successfully!");
      methods.reset(); // Reset the form after successful submission

    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Failed to register user: " + (error.data?.message || error.message));
      return;
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      setUserList(userList.filter(user => user._id !== id)); // Update local state
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user: " + (error.data?.message || error.message));
    }
  }

  const handleEditUser = async (data) => {

  try {
    await updateUser({ ...data, _id: data.id }).unwrap();
    
    if( data.id === currentUser._id) {
      console.log("Updating user credentials in auth slice");
      dispatch(setCredentials({...data, _id: data.id })); // Update user in auth slice
    }
    toast.success("User updated successfully!");
    refetch();
  } catch (error) {
    console.error("Error updating user:", error);
    toast.error("Failed to update user: " + (error.data?.message || error.message));
  }
};


  return (
    <div className='h-full flex flex-col gap-4 my-2 w-full'>
      <div className='flex items-center justify-between py-2'>
        <p className='text-2xl font-medium'>Users</p>

        <FormProvider {...methods}>
          <CustomDialog
            triggerLabel={"Add User"}
            triggerIcon={<BiMessageAltAdd />}
            title="Add User"
            description="Fill in the details of the new user."
            onSubmit={methods.handleSubmit(onSubmit)}
            submitLabel="Add"
            customCss='bg-primary text-secondary p-2'
          >
            <AddUserForm />
          </CustomDialog>
          {/* ... rest of the Users UI */}
        </FormProvider>


      </div>

      <div className='p-2 md:p-4 bg-background rounded-xl  w-full'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Admin</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead></TableHead>
              <TableHead className="text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              !isFetching && userList ? userList.map(user => (
                <TableRow key={user._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-medium">
                        {getInitials(user.name)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.name } {currentUser._id == user.id ? " (You)" : ""} </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{user.title}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-md ${user.isAdmin
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                        }`}
                    >
                      {user.isAdmin ? "Yes" : "No"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <CustomDialog
                      title={user.isActive ? 'Deactivate User?' : 'Activate User?'}
                      triggerLabel={
                        <span
                          className={`px-2 py-1 text-xs rounded-md ${user.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                            }`}
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      }
                      triggerIcon=""
                      description={user.isActive ? 'Are you sure you want to deactivate this user?' : 'Are you sure you want to activate this user?'}
                      submitLabel={user.isActive ? 'Deactivate' : 'Activate'}
                      customCss=''
                      onSubmit={() => userActionHandler({ id: user._id, isActive: user.isActive })}
                    />

                  </TableCell>

                  <TableCell>{formatDate(new Date(user.createdAt))}</TableCell>
                  <TableCell>
                    <FormProvider {...methods}>
                      <CustomDialog
                        triggerLabel={<Button variant="secondary">Edit</Button>}
                        triggerIcon=""
                        title="Edit User"
                        description="Fill in the details of the User."
                        onSubmit={methods.handleSubmit((formData) => handleEditUser({ ...formData, id: user._id }))}
                        submitLabel="Edit"
                        customCss=""
                      >
                        <AddUserForm data={user} />
                      </CustomDialog>
                    </FormProvider>
                  </TableCell>
                  {/* <TableCell className="text-right"><Button variant="destructive" onClick={() => handleDelete(user._id)}>Delete</Button></TableCell> */}
                  <TableCell className="text-right">
                    <CustomDialog
                      title='Delete this User?'
                      triggerLabel=""
                      triggerIcon={<BiTrash size={20} className="text-destructive" />}
                      description='Are you sure you want to delete this User?'
                      submitLabel='Delete'
                      customCss='justify-end'
                      onSubmit={() => handleDelete(user._id)}
                    />
                  </TableCell>
                </TableRow>
              ))
                : (
                  <TableRow>
                    <TableCell colSpan="7" className="text-center">
                      {isFetching ? "Loading..." : "No users found."}
                    </TableCell>
                  </TableRow>
                )
            }

          </TableBody>
        </Table>
      </div>
    </div >
  )
}

export default Users;
