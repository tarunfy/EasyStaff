import React, { useState } from "react";
import businessImg from "../assets/images/business.svg";

const Details = () => {
  const [details, setDetails] = useState({
    businessName: "",
    staffWorkingHours: "08:00",
  });

  const { businessName, staffWorkingHours } = details;

  const handleChange = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(details);
    resetForm();
  };

  const resetForm = () => {
    setDetails({
      businessName: "",
      staffWorkingHours: "08:00",
    });
  };

  return (
    <>
      <div className="h-screen bg-secondary-50 flex flex-col justify-center items-center">
        <div className="flex justify-between w-4/5 items-center">
          <img src={businessImg} alt="img" className="h-96 w-96" />
          <form
            onSubmit={handleSubmit}
            className="bg-white w-128 shadow-custom2  p-4 text-black"
          >
            <h1 className="text-3xl text-center mb-3 font-bold text-black  cursor-default">
              Create Your Business
            </h1>
            <input
              type="text"
              name="businessName"
              autoComplete="off"
              required
              value={businessName}
              onChange={handleChange}
              placeholder="Business Name"
              className="text-xl p-2 border-2 my-4 w-full focus:border-2 focus:border-primary-400 border-gray-300 outline-none"
            />

            <div className="my-4">
              <label
                htmlFor="working-hours"
                className="text-secondary-300 text-lg"
              >
                How many hours does your staff work in a shift?
              </label>
              <input
                type="time"
                id="working-hours"
                name="staffWorkingHours"
                autoComplete="off"
                required
                value={staffWorkingHours}
                onChange={handleChange}
                placeholder="Staff Working Hours"
                className="text-xl p-2 border-2 hover:border-primary-500 cursor-text focus:border-2 focus:border-primary-400 w-full border-gray-300 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-500 text-white font-semibold text-xl py-2 px-4 my-4 hover:bg-primary-600 duration-500 transition-colors ease-in-out"
            >
              Create Business
            </button>
            <button
              type="reset"
              onClick={resetForm}
              className="w-full text-primary-500 bg-white border-2 border-primary-500 font-semibold text-xl py-2 px-4 hover:bg-primary-50  duration-500 transition-colors ease-in-outs"
            >
              Clear
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Details;
