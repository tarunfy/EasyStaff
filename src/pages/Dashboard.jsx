import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Dashboard = () => {
  const { logout, currentUser } = useContext(AuthContext);
  return (
    <div className="h-screen w-full text-center">
      <p className="text-6xl">Welcome {currentUser.phoneNumber} 👋🏻</p>
      <button
        onClick={logout}
        className="px-4 py-2 text-xl rounded-lg bg-primary-500 text-white font-semibold mt-3"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
