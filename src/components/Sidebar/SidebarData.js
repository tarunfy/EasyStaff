import { IoIosPeople } from "react-icons/io";
import { GiMoneyStack } from "react-icons/gi";
import { BsPeopleFill } from "react-icons/bs";
import { FaHandshake } from "react-icons/fa";

export const SidebarData = [
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
    title: "Customer",
    icon: <BsPeopleFill className="h-5 w-5" />,
    link: "/customer",
  },
  {
    title: "Visit",
    icon: <FaHandshake className="h-5 w-5" />,
    link: "/visit",
  },
];
