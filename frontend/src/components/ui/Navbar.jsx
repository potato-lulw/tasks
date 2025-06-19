import { setOpenSidebar } from '@/redux/slices/authSlice';
import React from 'react'
import { IoSearch } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { Button } from './button';
import { LuPanelLeftOpen } from 'react-icons/lu';
import { ModeToggle } from '../Toggle';
import UserAvatar from './UserAvatar';
import NotificationPanel from './NotificationPanel';
import MobileSidebar from './MobileSidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



const Navbar = () => {
  // const isSidebarOpen = useSelector((state) => state.auth.isSidebarOpen);
  const dispatch = useDispatch();
  const openSidebar = () => {
    dispatch(setOpenSidebar(true));
  }
  return (
  <div className='md:px-6 z-20 px-2 py-2 bg-background md:border-2 border  border-border md:border-t-0 rounded-md md:rounded-r-none md:rounded-l-xl flex flex-row justify-between items-center w-full shadow-xl gap-2 navbar relative '>

      <MobileSidebar />

      <div className='flex flex-row gap-2 items-center'>


        <div className='flex gap-2 md:hidden '>
          <Button variant={"outline"} onClick={openSidebar}><LuPanelLeftOpen /> </Button>
          <ModeToggle />
        </div>
    


        <div className='rounded-full hidden md:flex flex-row gap-2 border border-border items-center justify-between px-2 py-1  bg-secondary'>
          <IoSearch />
          <input type="text" name="search" id="search" className='focus:outline-none ' />
        </div>
      </div>




      <div className='flex flex-row gap-2 justify-center items-center'>

        <div className='md:hidden block'>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center"><IoSearch /></DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* <div className='rounded-full hidden md:flex flex-row gap-2 border border-border items-center justify-between   '>
                <FaSearch /> */}
              <input type="text" name="search" id="search" className='focus:outline-none bg-secondary' />
              {/* </div> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <NotificationPanel />
        <UserAvatar />
      </div>
    </div>
  )
}

export default Navbar