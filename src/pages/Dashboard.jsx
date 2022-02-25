import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { BusinessContext } from "../contexts/BusinessContext";
import { useHistory } from "react-router-dom";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const { logout, currentUser } = useContext(AuthContext);
  const { fetchBusiness, isFetching, business } = useContext(BusinessContext);

  const history = useHistory();

  useEffect(() => {
    fetchBusiness(currentUser.uid);
  }, []);

  if (isFetching) return <Spinner />;

  if (business == null) history.push("/add-business");

  return (
    <div className="h-screen w-full text-center">
      <p className="text-6xl">Welcome {currentUser.phoneNumber} 👋🏻</p>
      {business && (
        <>
          <p>Buisness name: {business.businessName}</p>
          <p>Staff working hours: {business.staffWorkingHours}</p>
        </>
      )}
      <button
        onClick={logout}
        className="px-4 py-2 text-xl rounded-lg bg-quadtiary-500 text-white font-semibold mt-3"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
