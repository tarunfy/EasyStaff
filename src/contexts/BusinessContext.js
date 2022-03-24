import React, { createContext, useState } from "react";
import { db } from "../services/firebase";

export const BusinessContext = createContext(null);

export const BusinessProvider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [business, setBusiness] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [staffList, setStaffList] = useState(null);
  const [salaryReports, setSalaryReports] = useState(null);
  const [customerList, setCustomerList] = useState(null);

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

  const fetchStaffs = async (businessId) => {
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

  const getStaff = async (docId) => {
    let data = null;
    try {
      const doc = await db.collection("staff").doc(docId).get();
      data = doc.data();
    } catch (err) {
      console.log(err);
    }
    return data;
  };

  const fetchSalaryReports = async (userId) => {
    setIsFetching(true);
    let reports = [];
    try {
      const res = await db
        .collection("salary")
        .where("userId", "==", userId)
        .get();
      res.docs.forEach((doc) => {
        reports.push({ ...doc.data(), id: doc.id });
      });
    } catch (err) {
      console.log(err);
    }
    if (reports.length > 0) {
      setSalaryReports(reports);
    } else {
      setSalaryReports(null);
    }
    setIsFetching(false);
  };

  const addNewSalaryReport = async (report) => {
    setIsLoading(true);
    try {
      await db.collection("salary").add(report);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const deleteSalaryReport = async (reportId) => {
    setIsLoading(true);
    try {
      await db.collection("salary").doc(reportId).delete();
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const getSalaryReport = async (reportId) => {
    let data = null;
    try {
      const doc = await db.collection("salary").doc(reportId).get();
      data = doc.data();
    } catch (err) {
      console.log(err);
    }

    return data;
  };

  const updateSalaryReport = async (reportId, details) => {
    setIsLoading(true);
    try {
      await db.collection("salary").doc(reportId).update(details);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  // Customers:
  const fetchCustomers = async (businessId) => {
    setIsFetching(true);
    let list = [];
    try {
      const res = await db
        .collection("customer")
        .where("businessId", "==", businessId)
        .orderBy("timestamp", "desc")
        .get();
      res.docs.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setCustomerList(list);
    } catch (err) {
      console.log(err);
    }
    setIsFetching(false);
  };

  const createCustomer = async (details) => {
    setIsLoading(true);
    try {
      await db.collection("customer").add(details);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const removeCustomer = async (docId) => {
    setIsLoading(true);
    try {
      await db.collection("customer").doc(docId).delete();
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const updateCustomer = async (docId, details) => {
    setIsLoading(true);
    try {
      await db.collection("customer").doc(docId).update(details);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const getCustomer = async (docId) => {
    let data = null;
    try {
      const doc = await db.collection("customer").doc(docId).get();
      data = doc.data();
    } catch (err) {
      console.log(err);
    }
    return data;
  };

  return (
    <BusinessContext.Provider
      value={{
        fetchBusiness,
        customerList,
        createBusiness,
        fetchStaffs,
        updateSalaryReport,
        removeCustomer,
        updateCustomer,
        getCustomer,
        createStaff,
        removeStaff,
        updateStaff,
        getStaff,
        business,
        staffList,
        setBusiness,
        setStaffList,
        isFetching,
        setBusiness,
        isLoading,
        salaryReports,
        fetchCustomers,
        createCustomer,
        // removeCustomer,
        fetchSalaryReports,
        addNewSalaryReport,
        deleteSalaryReport,
        getSalaryReport,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};
