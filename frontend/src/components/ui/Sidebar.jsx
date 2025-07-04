import React from 'react'
import { ModeToggle } from '../Toggle'
import sideBarIcons from '../sidebarIcons';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SidebarIcon } from 'lucide-react';
import { logout, setOpenSidebar } from '@/redux/slices/authSlice';
import { LuPanelLeftClose } from "react-icons/lu";
import { Button } from './button';
import { PiHandWaving } from "react-icons/pi";
import { clsx } from 'clsx';
import { BiLogOut } from 'react-icons/bi';
import { toast } from 'sonner';
import { useLogoutMutation } from '@/redux/slices/api/authApiSlice';

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();
    const [logoutUser] = useLogoutMutation();
    // const path = location.pathname.split('/')[1];
    const sidebarLinks = user?.isAdmin
        ? sideBarIcons
        : sideBarIcons.filter(item => item.label !== "Users" && item.label !== "Trash");

    

    const closeSidebar = () => {
        dispatch(setOpenSidebar(false));
    }

    const handleLogOut = async () => {
        try {
            const result = await logoutUser().unwrap();
            console.log("Logout result:", result);
            dispatch(logout());
            toast.success("Logout successful!");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Logout failed: " + (error.data?.message || error.message));
            return;
        }
    }

    return (
        <div className='p-6 px-3 h-full flex flex-col justify-between items-start'>
            <div className='flex gap-2 justify-start items-center'>
                <Button variant={"outline"} onClick={closeSidebar}><LuPanelLeftClose size={24} /> </Button>
                <ModeToggle />
            </div>

            <div className='flex flex-col gap-2 w-full'>
                {sidebarLinks.map(({ label, link, icon }) => (
                    <NavLink
                    to={link}
                    key={label}
                    className={clsx(
                      "flex items-center hover:bg-accent gap-2 p-2 rounded-md w-full",
                      location.pathname === link || location.pathname.startsWith(link + '/') ? "bg-accent" : ""
                    )}
                  >
                    {icon}
                    <span>{label}</span>
                  </NavLink>
                ))}
                <NavLink
                    onClick={handleLogOut}
                    className="flex items-center hover:bg-accent gap-2 p-2 rounded-md w-full"
                >
                    <BiLogOut/>
                    <span>Logout</span>
                </NavLink>

            </div>
            <div className='flex gap-2 justify-center items-center bg-accent p-2 rounded-md border-border border'>
                <PiHandWaving size={24} />
                <p className='text-xl font-medium'>Hello {user.name ? user.name : "Om"}!</p>
            </div>
        </div>
    )
}

export default Sidebar