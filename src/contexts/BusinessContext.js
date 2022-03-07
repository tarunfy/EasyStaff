import React, { createContext, useState } from "react";
import { db } from "../services/firebase";

export const BusinessContext = createContext(null);

export const BusinessProvider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [business, setBusiness] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [staffList, setStaffList] = useState(null);

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

  const fetchStaff = async (businessId) => {
    setIsFetching(true);
    let list = [];
    try {
      const res = await db
        .collection("staff")
        .where("businessId", "==", businessId)
        .orderBy("timestamp", "desc")
        .get();
      res.docs.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setStaffList(list);
    } catch (err) {
      console.log(err);
    }
    setIsFetching(false);
  };

  const createStaff = async (details) => {
    setIsLoading(true);
    try {
      await db.collection("staff").add(details);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const removeStaff = async (docId) => {
    setIsLoading(true);
    try {
      await db.collection("staff").doc(docId).delete();
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const updateStaff = async (docId, details) => {
    setIsLoading(true);
    try {
      await db.collection("staff").doc(docId).update(details);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <BusinessContext.Provider
      value={{
        fetchBusiness,
        createBusiness,
        fetchStaff,
        createStaff,
        removeStaff,
        updateStaff,
        business,
        staffList,
        setBusiness,
        setStaffList,
        isFetching,
        setBusiness,
        isLoading,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};
