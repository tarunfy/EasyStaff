import React from "react";
import svg from "../assets/images/login.svg";

const Verify = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-around items-center bg-slate-100  bg-gradient-to-br h-screen w-full">
      <div>
        <h1 className="font-sans font-bold  text-5xl text-left mb-5">
          Manage staff easily from <br /> your desktop
        </h1>
        <h1 className="text-tertiary-900 text-xl">
          OTP has been sent to your mobile phone
        </h1>
        <form onSubmit={handleSubmit} className="mt-5">
          <div>
            <input
              type="number"
              required
              id="partitioned"
              className="p-4"
              placeholder="OTP"
            />
          </div>
          <button
            type="submit"
            className="mt-5 bg-primary-500 hover:shadow-md transition-all hover:scale-105 rounded-sm hover:shadow-gray-800 duration-300 ease-in-out text-xl font-sans font-medium text-white px-6 py-2"
          >
            Continue
          </button>
        </form>
        <p className="mt-5 font-sans text-lg">
          Didn't recieve OTP?
          <button className="ml-3 font-semibold text-primary-500">
            Resend
          </button>
        </p>
      </div>
      <img src={svg} alt="img" className="h-128 w-128" />
    </div>
  );
};

export default Verify;
