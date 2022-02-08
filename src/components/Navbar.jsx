import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-tertiary-50 w-full flex justify-around items-center py-6 shadow-md">
      <Link to="/" className="flex items-center space-x-1">
        <img src={logo} alt="logo" className="h-8 w-8" />
        <p className="text-2xl font-extrabold">
          Tankhava<span className="font-normal text-2xl">Book</span>
        </p>
      </Link>
      <div>
        <Link
          to="/login"
          className="text-primary-500 text-lg hover:underline transition-all font-medium duration-200 ease-in-out"
        >
          Login / SignUp
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
