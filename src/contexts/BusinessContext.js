import React, { createContext, useState } from "react";
import { db } from "../services/firebase";

export const BusinessContext = createContext(null);

export const BusinessProvider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [business, setBusiness] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBusiness = async (userId) => {
    setIsFetching(true);
    let exists = true;
    try {
      const snapshot = await db
        .collection("business")
        .where("userId", "==", userId)
        .get();
      if (snapshot.docs.length > 0) {
        setBusiness({
          ...snapshot.docs[0].data(),
          businessId: snapshot.docs[0].id,
        });
        console.log(business);
      } else {
        exists = false;
      }
    } catch (err) {
      console.log(err);
      exists = false;
    }
    setIsFetching(false);
    return exists;
  };

  const createBusiness = async (userId, businessDetails) => {
    setIsLoading(true);
    try {
      await db.collection("business").add({ ...businessDetails, userId });
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
