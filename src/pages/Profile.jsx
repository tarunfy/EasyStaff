import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";

const Profile = () => {
  return (
    <>
      <Sidebar />
      <div className="h-screen pl-56 w-full bg-slate-50 text-center">
        <p className="text-6xl">Profile page</p>
      </div>
    </>
  );
};

export default Profile;
