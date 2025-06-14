import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import sideBarIcons from "../sidebarIcons";
import { logout, setOpenSidebar } from "@/redux/slices/authSlice";
import { PiHandWaving } from "react-icons/pi";
import { ModeToggle } from "../Toggle";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import { Button } from "./button";
import clsx from "clsx";
import { BiLogOut } from "react-icons/bi";
import { useLogoutMutation } from "@/redux/slices/api/authApiSlice";
import { toast } from "sonner";

const MiniSidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const [logoutUser] = useLogoutMutation();

  const sidebarLinks = user?.isAdmin
    ? sideBarIcons
    : sideBarIcons.filter(item => item.label !== "Users" && item.label !== "Trash");

  const openSidebar = () => {
    dispatch(setOpenSidebar(true));
  };
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
    <div className="p-3 h-full flex flex-col justify-between items-center w-[60px]">
      {/* Top: Close + Theme Toggle */}
      <div className="flex flex-col gap-4 items-center">
        <Button variant="outline" size="icon" onClick={openSidebar}>
          <LuPanelLeftOpen size={20} />
        </Button>
        <ModeToggle />
      </div>

      {/* Middle: Icons only */}
      <div className="flex flex-col gap-4 mt-4 items-center">
        {sidebarLinks.map(({ label, link, icon }) => (
          <NavLink
            to={link}
            key={label}
            title={label}
            className={clsx(
              "p-2 rounded-md hover:bg-accent text-muted-foreground",
              location.pathname === link || location.pathname.startsWith(link + '/') ? "bg-accent text-primary" : ""
            )}
          >
            {icon}
          </NavLink>
        ))}
        {/* Bottom: Logout icon only */}

        <NavLink className=" rounded-md text-muted-foreground p-2 hover:bg-accent" >

          <BiLogOut onClick={handleLogOut} />
        </NavLink>

      </div>


      {/* Bottom: Greeting icon only */}
      <div className="bg-accent p-2 rounded-md border border-border" title={`Hello ${user.name || "Om"}`}>
        <PiHandWaving size={22} />
      </div>
    </div>
  );
};

export default MiniSidebar;
