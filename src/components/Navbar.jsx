import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(false);

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className="bg-tertiary-50 absolute top-0 w-full flex justify-around items-center py-6 shadow-md">
      <Link to="/" className="flex items-center space-x-1">
        <img src={logo} alt="logo" className="h-8 w-8" />
        <p className="text-2xl font-extrabold">
          Tankhava<span className="font-normal text-2xl">Book</span>
        </p>
      </Link>
      <div>
        {!currentUser ? (
          <Link
            to="/login"
            className="text-primary-500 text-lg hover:underline transition-all font-medium duration-200 ease-in-out"
          >
            Login / SignUp
          </Link>
        ) : (
          <div className="space-x-5">
            <Link
              to="/dashboard"
              className="text-primary-500 text-lg hover:underline transition-all font-medium duration-200 ease-in-out"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-lg hover:font-semibold transition-all font-normal duration-200 ease-in-out"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
