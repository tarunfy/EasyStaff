import React, { useState, useContext, useEffect } from "react";
import { Sidebar, Spinner, CustomerCard } from "../components";
import { BusinessContext } from "../contexts/BusinessContext";
import { AuthContext } from "../contexts/AuthContext";
import { Box, Modal } from "@mui/material";

const Customer = () => {
  const [addCustomerModal, setAddCustomerModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [customerCode, setCustomerCode] = useState("");

  const {
    customerList,
    createCustomer,
    isLoading,
    isFetching,
    fetchCustomers,
    business,
    fetchBusiness,
    removeCustomer,
  } = useContext(BusinessContext);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function getBusiness() {
      await fetchBusiness(currentUser.uid);
    }
    getBusiness();
  }, []);

  useEffect(() => {
    async function getCustomer() {
      await fetchCustomers(business.businessId);
    }
    if (business) {
      getCustomer();
    }
  }, []);

  const openAddCustomerModal = () => {
    setAddCustomerModal(true);
  };
  const closeAddCustomerModal = () => {
    setAddCustomerModal(false);
    clearModal();
  };

  const addNewCustomer = async (e) => {
    e.preventDefault();

    await createCustomer({
      fullName,
      phoneNumber,
      email,
      customerCode,
      businessId: business.businessId,
      timestamp: new Date(),
    });

    closeAddCustomerModal();
    fetchCustomers(business.businessId);
    clearModal();
  };

  const handleRemove = async (customerDocId) => {
    await removeCustomer(customerDocId);
    await fetchCustomers(business.businessId);
  };

  const clearModal = () => {
    setPhoneNumber("");
    setEmail("");
    setFullName("");
    setCustomerCode("");
  };

  if (isFetching || isLoading) return <Spinner />;

  return (
    <>
      <Sidebar />
      <div className="h-screen pl-64 w-full py-7 pr-7 bg-slate-50 flex justify-start flex-col overflow-y-scroll">
        <div className="flex justify-between items-center w-full  mb-10">
          <h1 className="text-6xl font-sans font-black">Your Customers</h1>

          <button
            onClick={openAddCustomerModal}
            className="uppercase font-semibold hover:bg-quadtiary-500  hover:text-white hover:shadow-primary-1100 hover:scale-105 duration-300 ease-in-out hover:shadow-2xl transition-all  text-xl border-2 border-quadtiary-500 text-quadtiary-500 px-6 py-2"
          >
            Add
          </button>
        </div>
        <div className="grid grid-cols-3 gap-x-4 gap-y-6 w-full">
          {customerList &&
            customerList.map((customer, index) => (
              <CustomerCard
                key={index}
                customer={customer}
                handleRemove={handleRemove}
                business={business}
              />
            ))}
        </div>
        {customerList && customerList.length < 1 && (
          <div className="flex justify-center items-center flex-col">
            <h1 className="font-bold text-3xl">No customer found</h1>
          </div>
        )}
      </div>
      <Modal
        open={addCustomerModal}
        onClose={closeAddCustomerModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex h-screen w-full items-center justify-center"
      >
        <Box className="p-3 w-[30%] bg-slate-50 text-center border-none outline-none focus:outline-none ">
          <h1 className="text-[2rem] font-semibold">Add Customer</h1>
          <hr className="bg-slate-400 h-[2px] w-full mb-4" />
          <form
            onSubmit={addNewCustomer}
            className="flex flex-col  justify-start items-start space-y-3"
          >
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full p-2 text-lg focus:outline-quadtiary-400 border-2 border-gray"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 text-lg focus:outline-quadtiary-400 border-2 border-gray"
            />
            <input
              type="tel"
              maxLength="10"
              required
              pattern="[0-9]{10}"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              className="w-full p-2 text-lg focus:outline-quadtiary-400 border-2 border-gray"
            />
            <input
              type="number"
              value={customerCode}
              onChange={(e) => setCustomerCode(e.target.value)}
              placeholder="Customer Code"
              className="w-full p-2 text-lg focus:outline-quadtiary-500 border-2 border-gray"
            />
            <div className="flex justify-end items-center space-x-3">
              <button
                onClick={closeAddCustomerModal}
                className="font-semibold text-red-500 border-red-500 border-[1px] hover:bg-red-500 hover:text-slate-50 text-xl duration-300 ease-in-out transition-all  px-6 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="font-semibold text-white bg-quadtiary-500   duration-300 ease-in-out hover:shadow-xl transition-all  text-xl  px-6 py-2"
              >
                Submit
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Customer;
