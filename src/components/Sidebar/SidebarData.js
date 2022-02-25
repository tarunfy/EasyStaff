import { RiDashboardFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <RiDashboardFill className="h-5 w-5" />,
    link: "/dashboard",
  },
  {
    title: "Profile",
    icon: <FaUser className="h-5 w-5" />,
    link: "/profile",
  },
];
