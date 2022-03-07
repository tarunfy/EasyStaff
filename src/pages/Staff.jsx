import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Spinner from "../components/Spinner";
import { Box, Modal } from "@mui/material";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { MdPersonRemoveAlt1, MdEdit } from "react-icons/md";
import notfound from "../assets/images/404.svg";
import { BusinessContext } from "../contexts/BusinessContext";
import { AuthContext } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const Staff = () => {
  const [addStaffModal, setAddStaffModal] = useState(false);
  const [updateStaffModal, setUpdateStaffModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [designation, setDesignation] = useState("");
  const [address, setAddress] = useState("");
  const [managerName, setManagerName] = useState("");
  const [salary, setSalary] = useState("");
  const [email, setEmail] = useState("");

  const history = useHistory();

  const {
    staffList,
    createStaff,
    isLoading,
    isFetching,
    business,
    fetchBusiness,
  } = useContext(BusinessContext);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function getBusiness() {
      await fetchBusiness(currentUser.uid);
    }
    getBusiness();
  }, []);

  useEffect(() => {
    console.log(staffList);
  }, [staffList]);

  if (business == null) history.push("/add-business");

  const openUpdateStaffModal = () => {
    setUpdateStaffModal(true);
  };
  const closeUpdateStaffModal = () => {
    setUpdateStaffModal(false);
  };
  const openAddStaffModal = () => {
    setAddStaffModal(true);
  };
  const closeAddStaffModal = () => {
    setAddStaffModal(false);
  };

  const addNewStaff = async (e) => {
    e.preventDefault();

    await createStaff({
      fullName,
      phoneNumber,
      designation,
      managerName,
      salary,
      email,
      address,
      businessId: business.businessId,
    });

    addStaffModal ? closeAddStaffModal() : closeUpdateStaffModal();
  };

  const updateExistingStaff = () => {
    console.log("update existing staff...");
  };

  const handleRemove = () => {
    console.log("removing staff...");
  };

  if (isFetching || isLoading) return <Spinner />;

  return (
    <>
      <Sidebar />
      <div className="h-screen pl-64 w-full py-7 pr-7 bg-slate-50 flex justify-start flex-col overflow-y-scroll">
        <div className="flex justify-between items-center w-full  mb-10">
          <h1 className="text-6xl font-black">Your Staff</h1>
          <button
            onClick={openAddStaffModal}
            className=" uppercase font-semibold hover:bg-quadtiary-500  hover:text-white hover:shadow-primary-1100 hover:scale-105 duration-300 ease-in-out hover:shadow-2xl transition-all  text-xl border-2 border-quadtiary-500 text-quadtiary-500 px-6 py-2"
          >
            Add
          </button>
        </div>
        {staffList ? (
          <div className="grid grid-cols-3 gap-x-4 gap-y-6 w-full">
            <div className="w-full bg-slate-50 shadow-custom p-4 rounded-sm">
              <h1 className="font-bold text-3xl mb-4">Jhon Doe</h1>
              <p className="font-medium text-xl text-slate-700 mb-1">
                Chief Technology Officer
              </p>
              <div className="flex justify-start items-center space-x-2 mb-4">
                <p className="font-semibold text-base text-slate-700">
                  8345710284
                </p>
                <p className="font-semibold text-base text-slate-700">
                  jhondoe@gmail.com
                </p>
              </div>
              <div className="flex justify-end items-center space-x-4">
                <Tippy
                  interactive={true}
                  animation="scale"
                  content="Edit staff"
                >
                  <div
                    onClick={openUpdateStaffModal}
                    className="p-2 border-[1px] hover:cursor-pointer border-zinc-800 hover:text-teal-500 hover:border-[1px] hover:border-teal-500 transition-all duration-300 ease-in-out"
                  >
                    <MdEdit className="h-6 w-6" />
                  </div>
                </Tippy>
                <Tippy
                  interactive={true}
                  animation="scale"
                  content="Remove staff"
                >
                  <div
                    onClick={handleRemove}
                    className="p-2 border-[1px] hover:cursor-pointer border-zinc-800 hover:text-red-500 hover:border-[1px] hover:border-red-500 transition-all duration-300 ease-in-out"
                  >
                    <MdPersonRemoveAlt1 className="h-6 w-6" />
                  </div>
                </Tippy>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center flex-col items-center">
            <img src={notfound} alt="No staff found" className="h-128 w-128" />
            <h1 className="font-bold text-2xl">No staff found</h1>
          </div>
        )}
      </div>
      <Modal
        open={addStaffModal || updateStaffModal}
        onClose={addStaffModal ? closeAddStaffModal : closeUpdateStaffModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex h-screen w-full items-center justify-center"
      >
        <Box className="p-3 bg-slate-50 text-center border-none outline-none focus:outline-none ">
          <h1 className="text-[2rem] font-semibold">
            {addStaffModal ? "Add Staff" : "Update Staff"}
          </h1>
          <hr className="bg-slate-400 h-[2px] w-full mb-4" />
          <form
            onSubmit={addStaffModal ? addNewStaff : updateExistingStaff}
            className="flex flex-col justify-start items-start space-y-3"
          >
            <div className="flex justify-between items-center w-full">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={addStaffModal ? "Full Name" : "Jhon Doe"}
                className="w-[47%] p-2 text-lg focus:outline-quadtiary-400 border-2 border-gray"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={addStaffModal ? "Email" : "jhondoe@gmail.com"}
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
                placeholder={addStaffModal ? "Phone Number" : "9827453621"}
                className="w-[47%] p-2 text-lg focus:outline-quadtiary-400 border-2 border-gray"
              />
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder={
                  addStaffModal ? "Designation" : "Chief Technology Officer"
                }
                className="w-[47%] p-2 text-lg focus:outline-quadtiary-400 border-2 border-gray"
              />
            </div>
            <div className="flex justify-between items-center w-full">
              <input
                type="text"
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                placeholder={addStaffModal ? "Manager Name" : "Om Prakash"}
                className="w-[47%] p-2 text-lg focus:outline-quadtiary-500 border-2 border-gray"
              />
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder={addStaffModal ? "Salary" : "25000"}
                className="w-[47%] p-2 text-lg focus:outline-quadtiary-500 border-2 border-gray"
              />
            </div>
            <div className="flex justify-between items-center w-full">
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={
                  addStaffModal ? "Address" : "Street 48, Noida Sectore 48, UP."
                }
                className="w-full p-2 text-lg focus:outline-quadtiary-500 border-2 border-gray"
              />
            </div>
            <div className="flex justify-end items-center space-x-3">
              <button
                onClick={
                  addStaffModal ? closeAddStaffModal : closeUpdateStaffModal
                }
                className="font-semibold text-red-500 border-red-500 border-[1px]  duration-300 ease-in-out hover:shadow-xl transition-all  text-xl   px-6 py-2"
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
