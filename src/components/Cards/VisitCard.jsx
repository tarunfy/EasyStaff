import React, { useState, useContext } from "react";
import { BusinessContext } from "../../contexts/BusinessContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Box, Modal, TableCell, TableRow } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

const VisitCard = ({ report, deleteVisitReport, getVisitReports }) => {
  const [customerName, setCustomerName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [description, setDescription] = useState("");
  const [updateVisitModal, setUpdateVisitModal] = useState(false);

  const { getVisitReport, updateVisitReport, fetchVisitReports } =
    useContext(BusinessContext);
  const { currentUser } = useContext(AuthContext);

  const openUpdateVisitModal = async () => {
    const reportData = await getVisitReport(report.id);
    setCustomerName(reportData.customerName);
    setPurpose(reportData.purpose);
    setDescription(reportData.description);
    setUpdateVisitModal(true);
  };
  const closeUpdateVisitModal = () => {
    setUpdateVisitModal(false);
    clearModal();
  };

  const handleDeleteReport = async (reportId) => {
    await deleteVisitReport(reportId);
    getVisitReports();
  };

  const updateExistingVisitReport = async (e) => {
    e.preventDefault();
    await updateVisitReport(report.id, { customerName, purpose, description });
    await fetchVisitReports(currentUser.uid);
    closeUpdateVisitModal();
  };

  const clearModal = () => {
    setCustomerName("");
    setPurpose("");
    setDescription("");
  };

  return (
    <>
      <TableRow
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell sx={{ fontSize: "1.05rem", fontWeight: "500" }}>
          {report.customerName}
        </TableCell>
        <TableCell
          align="right"
          sx={{ fontSize: "1.05rem", fontWeight: "500" }}
        >
          {report.purpose}
        </TableCell>
        <TableCell
          align="right"
          sx={{ fontSize: "1.05rem", fontWeight: "500" }}
        >
          {report.description}
        </TableCell>
        <TableCell
          align="right"
          sx={{ fontSize: "1.05rem", fontWeight: "500" }}
        >
          {moment(report.createdAt).format("MM/DD/YYYY")}
        </TableCell>
        <TableCell align="right">
          <Tippy content="Edit visit" interactive={true} animation="scale">
            <button
              onClick={openUpdateVisitModal}
              className="p-1 border-[1px] border-zinc-800 hover:text-teal-500 hover:border-[1px] hover:border-teal-500 transition-all duration-300 ease-in-out mr-1"
            >
              <EditIcon />
            </button>
          </Tippy>
          <Tippy content="Delete visit" interactive={true} animation="scale">
            <button
              onClick={() => handleDeleteReport(report.id)}
              className="p-1 border-[1px]  border-zinc-800 hover:text-red-500 hover:border-[1px] hover:border-red-500 transition-all duration-300 ease-in-out"
            >
              <RemoveCircleOutlineIcon />
            </button>
          </Tippy>
        </TableCell>
      </TableRow>

      {/* Update Visit Report Modal */}
      <Modal
        open={updateVisitModal}
        onClose={closeUpdateVisitModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex h-screen w-full items-center justify-center"
      >
        <Box className="px-6 py-3 w-[30%] bg-slate-50 text-center border-none outline-none focus:outline-none ">
          <h1 className="text-[2rem] font-semibold">Update Visit</h1>
          <hr className="bg-slate-400 h-[2px] w-full mb-4" />
          <form
            onSubmit={(e) => updateExistingVisitReport(e)}
            className="flex flex-col justify-start items-start space-y-3"
          >
            <input
              type="text"
              required
              disabled
              autoComplete="off"
              placeholder={report.customerName}
              className="p-2 w-full text-lg text-slate-400 border-2 border-gray"
            />
            <input
              type="text"
              value={purpose}
              required
              autoComplete="off"
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Purpose"
              className="p-2 my-2 w-full text-lg focus:outline-quadtiary-500 border-2 border-gray"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full mb-2 p-2 text-lg focus:outline-quadtiary-400 border-2 border-gray"
            />
            <div className="flex justify-end items-center space-x-3">
              <button
                onClick={closeUpdateVisitModal}
                className="font-semibold text-red-500 border-red-500 border-[1px]  hover:bg-red-500 hover:text-slate-50  duration-300 ease-in-out transition-all  text-xl   px-6 py-2"
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

export default VisitCard;
