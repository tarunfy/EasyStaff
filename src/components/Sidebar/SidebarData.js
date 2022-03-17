import { RiDashboardFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { GiMoneyStack } from "react-icons/gi";

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <RiDashboardFill className="h-5 w-5" />,
    link: "/dashboard",
  },
  {
    title: "Staff",
    icon: <IoIosPeople className="h-5 w-5" />,
    link: "/staff",
  },
  {
    title: "Salary",
    icon: <GiMoneyStack className="h-5 w-5" />,
    link: "/salary",
  },
  {
    title: "Profile",
    icon: <FaUser className="h-5 w-5" />,
    link: "/profile",
  },
];
