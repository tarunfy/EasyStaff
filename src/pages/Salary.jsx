import { useState, useContext, useEffect } from "react";
import { BusinessContext } from "../contexts/BusinessContext";
import { AuthContext } from "../contexts/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Modal,
} from "@mui/material";
import Spinner from "../components/Spinner";
import Sidebar from "../components/Sidebar/Sidebar";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import moment from "moment";

const Salary = () => {
  const [staffName, setStaffName] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("Regular");
  const [addSalaryModal, setAddSalaryModal] = useState(false);

  const { salaryReports, isFetching, fetchSalaryReports } =
    useContext(BusinessContext);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function getSalaryReports() {
      await fetchSalaryReports(currentUser.uid);
    }

    getSalaryReports();
  }, []);

  const openAddSalaryModal = () => {
    setAddSalaryModal(true);
  };
  const closeAddSalaryModal = () => {
    setAddSalaryModal(false);
    clearModal();
  };
  const addNewSalary = (e) => {
    e.preventDefault();
    console.log(staffName, amount, paymentType);
    closeAddSalaryModal();
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

  if (isFetching) return <Spinner />;

  return (
    <>
      <Sidebar />
      <div className="h-screen pl-64 w-full py-7 pr-7 bg-slate-50 flex justify-start flex-col overflow-y-scroll">
        <div className="flex items-center mb-10 justify-end w-full">
          <button
            onClick={openAddSalaryModal}
            className="font-semibold hover:bg-quadtiary-500  hover:text-white hover:shadow-primary-1100 hover:scale-105 duration-300 ease-in-out hover:shadow-2xl transition-all  text-xl border-2 border-quadtiary-500 text-quadtiary-500 px-6 py-2"
          >
            Add Salary Report
          </button>
        </div>
        <div className="flex justify-center">
          {salaryReports ? (
            <TableContainer component={Paper}>
              <Table
                sx={{
                  minWidth: 650,
                  overflow: "visible",
                  boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow
                    sx={{
                      borderBottom: "1.2px solid black !important",
                      backgroundColor: "#f6f2ff",
                    }}
                  >
                    <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      Staff Name
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      Payment Type
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      Amount
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      Payed on
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salaryReports.map((report, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        sx={{ fontSize: "1.05rem", fontWeight: "500" }}
                      >
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
                        {moment(report.createdAt).format("MM/DD/YYYY")}
                      </TableCell>
                      <TableCell align="right">
                        <Tippy
                          content="Edit report"
                          interactive={true}
                          animation="scale"
                        >
                          <button className="p-1 border-[1px] border-zinc-800 hover:text-teal-500 hover:border-[1px] hover:border-teal-500 transition-all duration-300 ease-in-out mr-1">
                            <EditIcon />
                          </button>
                        </Tippy>
                        <Tippy
                          content="Delete report"
                          interactive={true}
                          animation="scale"
                        >
                          <button className="p-1 border-[1px]  border-zinc-800 hover:text-red-500 hover:border-[1px] hover:border-red-500 transition-all duration-300 ease-in-out">
                            <RemoveCircleOutlineIcon />
                          </button>
                        </Tippy>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <>
              <p className="text-2xl font-semibold">
                No salary report available, please add a report.
              </p>
            </>
          )}
        </div>
      </div>
      <Modal
        open={addSalaryModal}
        onClose={closeAddSalaryModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex h-screen w-full items-center justify-center"
      >
        <Box className="px-6 py-3 bg-slate-50 text-center border-none outline-none focus:outline-none ">
          <h1 className="text-[2rem] font-semibold">Add Salary</h1>
          <p className="text-sm font-normal text-zinc-500">
            Salary will be counted from 1 to 1, ex: 1st Jan - 1st Feb
          </p>
          <hr className="bg-slate-400 h-[2px] w-full mb-4" />
          <form
            onSubmit={addNewSalary}
            className="flex flex-col justify-start items-start space-y-3"
          >
            <input
              type="text"
              value={staffName}
              required
              autoComplete="off"
              onChange={(e) => setStaffName(e.target.value)}
              placeholder="Staff Name"
              className="p-2 w-full text-lg focus:outline-quadtiary-400 border-2 border-gray"
            />
            <input
              type="number"
              value={amount}
              required
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
                onClick={closeAddSalaryModal}
                className="font-semibold text-red-500 border-red-500 border-[1px]  duration-300 ease-in-out hover:shadow-xl transition-all  text-xl   px-6 py-2"
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

export default Salary;
