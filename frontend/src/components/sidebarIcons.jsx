import {
    MdSpaceDashboard,
    MdTaskAlt,
  } from 'react-icons/md';
  import {
    FiCheckSquare,
    FiTrash2,
  } from 'react-icons/fi';
  import { AiOutlineLoading3Quarters } from 'react-icons/ai';
  import { BsListCheck } from 'react-icons/bs';
  import { HiOutlineUsers } from 'react-icons/hi';
  import { BiLogOut } from 'react-icons/bi';
  
  const sideBarIcons = [
    {
      label: "Dashboard",
      link: "/dashboard",
      icon: <MdSpaceDashboard />,
    },
    {
      label: "Tasks",
      link: "/task",
      icon: <FiCheckSquare />,
    },
    {
      label: "In Progress",
      link: "/task/inprogress",
      icon: <AiOutlineLoading3Quarters />,
    },
    {
      label: "To Do",
      link: "/task/todo",
      icon: <BsListCheck />,
    },
    {
      label: "Completed",
      link: "/task/completed",
      icon: <MdTaskAlt />,
    },
    {
      label: "Users",
      link: "/team",
      icon: <HiOutlineUsers />,
    },
    {
      label: "Trash",
      link: "/trash",
      icon: <FiTrash2 />,
    },
    {
      label: "Logout",
      link: "/logout",
      icon: <BiLogOut />,
    },
  ];
  
  export default sideBarIcons;
  