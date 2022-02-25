import React, { useState, useContext } from "react";
import svg from "../assets/images/login.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Verify = () => {
  const [code, setCode] = useState("");

  const { verifyCode, authError, setAuthError } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthError("");
    verifyCode(code);
  };

  return (
    <div className="pattern-container flex justify-around items-center bg-slate-100  bg-gradient-to-br h-screen w-full">
      <div>
        <h1 className="font-sans font-bold  text-5xl text-left mb-5">
          Manage staff easily from <br /> your desktop
        </h1>
        <h1 className="text-gray-800 text-xl font-medium">
          OTP has been sent{" "}
          <Link to="/login" className="ml-1 font-medium text-quadtiary-500">
            Change Number
          </Link>
        </h1>
        <form onSubmit={handleSubmit} className="mt-5">
          <div>
            <input
              type="number"
              required
              className="p-4 border-2 border-gray font-normal text-lg  focus:outline-quadtiary-400"
              placeholder="OTP"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          {authError && (
            <>
              <p className="mt-5 text-red-500 text-base max-w-xs">
                {authError}
              </p>
            </>
          )}
          <button
            type="submit"
            className="mt-5 bg-quadtiary-500 hover:shadow-md transition-all hover:scale-105 rounded-sm hover:shadow-gray-800 duration-300 ease-in-out text-xl font-sans font-medium text-white px-6 py-2"
          >
            Continue
          </button>
        </form>
      </div>
      <img src={svg} alt="img" className="h-128 w-128" />
    </div>
  );
};

export default Verify;
