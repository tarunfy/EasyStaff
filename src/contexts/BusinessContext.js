import React, { createContext, useState } from "react";
import { db } from "../services/firebase";

export const BusinessContext = createContext(null);

export const BusinessProvider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [business, setBusiness] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const createBusiness = async (userId, businessDetails) => {
    setIsLoading(true);
    try {
      await db.collection("business").doc(userId).set(businessDetails);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const fetchBusiness = async (userId) => {
    setIsFetching(true);
    try {
      const business = await db.collection("business").doc(userId).get();
      setIsFetching(false);
      return business;
    } catch (err) {
      console.log(err);
    }
    setIsFetching(false);
  };

  return (
    <BusinessContext.Provider
      value={{
        businessExists,
        isFetching,
        setBusiness,
        isLoading,
        createBusiness,
        fetchBusiness,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};
