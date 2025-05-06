import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from './input'
import { Button } from './button'
import { DatePicker } from './DatePicker'

const AddUserForm = () => {
    return (
        <div className='flex flex-col gap-4'>
            <div>
                <p>User Name</p>
                <Input type="text" name="name" id="name" placeholder="Enter full name" className="w-full" />
            </div>

            <div>
                <p>Email Address</p>
                <Input type="email" name="email" id="email" placeholder="Enter email" className="w-full" />
            </div>

            <div>
                <p>Title</p>
                <Input type="text" name="title" id="title" placeholder="e.g., Administrator" className="w-full" />
            </div>

            <div>
                <p>Role</p>
                <Select>
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
            </div>

            <div className='flex items-center gap-4'>
                <div className='w-full'>
                    <p>Is Admin</p>
                    <Select>
                        <SelectTrigger className="w-full border-2">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className='w-full'>
                    <p>Is Active</p>
                    <Select>
                        <SelectTrigger className="w-full border-2">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="true">Active</SelectItem>
                            <SelectItem value="false">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div>
                <p>Profile Picture</p>
                <Input type="file" name="profilePic" id="profilePic" />
            </div>

            
        </div>
    )
}

export default AddUserForm
