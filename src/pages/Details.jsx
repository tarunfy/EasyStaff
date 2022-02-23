import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Details = () => {
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);

  return <div>Details</div>;
};

export default Details;
