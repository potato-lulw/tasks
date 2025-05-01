import { summary } from "@/assets/data"
import { useTheme } from "@/components/ThemeContextProvider";
import MyCard from "@/components/ui/MyCard";
import Card from "@/components/ui/MyCard";
import MyChart from "@/components/ui/MyChart";

import { LucideClipboardEdit } from "lucide-react";

import { FaListUl ,FaRegNewspaper } from "react-icons/fa";
import {  MdOutlineAdminPanelSettings } from "react-icons/md";
const Dashboard = () => {
  const {theme} = useTheme();
  const totals = summary.tasks;
  const stats = [
      {
        _id: "1",
        label: "TOTAL TASKS",
        total: summary?.totalTasks || 0,
        icon:  <FaRegNewspaper size={24} color={theme === "dark" ? "#f5f5f5" : "#000000"} />,
        bg: "bg-[#1d4ed8]",
        "text-color": 'text-[#1d4ed8]',
      },
      {
        _id: "2",
        label: "COMPLETED TASKS",
        total: totals["completed"] || 0,
        icon:  <MdOutlineAdminPanelSettings  size={24} color={theme === "dark" ? "#f5f5f5" : "#000000"} />,
        bg: "bg-[#f0766e]",
        "text-color": 'text-[#f0766e]',
      },
      {
        _id: "3",
        label: "TASKS IN PROGRESS",
        total: totals["in progress"] || 0,
        icon:  <LucideClipboardEdit  size={24} color={theme === "dark" ? "#f5f5f5" : "#000000"} />,
        bg: "bg-[#facc15]",
        "text-color": 'text-[#facc15]',
      },
      {
        _id: "4",
        label: "TODOS",
        total: totals["todos"] || 0,
        icon: <FaListUl  size={24} color={theme === "dark" ? "#f5f5f5" : "#000000"} />,
        bg: "bg-[#10b981]",
        "text-color": 'text-[#10b981]',
      },
    ];
  
  return (
    <div className="h-full p-3 flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {
          stats.map((stat) => (
            <MyCard key={stat._id} icon={stat.icon} bg={stat.bg} label={stat.label} count={stat.total} text={stat["text-color"]}/>
             
            
          ))
        }
      </div>
      <div className="bg-background flex flex-col gap-4 p-4 rounded-xl">
         <p className=" font-medium">Tasks by priority</p>
         <MyChart />
      </div>
    </div>
  )
}

export default Dashboard