import React from 'react';
import { setOpenSidebar } from '@/redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import  sideBarIcons  from '@/components/sidebarIcons';
import { FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const MobileSidebar = () => {
  const { isSidebarOpen, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const closeSideBar = () => {
    dispatch(setOpenSidebar(false));
  };

  // Filter based on admin
  const sidebarLinks = user?.isAdmin
    ? sideBarIcons
    : sideBarIcons.filter((item) => item.label !== 'Users' && item.label !== 'Trash');

  return (
    <div
      className={clsx(
        'fixed top-0 left-0 z-50 h-full w-64 bg-background shadow-lg  transform transition-transform duration-300 ease-in-out md:hidden',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button onClick={closeSideBar}>
          <FaTimes size={20} />
        </button>
      </div>

      <div className="flex flex-col gap-2 p-4">
        {sidebarLinks.map(({ label, link, icon }) => (
          <NavLink
            to={link}
            key={label}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 p-2 rounded hover:bg-accent',
                isActive && 'bg-accent'
              )
            }
            onClick={closeSideBar}
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MobileSidebar;
