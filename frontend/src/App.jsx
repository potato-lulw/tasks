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
import MiniSidebar from "./components/ui/MiniSidebar"

const Layout = () => {
  const { user } = useSelector((state) => state.auth);
  const isSidebarOpen = useSelector((state) => state.auth.isSidebarOpen);
  const location = useLocation();
  return user ?
    (<div className="w-full flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="bg-background hidden md:block max-h-screen">
          <Sidebar />
        </div>
      )}

      {!isSidebarOpen && (
        <div className="bg-background hidden md:block max-h-screen">
          <MiniSidebar />
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full max-h-screen overflow-hidden">
        <div className="h-4 bg-background hidden md:block relative topbar  " />

        <div className="flex-1 overflow-y-auto  md:border-2 border-border rounded-tl-2xl p-4 2xl:px-10">
          <div className=" md:w-fit md:right-0 z-10  md:fixed w-full top-0">
            <Navbar />
          </div>
          <div className="md:mt-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
    )
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
