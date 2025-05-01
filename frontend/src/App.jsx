import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom"
import Task from "./pages/Task"
import TaskDetails from "./pages/TaskDetails"

import Signup from "./pages/Signup"
import { Toaster } from "sonner"
import Trash from "./pages/Trash"
import Users from "./pages/Users"
import { useTheme } from "./components/ThemeContextProvider"
import { useSelector } from "react-redux"
import Sidebar from "./components/ui/Sidebar"
import { ModeToggle } from "./components/Toggle"
import Navbar from "./components/ui/Navbar"

const Layout = () => {
  const { user } = useSelector((state) => state.auth);
  const isSidebarOpen = useSelector((state) => state.auth.isSidebarOpen);
  const location = useLocation();
  return user ?
    (<div className="w-full flex flex-col md:flex-row h-screen justify-center items-center  ">
      {
        isSidebarOpen && (
          <div className="h-screen bg-background sticky top-0 left-0 hidden md:block">
            <Sidebar />
          </div>
        )
      }

      

      <div className="flex flex-col flex-1 min-h-screen w-full">
        <div className="h-4 bg-background hidden md:block"></div>
        <div className="flex-1 overflow-y-auto md:border-2 border-border rounded-tl-2xl p-4 2xl:px-10">
          <Navbar />
          <div className=" ">
            <Outlet />
          </div>
        </div>
      </div>


    </div>)
    :
    (<Navigate to='/login' state={{ from: location }} replace />);
}


function App() {
  const { theme } = useTheme()
  return (
    <main>
      <div className={`flex min-h-screen justify-center items-center custom-svg-background w-full `}>
        <Routes>
          <Route element={<Layout />}>

            <Route element={<Navigate to='/dashboard' />} path="/" />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/task" element={<Task />} />
            <Route path="/task/:status" element={<Task />} />
            <Route path="/task/:id" element={<TaskDetails />} />
            <Route path="/trash" element={<Trash />} />
            <Route path="/team" element={<Users />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

      </div>
      <Toaster richColors closeButton />
    </main>
  )
}

export default App
