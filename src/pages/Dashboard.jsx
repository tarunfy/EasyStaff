import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { BusinessContext } from "../contexts/BusinessContext";
import { useHistory } from "react-router-dom";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const { logout, currentUser } = useContext(AuthContext);
  const { businessExists, isFetching, setBusiness } =
    useContext(BusinessContext);

  const history = useHistory();

  useEffect(() => {
    async function fetchBusiness() {
      const exist = await businessExists(currentUser.uid);
      if (!exist) history.push("/add-business");
      console.log(exist);
    }

    fetchBusiness();
  }, []);

  if (isFetching) return <Spinner />;

  return (
    <div className="h-screen w-full text-center">
      <p className="text-6xl">Welcome {currentUser.phoneNumber} 👋🏻</p>
      <button
        onClick={logout}
        className="px-4 py-2 text-xl rounded-lg bg-primary-500 text-white font-semibold mt-3"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
