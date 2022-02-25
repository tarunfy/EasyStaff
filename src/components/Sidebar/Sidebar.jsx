import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { MdOutlineLogout } from "react-icons/md";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="h-screen absolute left-0 top-0 w-56 bg-quadtiary-700 flex justify-start flex-col">
      <div id="top" className="bg-quadtiary-800 py-3 mb-10 text-center">
        <h2 className="text-white underline text-2xl font-normal cursor-default">
          <span className="font-bold">Easy</span>Staff
        </h2>
      </div>
      <div id="mid" className="flex flex-col items-center justify-center">
        <div
          className="hover:bg-quadtiary-600 py-4 w-full flex justify-center cursor-pointer"
          onClick={logout}
        >
          <button className="flex text-white justify-center items-center text-lg  font-medium">
            <MdOutlineLogout className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
