import React, { createContext, useState } from "react";
import { db } from "../services/firebase";

export const BusinessContext = createContext(null);

export const BusinessProvider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(true);

  const businessExists = async (userId) => {
    setIsFetching(true);
    try {
      const businessRef = await db.collection("business").doc(userId).get();
      setIsFetching(false);
      return businessRef.exists;
    } catch (err) {
      console.log(err);
    }

    setIsFetching(false);
  };

  return (
    <BusinessContext.Provider value={{ businessExists, isFetching }}>
      {children}
    </BusinessContext.Provider>
  );
};
