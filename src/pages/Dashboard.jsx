import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { BusinessContext } from "../contexts/BusinessContext";
import { useHistory } from "react-router-dom";
import Spinner from "../components/Spinner";
import Sidebar from "../components/Sidebar/Sidebar";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const { fetchBusiness, isFetching, business } = useContext(BusinessContext);

  const history = useHistory();

  useEffect(() => {
    async function getBusiness() {
      await fetchBusiness(currentUser.uid);
    }
    getBusiness();
  }, []);

  if (isFetching) return <Spinner />;

  if (business == null) history.push("/add-business");

  return (
    <>
      <Sidebar />
      <div className="h-screen pl-56 w-full bg-slate-50 text-center">
        <p className="text-4xl">Welcome {currentUser.email} 👋🏻</p>
      </div>
    </>
  );
};

export default Dashboard;
