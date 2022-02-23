import React from "react";
import { FiCheck } from "react-icons/fi";
import calendar30 from "../assets/images/calendar30.svg";
import calendar31 from "../assets/images/calendar31.svg";

const Details = () => {
  const handleSubmit = () => {};

  return (
    <div className="h-screen bg-gradient-to-b bg-secondary-50 flex  justify-center items-center">
      <h1 className="text-6xl font-bold text-black -rotate-90">
        Create Your Business
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white w-128 shadow-custom2  p-4 text-black"
      >
        <input
          type="text"
          placeholder="Your Name"
          className="text-xl p-2 border-2 w-full focus:border-2 focus:border-primary-400 border-gray-300 outline-none"
        />
        <input
          type="text"
          placeholder="Business Name"
          className="text-xl p-2 border-2 my-4 w-full focus:border-2 focus:border-primary-400 border-gray-300 outline-none"
        />
        <input
          type="number"
          placeholder="Staff Size"
          className="text-xl p-2 border-2 w-full mb-1 focus:border-2 focus:border-primary-400 border-gray-300 outline-none"
        />
        <div className="my-4">
          <label htmlFor="working-hours" className="text-secondary-300 text-lg">
            How many hours does your staff work in a shift?
          </label>
          <input
            type="time"
            id="working-hours"
            defaultValue="08:00"
            placeholder="Staff Working Hours"
            className="text-xl p-2 border-2 hover:border-primary-500 cursor-text focus:border-2 focus:border-primary-400 w-full border-gray-300 outline-none"
          />
        </div>
        <div>
          <label htmlFor="working-hours" className="text-secondary-300 text-lg">
            How do you calculate monthly salary?
          </label>
          <div className="bg-secondary-50 cursor-pointer hover:outline-primary-400 hover:outline-1 outline outline-0 p-2 flex justify-between items-center">
            <img src={calendar31} alt="calendar31" />
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-sm font-semibold">Calendar Month</h3>
              <p className="text-xs font-semibold">
                Ex: March - 31 days, April - 30 days, etc.
              </p>
            </div>
            <FiCheck className="h-7 w-7" />
          </div>
          <div className="bg-secondary-50 cursor-pointer hover:outline-primary-400 hover:outline-1 outline outline-0 p-2 mt-4 flex justify-between items-center">
            <img src={calendar30} alt="calendar30" />
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-sm font-semibold">Every Month 30 Days</h3>
              <p className="text-xs font-semibold">
                Ex: March - 30 days, April - 30 days, etc.
              </p>
            </div>
            <FiCheck className="h-7 w-7" />
          </div>
        </div>
        <button className="w-full bg-primary-500 text-white font-semibold text-xl py-2 px-4 my-4 hover:bg-primary-600 duration-500 transition-colors ease-in-out">
          Create Business
        </button>
        <button className="w-full text-primary-500 bg-white border-2 border-primary-500 font-semibold text-xl py-2 px-4 hover:bg-primary-50  duration-500 transition-colors ease-in-outs">
          Clear
        </button>
      </form>
    </div>
  );
};

export default Details;
