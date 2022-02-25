import React from "react";
import { Link } from "react-router-dom";
import arrow from "../assets/images/arrow.svg";

const Home = () => {
  return (
    <>
      <div id="blurry-gradient"></div>
      <div id="blurry-gradient-2"></div>
      <div className="bg-slate-50 h-screen main flex flex-col justify-center items-center px-10">
        <h1 className="text-8xl text-center z-30 font-bold">
          Track Staff's Attendence & <br /> Payroll.
        </h1>

        <p className="text-center leading-10 text-2xl z-30 font-semibold text-gray-700 mt-10">
          EasyStaff is a free staff attendance and payroll management app that
          enables employers <br /> to easily manage their staff with automatic
          salary calculation, <br /> salary payment and more.
        </p>

        <Link
          to="/login"
          className="uppercase z-30 hover:bg-quadtiary-500  hover:text-white hover:shadow-primary-1100 hover:scale-105 duration-300 ease-in-out hover:shadow-2xl transition-all mt-10 text-2xl border-2 border-quadtiary-500 text-quadtiary-500 px-6 py-3"
          id="cta-btn"
        >
          Start Tracking
        </Link>
        <img
          src={arrow}
          alt="scribble-arrow"
          className="absolute bottom-20 left-[40%] h-20 w-20"
        />
      </div>
    </>
  );
};

export default Home;
