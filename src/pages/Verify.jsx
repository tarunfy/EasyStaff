import React, { useState, useEffect, useContext } from "react";
import svg from "../assets/images/login.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Verify = () => {
  const [counter, setCounter] = useState(30);
  const [code, setCode] = useState("");

  const { verifyCode } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyCode(code);
  };

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <div className="flex justify-around items-center bg-slate-100  bg-gradient-to-br h-screen w-full">
      <div>
        <h1 className="font-sans font-bold  text-5xl text-left mb-5">
          Manage staff easily from <br /> your desktop
        </h1>
        <h1 className="text-tertiary-900 text-xl">
          OTP has been sent{" "}
          <Link to="/login" className="ml-1 font-semibold text-primary-500">
            Change Number
          </Link>
        </h1>
        <form onSubmit={handleSubmit} className="mt-5">
          <div>
            <input
              type="number"
              required
              className="p-4 border-2 border-gray"
              placeholder="OTP"
              value={code}
              onChange={(e) => setCode(e.target.value)}
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
          {counter === 0 ? (
            <button className="ml-3 font-semibold text-primary-500">
              Resend
            </button>
          ) : (
            <span className="ml-2 font-bold">00:{counter}</span>
          )}
        </p>
      </div>
      <img src={svg} alt="img" className="h-128 w-128" />
    </div>
  );
};

export default Verify;
