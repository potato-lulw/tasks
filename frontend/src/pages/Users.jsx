import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { BiMessageAltAdd } from 'react-icons/bi'

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
import { useGetTeamQuery} from '@/redux/slices/api/userApiSlice'

const Users = () => {
  
  const [registerUser] = useRegisterMutation();
  const methods = useForm();
  const [userList, setUserList] = useState([]);
  const { data, isLoading: isFetching, error } = useGetTeamQuery();

  useEffect(() => {
    setUserList(data || []);
  }, [data])
 
  const onSubmit = async (data) => {
    try {

      
        console.log('Form Submitted: ' + data);
        console.log(data)
        const result = await registerUser({...data, password: data.email}).unwrap();
        console.log("User registered successfully:", result);
        toast.success("User registered successfully!");
        methods.reset(); // Reset the form after successful submission
      
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Failed to register user: " + (error.data?.message || error.message));
      return;
    }
  }

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
                        <span className="font-medium">{user.name}</span>
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
                    <span
                      className={`px-2 py-1 text-xs rounded-md ${user.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>

                  <TableCell>{formatDate(new Date(user.createdAt))}</TableCell>
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
