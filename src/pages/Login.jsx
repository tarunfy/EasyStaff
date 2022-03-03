import React, { useState, useEffect, useContext } from "react";
import svg from "../assets/images/login.svg";
import firebase from "firebase/app";
import { AuthContext } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("6046214579");
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const { phoneAuth, isLoading, phoneAuthError, setPhoneAuthError } =
    useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        callback: function (response) {
          setRecaptchaVerified(true);
        },
      }
    );
    window.recaptchaVerifier.verify();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPhoneAuthError("");
    const isSuccess = await phoneAuth("+1" + phoneNumber);
    if (isSuccess) history.push("/verify");
  };

  return (
    <div className="pattern-container flex justify-around items-center bg-slate-100  bg-gradient-to-br h-screen w-full">
      <div>
        <h1 className="font-sans font-bold  text-5xl text-left mb-5">
          Manage staff easily from <br /> your desktop
        </h1>
        <h1 className="text-gray-800 text-2xl font-medium">
          Enter your mobile number to continue
        </h1>
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col">
          <div className="flex items-center mb-5">
            <h1 className="text-lg font-normal p-3 rounded-sm mr-2 bg-white border-gray border-2">
              +1
            </h1>
            <input
              type="tel"
              maxLength="10"
              required
              autoFocus
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="p-3 w-48 font-normal text-lg border-2 border-gray focus:outline-quadtiary-400"
            />
          </div>
          <div id="recaptcha-container"></div>
          {phoneAuthError && (
            <div className="mt-5 text-red-500 text-base max-w-xs">
              {phoneAuthError}
            </div>
          )}
          <button
            type="submit"
            disabled={!phoneNumber || !recaptchaVerified || isLoading}
            className={`${
              !phoneNumber || !recaptchaVerified || isLoading
                ? "text-white w-fit bg-quadtiary-300 mt-5 rounded-sm text-xl font-medium px-6 py-2 font-sans"
                : "mt-5 w-fit bg-quadtiary-500 hover:shadow-md transition-all hover:scale-105 rounded-sm hover:shadow-gray-800 duration-300 ease-in-out text-xl font-sans font-medium text-white px-6 py-2"
            }`}
          >
            {isLoading && !phoneAuthError ? (
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
                <p>Sending...</p>
              </div>
            ) : (
              "Send OTP"
            )}
          </button>
        </form>
      </div>
      <img src={svg} alt="img" className="h-128 w-128" />
    </div>
  );
};

export default Login;
