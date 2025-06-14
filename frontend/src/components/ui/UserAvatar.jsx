import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CiUser } from "react-icons/ci";
import { Button } from './button';
import { useTheme } from '../ThemeContextProvider';
import { toast } from 'sonner';
import { logout } from '@/redux/slices/authSlice';
import { useLogoutMutation } from '@/redux/slices/api/authApiSlice';

const UserAvatar = () => {

    // const { user } = useSelector((state) => state.auth);
    const { theme }= useTheme();
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const [logoutUser] = useLogoutMutation();

    const logOut = async () => {
        // dispatch(logOut());
        console.log("logout");
        try {
            const result = await logoutUser().unwrap();
            console.log("Logout result:", result);
            dispatch(logout());
            toast.success("Logout successful!");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Logout failed: " + (error.data?.message || error.message));
            
        }
    }
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center"><CiUser size={24} /></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Change Password</DropdownMenuItem>
                    <DropdownMenuItem><Button variant={'destructive'} className="w-full flex items-center justify-center gap-2" onClick={logOut}> <CiLogout className='font-bold' size={24} color={theme == "dark" ? '#fff' : '#fff'}/>Log Out</Button></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}

export default UserAvatar