import React, { useState, useContext } from "react";
import { BusinessContext } from "../contexts/BusinessContext";
import { AuthContext } from "../contexts/AuthContext";
import { Box, Modal, TableCell, TableRow } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

const SalaryCard = ({ report, deleteSalaryReport, getSalaryReports }) => {
  const [staffName, setStaffName] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("Regular");
  const [updateSalaryModal, setUpdateSalaryModal] = useState(false);

  const { getSalaryReport, updateSalaryReport, fetchSalaryReports } =
    useContext(BusinessContext);
  const { currentUser } = useContext(AuthContext);

  const openUpdateSalaryModal = async () => {
    const reportData = await getSalaryReport(report.id);
    setStaffName(reportData.staffName);
    setAmount(reportData.amount);
    setPaymentType(reportData.paymentType);
    setUpdateSalaryModal(true);
  };
  const closeUpdateSalaryModal = () => {
    setUpdateSalaryModal(false);
    clearModal();
  };

  const handleDeleteReport = async (reportId) => {
    await deleteSalaryReport(reportId);
    getSalaryReports();
  };

  const updateExistingSalaryReport = async (e) => {
    e.preventDefault();
    await updateSalaryReport(report.id, { staffName, amount, paymentType });
    await fetchSalaryReports(currentUser.uid);
    closeUpdateSalaryModal();
  };

  const clearModal = () => {
    setStaffName("");
    setAmount("");
    setPaymentType("Regular");
  };

  const handlePaymentType = (e) => {
    if (paymentType == e.target.value) {
      return;
    }
    setPaymentType(e.target.value);
  };

  return (
    <>
      <TableRow
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell sx={{ fontSize: "1.05rem", fontWeight: "500" }}>
          {report.staffName}
        </TableCell>
        <TableCell
          align="right"
          sx={{ fontSize: "1.05rem", fontWeight: "500" }}
        >
          {report.paymentType}
        </TableCell>
        <TableCell
          align="right"
          sx={{ fontSize: "1.05rem", fontWeight: "500" }}
        >
          {report.amount}
        </TableCell>
        <TableCell
          align="right"
          sx={{ fontSize: "1.05rem", fontWeight: "500" }}
        >
          {report.createdAt.toDate().toLocaleDateString()}
        </TableCell>
        <TableCell align="right">
          <Tippy content="Edit report" interactive={true} animation="scale">
            <button
              onClick={openUpdateSalaryModal}
              className="p-1 border-[1px] outline-quadtiary-500 border-zinc-800 hover:text-teal-500 hover:border-[1px] hover:border-teal-500 transition-all duration-300 ease-in-out mr-1"
            >
              <EditIcon />
            </button>
          </Tippy>
          <Tippy content="Delete report" interactive={true} animation="scale">
            <button
              onClick={() => handleDeleteReport(report.id)}
              className="p-1 border-[1px] outline-quadtiary-500  border-zinc-800 hover:text-red-500 hover:border-[1px] hover:border-red-500 transition-all duration-300 ease-in-out"
            >
              <RemoveCircleOutlineIcon />
            </button>
          </Tippy>
        </TableCell>
      </TableRow>

      {/* Update Salary Report Modal */}
      <Modal
        open={updateSalaryModal}
        onClose={closeUpdateSalaryModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex h-screen w-full items-center justify-center"
      >
        <Box className="px-6 py-3 bg-slate-50 text-center border-none outline-none focus:outline-none ">
          <h1 className="text-[2rem] font-semibold">Update Salary</h1>
          <p className="text-sm font-normal text-zinc-400">
            Salary will be counted from 1 to 1, ex: 1st Jan - 1st Feb
          </p>
          <hr className="bg-slate-400 h-[2px] w-full mb-4" />
          <form
            onSubmit={(e) => updateExistingSalaryReport(e)}
            className="flex flex-col justify-start items-start space-y-3"
          >
            <input
              type="text"
              value={staffName}
              required
              disabled
              autoComplete="off"
              onChange={(e) => setStaffName(e.target.value)}
              placeholder="Staff Name"
              className="p-2 w-full text-lg text-slate-400 border-2 border-gray"
            />
            <input
              type="number"
              value={amount}
              required
              autoFocus
              autoComplete="off"
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="p-2 my-2 w-full text-lg focus:outline-quadtiary-500 border-2 border-gray"
            />
            <div className="flex w-full items-center justify-start space-x-3 mb-5">
              <div className="flex items-center space-x-1">
                <input
                  type="radio"
                  value="Regular"
                  name="paymentType"
                  onClick={(e) => handlePaymentType(e)}
                  checked={paymentType === "Regular"}
                />
                <label htmlFor="regular" className="text-xl font-medium">
                  Regular
                </label>
              </div>
              <div className="flex items-center space-x-1">
                <input
                  type="radio"
                  checked={paymentType === "Advance"}
                  value="Advance"
                  onClick={(e) => handlePaymentType(e)}
                  name="paymentType"
                />
                <label htmlFor="advance" className="text-xl font-medium">
                  Advance
                </label>
              </div>
            </div>
            <div className="flex justify-end items-center space-x-3">
              <button
                onClick={closeUpdateSalaryModal}
                className="font-semibold text-red-500 border-red-500 border-[1px]  hover:bg-red-500 hover:text-slate-50 duration-300 ease-in-out transition-all  text-xl   px-6 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="font-semibold text-white bg-quadtiary-500   duration-300 ease-in-out hover:shadow-xl transition-all  text-xl  px-6 py-2"
              >
                Save
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default SalaryCard;
