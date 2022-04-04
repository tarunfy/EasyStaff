import React from "react";
import { Link } from "react-router-dom";
import { IoArrowForwardCircle } from "react-icons/io5";
import arrow from "../assets/images/arrow.svg";

const Home = () => {
  return (
    <>
      <div id="blurry-gradient"></div>
      <div id="blurry-gradient-2"></div>
      <div className="bg-slate-50 h-screen main flex flex-col justify-center items-center px-10">
        <h1
          id="hero-heading"
          className="text-8xl  font-sans text-stone-800 text-center tracking-tighter z-30 font-bold cursor-default"
        >
          The{" "}
          <span className="animation hover:text-quadtiary-500 inline-block transform hover:-translate-y-2 transition duration-200 ease-in-out">
            Proffesional
          </span>{" "}
          Staff{" "}
          <span className="animation hover:text-quadtiary-500 inline-block transform hover:-translate-y-2 transition duration-200 ease-in-out">
            Management
          </span>{" "}
          App you were waiting for.
        </h1>
        <p className="text-center cursor-default leading-8 text-xl z-30 font-light text-gray-700 mt-10">
          EasyStaff is a free staff attendance and payroll management app that
          enables employers <br /> to easily manage their staff with automatic
          salary calculation, salary payment and more.
        </p>
        <Link
          to="/signin"
          className="z-30 relative font-semibold hover:bg-quadtiary-500 flex items-center justify-between  hover:text-white hover:shadow-primary-1100 hover:scale-105 duration-300 ease-in-out hover:shadow-2xl transition-all mt-10 text-2xl border-2 border-quadtiary-500 text-quadtiary-500 px-6 py-3"
          id="cta-btn"
        >
          Start Tracking <IoArrowForwardCircle className="h-8 w-8 ml-1" />
        </Link>
        <img
          src={arrow}
          alt="scribble-arrow"
          className="absolute bottom-14  z-0 left-[48%] h-20 w-16 slide-top"
        />
      </div>
    </>
  );
};

export default Home;
