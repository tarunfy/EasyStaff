import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-slate-50 h-screen main flex flex-col justify-center items-center px-10">
      <h1 className="text-8xl text-center  font-bold">
        Track Staff's Attendence & <br /> Payroll
      </h1>

      <p className="text-center text-2xl font-semibold text-tertiary-900 mt-10">
        EasyStaff is a free staff attendance & payroll management app that
        enables employers <br /> to easily manage their staff with automatic
        salary calculation, <br /> salary payment and more.
      </p>

      <Link
        to="/login"
        className="uppercase  hover:bg-primary-500  hover:text-white hover:shadow-primary-1100 hover:scale-105 duration-300 ease-in-out hover:shadow-2xl transition-all mt-10 text-2xl border-2 border-primary-500 text-primary-500 px-6 py-3"
        id="cta-btn"
      >
        Start Tracking
      </Link>
    </div>
  );
};

export default Home;
