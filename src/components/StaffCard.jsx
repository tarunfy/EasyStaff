import React, { useState, useContext } from "react";
import { MdPersonRemoveAlt1, MdEdit } from "react-icons/md";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { BusinessContext } from "../contexts/BusinessContext";

const StaffCard = ({ staff, handleRemove, business }) => {
  const [updateStaffModal, setUpdateStaffModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [designation, setDesignation] = useState("");
  const [address, setAddress] = useState("");
  const [managerName, setManagerName] = useState("");
  const [salary, setSalary] = useState("");
  const [email, setEmail] = useState("");

  const { fetchStaffs, updateStaff, getStaff } = useContext(BusinessContext);

  const openUpdateStaffModal = async () => {
    const data = await getStaff(staff.id);
    setFullName(data.fullName);
    setDesignation(data.designation);
    setSalary(data.salary);
    setAddress(data.address);
    setManagerName(data.managerName);
    setEmail(data.email);
    setPhoneNumber(data.phoneNumber);
    setUpdateStaffModal(true);
  };
  const closeUpdateStaffModal = () => {
    setUpdateStaffModal(false);
    clearModal();
  };

  const updateExistingStaff = async (e) => {
    e.preventDefault();
    await updateStaff(staff.id, {
      fullName,
      phoneNumber,
      designation,
      managerName,
      salary,
      email,
      address,
    });
    await fetchStaffs(business.businessId);
    clearModal();
    closeUpdateStaffModal();
  };

  const clearModal = () => {
    setAddress("");
    setDesignation("");
    setPhoneNumber("");
    setManagerName("");
    setEmail("");
    setSalary("");
    setFullName("");
  };

  return (
    <>
      <div className="w-full bg-slate-50 shadow-custom p-4 rounded-sm">
        <h1 className="font-bold text-3xl mb-4">{staff.fullName}</h1>
        <p className="font-medium text-xl text-slate-700 mb-1">
          {staff.designation}
        </p>
        <div className="flex justify-start items-center space-x-2 mb-4">
          <p className="font-semibold text-base text-slate-700">
            {staff.phoneNumber}
          </p>
          <p className="font-semibold text-base text-slate-700">
            {staff.email}
          </p>
        </div>
        <div className="flex justify-end items-center space-x-4">
          <Tippy interactive={true} animation="scale" content="Edit staff">
            <div
              onClick={openUpdateStaffModal}
              className="p-2 border-[1px] hover:cursor-pointer border-zinc-800 hover:text-teal-500 hover:border-[1px] hover:border-teal-500 transition-all duration-300 ease-in-out"
            >
              <MdEdit className="h-6 w-6" />
            </div>
          </Tippy>
          <Tippy interactive={true} animation="scale" content="Remove staff">
            <div
              onClick={() => handleRemove(staff.id)}
              className="p-2 border-[1px] hover:cursor-pointer border-zinc-800 hover:text-red-500 hover:border-[1px] hover:border-red-500 transition-all duration-300 ease-in-out"
            >
              <MdPersonRemoveAlt1 className="h-6 w-6" />
            </div>
          </Tippy>
        </div>
      </div>
      <Modal
        open={updateStaffModal}
        onClose={closeUpdateStaffModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex h-screen w-full items-center justify-center"
      >
        <Box className="p-3 bg-slate-50 text-center border-none outline-none focus:outline-none ">
          <h1 className="text-[2rem] font-semibold">Update Staff</h1>
          <hr className="bg-slate-400 h-[2px] w-full mb-4" />
          <form
            onSubmit={(e) => updateExistingStaff(e)}
            className="flex flex-col justify-start items-start space-y-3"
          >
            <div className="flex justify-between items-center w-full">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-[47%] p-2 text-lg focus:outline-quadtiary-400 border-2 border-gray"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-[47%] p-2 text-lg focus:outline-quadtiary-400 border-2 border-gray"
              />
            </div>
            <div className="flex justify-between items-center w-full">
              <input
                type="tel"
                maxLength="10"
                required
                pattern="[0-9]{10}"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                className="w-[47%] p-2 text-lg focus:outline-quadtiary-400 border-2 border-gray"
              />
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="Designation"
                className="w-[47%] p-2 text-lg focus:outline-quadtiary-400 border-2 border-gray"
              />
            </div>
            <div className="flex justify-between items-center w-full">
              <input
                type="text"
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                placeholder="Manager Name"
                className="w-[47%] p-2 text-lg focus:outline-quadtiary-500 border-2 border-gray"
              />
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Salary"
                className="w-[47%] p-2 text-lg focus:outline-quadtiary-500 border-2 border-gray"
              />
            </div>
            <div className="flex justify-between items-center w-full">
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                className="w-full p-2 text-lg focus:outline-quadtiary-500 border-2 border-gray"
              />
            </div>
            <div className="flex justify-end items-center space-x-3">
              <button
                onClick={closeUpdateStaffModal}
                className="font-semibold text-red-500 border-red-500 border-[1px]  hover:bg-red-500 hover:text-slate-50  duration-300 ease-in-out transition-all  text-xl   px-6 py-2"
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

export default StaffCard;
