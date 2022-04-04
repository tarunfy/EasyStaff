import React, { useState, useContext } from "react";
import { MdPersonRemoveAlt1, MdEdit } from "react-icons/md";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { BusinessContext } from "../../contexts/BusinessContext";

const CustomerCard = ({ customer, handleRemove, business }) => {
  const [updateCustomerModal, setUpdateCustomerModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [customerCode, setCustomerCode] = useState("");

  const { fetchCustomers, updateCustomer, getCustomer } =
    useContext(BusinessContext);

  const openUpdateCustomerModal = async () => {
    const data = await getCustomer(customer.id);
    setFullName(data.fullName);
    setEmail(data.email);
    setPhoneNumber(data.phoneNumber);
    setCustomerCode(data.customerCode);
    setUpdateCustomerModal(true);
  };
  const closeUpdateCustomerModal = () => {
    setUpdateCustomerModal(false);
    clearModal();
  };

  const updateExistingCustomer = async (e) => {
    e.preventDefault();
    await updateCustomer(customer.id, {
      fullName,
      phoneNumber,
      customerCode,
      email,
    });
    await fetchCustomers(business.businessId);
    clearModal();
    closeUpdateCustomerModal();
  };

  const clearModal = () => {
    setPhoneNumber("");
    setEmail("");
    setCustomerCode("");
    setFullName("");
  };

  return (
    <>
      <div className="w-full bg-slate-50 shadow-custom  p-4 rounded-sm border-quadtiary-500 ">
        <h1 className="font-bold text-3xl mb-4 text-black/75">
          {customer.fullName}
        </h1>
        <p className="font-medium text-xl text-slate-700 mb-1">
          {customer.email}
        </p>
        <p className="font-semibold text-lg text-slate-700">
          {customer.phoneNumber}
        </p>
        <p className="font-semibold text-base text-slate-700">
          {customer.customerCode}
        </p>
        <div className="flex justify-end items-center space-x-4">
          <Tippy interactive={true} animation="scale" content="Edit customer">
            <div
              onClick={openUpdateCustomerModal}
              className="p-2 border-[1px] hover:cursor-pointer border-zinc-800 hover:text-quadtiary-500 hover:border-[1px] hover:border-quadtiary-500 transition-all duration-300 ease-in-out"
            >
              <MdEdit className="h-6 w-6" />
            </div>
          </Tippy>
          <Tippy interactive={true} animation="scale" content="Remove customer">
            <div
              onClick={() => handleRemove(customer.id)}
              className="p-2 border-[1px] hover:cursor-pointer border-zinc-800 hover:text-red-500 hover:border-[1px] hover:border-red-500 transition-all duration-300 ease-in-out"
            >
              <MdPersonRemoveAlt1 className="h-6 w-6" />
            </div>
          </Tippy>
        </div>
      </div>
      <Modal
        open={updateCustomerModal}
        onClose={closeUpdateCustomerModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex h-screen w-full items-center justify-center"
      >
        <Box className="p-3 w-[30%] bg-slate-50 text-center border-none outline-none focus:outline-none ">
          <h1 className="text-[2rem] font-semibold">Update Customer</h1>
          <hr className="bg-slate-400 h-[2px] w-full mb-4" />
          <form
            onSubmit={(e) => updateExistingCustomer(e)}
            className="flex flex-col justify-start items-start space-y-3"
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
                onClick={closeUpdateCustomerModal}
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

export default CustomerCard;
