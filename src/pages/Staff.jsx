import React, { useState, useContext, useEffect } from "react";
import { Sidebar, Spinner, StaffCard } from "../components";
import { BusinessContext } from "../contexts/BusinessContext";
import { AuthContext } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Box, Modal } from "@mui/material";
import notfound from "../assets/images/404.svg";

const Staff = () => {
  const [addStaffModal, setAddStaffModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [designation, setDesignation] = useState("");
  const [address, setAddress] = useState("");
  const [managerName, setManagerName] = useState("");
  const [salary, setSalary] = useState("");
  const [email, setEmail] = useState("");
  const [staffCode, setStaffCode] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const {
    staffList,
    createStaff,
    isLoading,
    isFetching,
    business,
    fetchStaffs,
    removeStaff,
    checkStaffCodeExists,
    fetchBusiness,
  } = useContext(BusinessContext);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function getStaff() {
      await fetchStaffs(business.businessId);
    }
    if (business) {
      getStaff();
    }
  }, []);

  useEffect(() => {
    async function getBusiness() {
      await fetchBusiness(currentUser.uid);
    }
    getBusiness();
  }, []);

  if (business == null) history.push("/add-business");

  const openAddStaffModal = () => {
    setAddStaffModal(true);
  };
  const closeAddStaffModal = () => {
    setAddStaffModal(false);
    clearModal();
  };

  const addNewStaff = async (e) => {
    setError("");
    e.preventDefault();

    const res = await checkStaffCodeExists(staffCode);
    if (res) {
      setError("Staff already exists with that staff code");
      return;
    }
    await createStaff({
      fullName,
      phoneNumber,
      designation,
      managerName,
      salary,
      email,
      address,
      staffCode,
      businessId: business.businessId,
      timestamp: new Date(),
    });

    closeAddStaffModal();
    fetchStaffs(business.businessId);
    clearModal();
  };

  const handleRemove = async (staffDocId) => {
    await removeStaff(staffDocId);
    await fetchStaffs(business.businessId);
  };

  const clearModal = () => {
    setAddress("");
    setDesignation("");
    setPhoneNumber("");
    setManagerName("");
    setEmail("");
    setSalary("");
    setFullName("");
    setStaffCode("");
  };

  if (isFetching || isLoading) return <Spinner />;

  return (
    <>
      <Sidebar />
      <div className="h-screen pl-64 w-full py-7 pr-7 bg-slate-50 flex justify-start flex-col overflow-y-scroll">
        <div className="flex justify-between items-center w-full  mb-10">
          <h1 className="text-6xl font-sans font-black">Your Staff</h1>
          <button
            onClick={openAddStaffModal}
            className="uppercase font-semibold hover:bg-quadtiary-500  hover:text-white hover:shadow-primary-1100 hover:scale-105 duration-300 ease-in-out hover:shadow-2xl transition-all  text-xl border-2 border-quadtiary-500 text-quadtiary-500 px-6 py-2"
          >
            Add
          </button>
        </div>
        <div className="grid grid-cols-3 gap-x-4 gap-y-6 w-full">
          {staffList &&
            staffList.map((staff, index) => (
              <StaffCard
                key={index}
                staff={staff}
                handleRemove={handleRemove}
                business={business}
              />
            ))}
        </div>
        {staffList && staffList.length < 1 && (
          <div className="flex justify-center items-center flex-col">
            <img src={notfound} alt="No staff found" className="h-128 w-128" />
            <h1 className="font-bold text-2xl">No staff found</h1>
          </div>
        )}
      </div>
      <Modal
        open={addStaffModal}
        onClose={closeAddStaffModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex h-screen w-full items-center justify-center"
      >
        <Box className="p-3 bg-slate-50 text-center border-none outline-none focus:outline-none ">
          <h1 className="text-[2rem] font-semibold">Add Staff</h1>
          <hr className="bg-slate-400 h-[2px] w-full mb-4" />
          <form
            onSubmit={addNewStaff}
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
                type="number"
                value={staffCode}
                onChange={(e) => setStaffCode(e.target.value)}
                placeholder="Staff Code"
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
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 text-lg focus:outline-quadtiary-400 border-2 border-gray"
            />
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              className="w-full p-2 text-lg focus:outline-quadtiary-500 border-2 border-gray"
            />
            {error && (
              <p className="text-base font-medium text-left my-1 text-red-500">
                {error}
              </p>
            )}
            <div className="flex justify-end items-center space-x-3">
              <button
                onClick={closeAddStaffModal}
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

export default Staff;
