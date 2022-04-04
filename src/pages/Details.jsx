import React, { useState, useContext, useEffect } from "react";
import { Spinner } from "../components";
import { AuthContext } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { BusinessContext } from "../contexts/BusinessContext";
import businessImg from "../assets/images/business.svg";

const Details = () => {
  const [details, setDetails] = useState({
    businessName: "",
    businessEmail: "",
    businessContactNumber: "",
  });

  const history = useHistory();

  const { currentUser } = useContext(AuthContext);
  const { createBusiness, isLoading, fetchBusiness, isFetching } =
    useContext(BusinessContext);

  const { businessName, businessEmail, businessContactNumber } = details;

  useEffect(() => {
    async function checkBusiness() {
      const exists = await fetchBusiness(currentUser.uid);
      if (exists) {
        history.push("/staff");
      }
    }
    checkBusiness();
  }, []);

  const handleChange = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBusiness(currentUser.uid, details);
    resetForm();
    history.push("/dashboard");
  };

  const resetForm = () => {
    setDetails({
      businessName: "",
      businessEmail: "",
      businessContactNumber: "",
    });
  };

  if (isLoading || isFetching) return <Spinner />;

  return (
    <>
      <div className="h-screen bg-secondary-50 flex flex-col justify-center items-center">
        <div className="flex justify-between w-4/5 items-center">
          <img src={businessImg} alt="img" className="h-128 w-128" />
          <form
            onSubmit={handleSubmit}
            className="bg-white w-128 shadow-custom2 z-20 p-4 text-black"
          >
            <h1 className="text-3xl text-center mb-3 font-bold text-black  cursor-default">
              Add Your Business
            </h1>
            <input
              type="text"
              autoComplete="off"
              name="businessName"
              autoFocus
              required
              value={businessName}
              onChange={handleChange}
              placeholder="Business name"
              className="text-xl p-2 border-2  w-full focus:border-2 focus:border-quadtiary-400 border-gray-300 outline-none"
            />
            <input
              type="email"
              name="businessEmail"
              autoComplete="off"
              required
              value={businessEmail}
              onChange={handleChange}
              placeholder="Business email"
              className="text-xl p-2 border-2 my-4 w-full focus:border-2 focus:border-quadtiary-400 border-gray-300 outline-none"
            />
            <input
              type="tel"
              maxLength={10}
              pattern="[0-9]{10}"
              name="businessContactNumber"
              autoComplete="off"
              required
              value={businessContactNumber}
              onChange={handleChange}
              placeholder="Business contact number"
              className="text-xl p-2 border-2 w-full mb-4 focus:border-2 focus:border-quadtiary-400 border-gray-300 outline-none"
            />
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-[47%] bg-quadtiary-500 text-white font-semibold border-[1px] border-quadtiary-500 text-xl py-2 px-4 hover:bg-quadtiary-600 duration-500 transition-colors ease-in-out"
              >
                Create Business
              </button>
              <button
                type="reset"
                onClick={resetForm}
                className="w-[47%] text-quadtiary-500 bg-white border-[1px] border-quadtiary-500 font-semibold text-xl py-2 px-4 hover:bg-quadtiary-50  duration-500 transition-colors ease-in-outs"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Details;
