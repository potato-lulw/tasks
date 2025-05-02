import { Button } from '@/components/ui/button'
import React from 'react'
import { BiMessageAltAdd } from 'react-icons/bi'
import { user } from '@/assets/data'
import { formatDate, getInitials } from '@/utils/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Users = () => {
  return (
    <div className='h-full flex flex-col gap-4 my-2 w-full'>
      <div className='flex items-center justify-between py-2'>
        <p className='text-2xl font-medium'>Users</p>
        <Button className="font-medium flex gap-2 py-3 px-2 items-center md:text-lg text-base hover:cursor-pointer">
          <BiMessageAltAdd size={24} />
          <p>Add User</p>
        </Button>
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
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Users;
