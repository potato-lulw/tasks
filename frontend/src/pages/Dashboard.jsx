import { ModeToggle } from '@/components/Toggle';
import { Button } from '@/components/ui/button';
import { setOpenSidebar } from '@/redux/slices/authSlice';
import React from 'react'
import { LuPanelLeftOpen } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
  const isSidebarOpen = useSelector((state) => state.auth.isSidebarOpen);
  const dispatch = useDispatch();
  const openSidebar = () => {
    dispatch(setOpenSidebar(true));
  }
  return (
    <div>
      {
       !isSidebarOpen && (
        <div className='flex gap-2'>
          <Button variant={"outline"} onClick={openSidebar}><LuPanelLeftOpen /> </Button>
          <ModeToggle/>
        </div>
        
       )
      }
    </div>
  )
}

export default Dashboard