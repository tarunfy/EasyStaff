import React, { createContext, useState } from "react";
import { db } from "../services/firebase";

export const BusinessContext = createContext(null);

export const BusinessProvider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [business, setBusiness] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBusiness = async (userId) => {
    setIsFetching(true);
    try {
      const businessRef = await db.collection("business").doc(userId).get();
      setBusiness(businessRef.data());
      setIsFetching(false);
      return businessRef.exists;
    } catch (err) {
      console.log(err);
    }
    setIsFetching(false);
  };

  const createBusiness = async (userId, businessDetails) => {
    setIsLoading(true);
    try {
      await db.collection("business").doc(userId).set(businessDetails);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <BusinessContext.Provider
      value={{
        business,
        fetchBusiness,
        isFetching,
        setBusiness,
        isLoading,
        createBusiness,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};
