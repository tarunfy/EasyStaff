import React from "react";
import svg from "../assets/images/login.svg";
import { obj } from "../dialcodes.js";
import { Redirect } from "react-router-dom";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      <Redirect to="/verify" />;
    }, 3000);
  };

  return (
    <div className="flex justify-around items-center bg-slate-100  bg-gradient-to-br h-screen w-full">
      <div>
        <h1 className="font-sans font-bold  text-5xl text-left mb-5">
          Manage staff easily from <br /> your desktop
        </h1>
        <h1 className="text-tertiary-900 text-2xl">
          Enter your mobile number to continue
        </h1>
        <form onSubmit={handleSubmit} className="mt-5">
          <div>
            <select
              name="dailCode"
              id="dial-code"
              required
              className="py-2 px-1 font-bold text-lg mr-2 focus:outline-none"
            >
              {obj.countries.map((country) => (
                <option value={country.code} key={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              required
              className="py-3 px-1 font-bold text-lg border-2 border-gray"
            />
          </div>
          <button
            type="submit"
            className="mt-5 bg-primary-500 hover:shadow-md transition-all hover:scale-105 rounded-sm hover:shadow-gray-800 duration-300 ease-in-out text-xl font-sans font-medium text-white px-6 py-2"
          >
            Continue
          </button>
        </form>
      </div>
      <img src={svg} alt="img" className="h-128 w-128" />
    </div>
  );
};

export default Login;
