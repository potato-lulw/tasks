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
      link: "/tasks",
      icon: <FiCheckSquare />,
    },
    {
      label: "In Progress",
      link: "/tasks/inprogress",
      icon: <AiOutlineLoading3Quarters />,
    },
    {
      label: "To Do",
      link: "/tasks/todo",
      icon: <BsListCheck />,
    },
    {
      label: "Completed",
      link: "/tasks/completed",
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
  