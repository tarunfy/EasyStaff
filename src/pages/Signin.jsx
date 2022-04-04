import React, { useState, useContext } from "react";
import svg from "../assets/images/human.svg";
import cube from "../assets/images/cube.svg";
import { AuthContext } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, signinError, signin, setSigninError } =
    useContext(AuthContext);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSigninError("");
    const res = await signin(email, password);
    if (res) history.push("/staff");
  };

  return (
    <div className="flex justify-center items-center bg-slate-50  bg-gradient-to-br h-screen w-full">
      <form
        onSubmit={handleSubmit}
        className="mt-5 w-128 shadow-custom3 relative  bg-white border-[2px] border-black px-6 py-8"
      >
        <img
          src={svg}
          alt="img"
          className="absolute -left-[28rem] -top-14 h-128"
        />
        <img
          src={cube}
          alt="img"
          className="float absolute -right-80 top-0 h-14"
        />
        <img
          src={cube}
          alt="img"
          className="float absolute right-60 -top-48 h-14"
        />
        <img
          src={cube}
          alt="img"
          className="float absolute -right-36 -bottom-48 h-14"
        />
        <h1 className="text-center mb-4 font-semibold text-3xl">
          Start Managing Staff 🚀
        </h1>
        <input
          type="email"
          required
          autoFocus
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 mb-5 w-full font-normal text-lg border-2 border-gray focus:outline-quadtiary-400"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 w-full  font-normal text-lg border-2 border-gray focus:outline-quadtiary-400"
        />
        {signinError && (
          <div className="mt-5 text-red-500 text-base max-w-xs">
            {signinError}
          </div>
        )}
        <button
          type="submit"
          disabled={!email || !password || isLoading}
          className={`${
            !email || !password || isLoading
              ? "text-white block w-fit bg-quadtiary-300 my-5  text-xl font-medium px-6 py-2 font-sans"
              : "my-5 w-fit block bg-quadtiary-500 hover:shadow-md transition-all hover:scale-105  hover:shadow-gray-800 duration-300 ease-in-out text-xl font-sans font-medium text-white px-6 py-2"
          }`}
        >
          {isLoading && !signinError ? (
            <div className="flex justify-center items-center">
              <svg
                role="status"
                className="mr-2 w-5 h-5 text-gray-200 animate-spin  fill-quadtiary-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <p>Logging...</p>
            </div>
          ) : (
            "Log In"
          )}
        </button>
        <p className="text-lg font-medium">
          Don't have an account?{" "}
          <Link
            to="/signup"
            onClick={() => setSigninError("")}
            className="text-quadtiary-500"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
