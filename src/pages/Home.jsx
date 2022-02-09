import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen from-primary-1000 via-primary-700 to-primary-1100 animate-gradient-x bg-gradient-to-br w-full flex justify-center flex-col items-center">
      <h1
        className="text-white text-center leading-none -mt-5"
        id="hero-heading"
      >
        Track Staff's Attendence <br /> & payroll
      </h1>
      <p
        className="text-center text-tertiary-300 max-w-3xl mt-10 leading-8"
        id="hero-sub-heading"
      >
        TankhavaBook is a free staff attendance & payroll management app that
        enables employers to easily manage their staff with automatic salary
        calculation, salary payment and more.
      </p>
      <Link
        to="/login"
        className="uppercase hover:bg-white hover:text-primary-700 hover:shadow-primary-1100 hover:scale-105 duration-300 ease-in-out hover:shadow-2xl transition-all mt-5 text-2xl border-2 border-white text-white px-6 py-3"
        id="cta-btn"
      >
        Start Tracking
      </Link>
    </div>
  );
};

export default Home;
