
import { useTheme } from "@/components/ThemeContextProvider";
import MyCard from "@/components/ui/MyCard";
import Card from "@/components/ui/MyCard";
import MyChart from "@/components/ui/MyChart";
import TaskTable from "@/components/ui/TaskTable";
import UsersTable from "@/components/ui/UsersTable";

import { LucideClipboardEdit } from "lucide-react";

import { FaListUl, FaRegNewspaper } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useGetDashboardStatsQuery } from "@/redux/slices/api/taskApiSlice";
import TaskDetailsCardSkeleton from "@/components/ui/TaskDetailsCardSkeleton";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
  const { theme } = useTheme();
  const { data: dashboardStats, isLoading: isFetching, error } = useGetDashboardStatsQuery();
  const [dashboardData, setDasboardData] = useState([]);

  useEffect(() => {
    if (!isFetching && dashboardStats) {
      setDasboardData(dashboardStats);
      console.log("Dashboard Stats: ", dashboardStats);
    } else if (error) {
      setDasboardData([]);
      toast.error("Failed to fetch dashboard stats: " + (error?.data?.message || error?.error));
    }
  }, [dashboardStats, isFetching, error]);

  const totals = dashboardData?.groupByStage || {};

  const tasks = dashboardData?.last10Tasks || [];

  const users = dashboardData?.users || [];


  const stats = [
    {
      _id: "1",
      label: "TOTAL TASKS",
      total: dashboardData?.totalTasks || 0,
      icon: <FaRegNewspaper size={24} color={theme === "dark" ? "#f5f5f5" : "#000000"} />,
      bg: "bg-[#1d4ed8]",
      "text-color": 'text-[#1d4ed8]',
    },
    {
      _id: "2",
      label: "COMPLETED TASKS",
      total: totals["completed"] || 0,
      icon: <MdOutlineAdminPanelSettings size={24} color={theme === "dark" ? "#f5f5f5" : "#000000"} />,
      bg: "bg-[#f0766e]",
      "text-color": 'text-[#f0766e]',
    },
    {
      _id: "3",
      label: "TASKS IN PROGRESS",
      total: totals["in progress"] || 0,
      icon: <LucideClipboardEdit size={24} color={theme === "dark" ? "#f5f5f5" : "#000000"} />,
      bg: "bg-[#facc15]",
      "text-color": 'text-[#facc15]',
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals["todo"] || 0,
      icon: <FaListUl size={24} color={theme === "dark" ? "#f5f5f5" : "#000000"} />,
      bg: "bg-[#10b981]",
      "text-color": 'text-[#10b981]',
    },
  ];

  return (
    <>
      {
        isFetching ? (<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {[1, 2, 3, 4, 5].map((_, i) => (
            <TaskDetailsCardSkeleton key={i} />
          ))}
        </div>) : (
          <div className="h-full  flex flex-col gap-4 my-2">

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {
                stats.map((stat) => (
                  <MyCard key={stat._id} icon={stat.icon} bg={stat.bg} label={stat.label} count={stat.total} text={stat["text-color"]} />


                ))
              }
            </div>

            <div className="flex flex-col 2xl:flex-row w-full gap-2">

              <div className="bg-background flex flex-col gap-4 p-4 rounded-xl 2xl:w-1/2 w-full">
                <p className=" font-medium">Tasks by priority</p>
                <MyChart totals = {totals} />
              </div>

              <div className="p-2 md:p-8 bg-background rounded-xl 2xl:w-1/2 w-full">

                <UsersTable users = {users}/>
              </div>
            </div>

            <div>
              <div className="p-2 md:p-8 bg-background rounded-xl  w-full">

                <TaskTable tasks={tasks} />
              </div>
            </div>
          </div>
        )
      }

    </>

  )
}

export default Dashboard