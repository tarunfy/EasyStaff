import React, { useContext } from "react";
import { SidebarData } from "./SidebarData";
import { AuthContext } from "../../contexts/AuthContext";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="h-screen absolute left-0 top-0 w-56 bg-quadtiary-700 flex justify-start flex-col">
      <div id="top" className="bg-quadtiary-800 py-3 mb-10 text-center">
        <h2 className="text-white font-extrabold underline text-2xl cursor-default">
          EasyStaff
        </h2>
      </div>
      <div id="mid" className="flex flex-col items-center justify-center">
        {SidebarData.map((value, index) => (
          <Link
            to={value.link}
            key={index}
            className={`${
              window.location.pathname == value.link
                ? "bg-quadtiary-500 py-4 w-full  flex justify-evenly items-center cursor-pointer"
                : "hover:bg-quadtiary-600 py-4 w-full flex  justify-evenly items-center cursor-pointer"
            }  `}
          >
            <div className="text-white flex w-2/5 justify-end px-3">
              {value.icon}
            </div>
            <h4 className="text-white text-lg font-medium flex w-3/5">
              {value.title}
            </h4>
          </Link>
        ))}
        <div
          className="mt-10 hover:text-white text-slate-300 transition-colors duration-300 ease-in-out  py-4 w-full flex justify-evenly items-center cursor-pointer"
          onClick={logout}
        >
          <div className="flex w-2/5 justify-end px-3">
            <MdOutlineLogout className="h-5 w-5" />
          </div>
          <h4 className="text-lg font-medium flex w-3/5">Logout</h4>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
