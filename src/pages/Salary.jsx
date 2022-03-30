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
  Button,
} from "@mui/material";
import notfound from "../assets/images/404.svg";
import Spinner from "../components/Spinner";
import Sidebar from "../components/Sidebar/Sidebar";
import SalaryCard from "../components/SalaryCard";
import SearchBar from "../components/SearchBar";
import DateRangePicker from "../components/DateRangePicker";
import DropdownFilter from "../components/DropdownFilter";

const Salary = () => {
  const [staffName, setStaffName] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("Regular");
  const [addSalaryModal, setAddSalaryModal] = useState(false);

  const [filterName, setFilterName] = useState("");
  const [filterAmount, setFilterAmount] = useState("");
  const [filterPaymentType, setFilterPaymentType] = useState("");
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");

  const {
    salaryReports,
    isFetching,
    fetchSalaryReports,
    addNewSalaryReport,
    isLoading,
    deleteSalaryReport,
    staffList,
  } = useContext(BusinessContext);

  const { currentUser } = useContext(AuthContext);

  async function getSalaryReports() {
    await fetchSalaryReports(currentUser.uid);
  }

  useEffect(() => {
    getSalaryReports();
  }, []);

  const openAddSalaryModal = () => {
    setAddSalaryModal(true);
  };
  const closeAddSalaryModal = () => {
    setAddSalaryModal(false);
    clearModal();
  };
  const addNewSalary = async (e) => {
    e.preventDefault();
    await addNewSalaryReport({
      staffName,
      amount,
      paymentType,
      createdAt: Date.now(),
      userId: currentUser.uid,
    });
    closeAddSalaryModal();
    getSalaryReports();
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

  const applyFilters = () => {
    console.log(filterAmount);
    console.log(filterPaymentType);
    console.log(filterFrom);
    console.log(filterTo);
  };

  const clearAppliedFilters = () => {
    setFilterFrom("");
    setFilterTo("");
    setFilterPaymentType("");
    setFilterAmount("");
    setFilterName("");
  };

  if (isFetching || isLoading) return <Spinner />;

  return (
    <>
      <Sidebar />
      <div className="h-screen pl-64 w-full py-7 pr-7 bg-slate-50 flex justify-start flex-col overflow-y-scroll">
        <div className="flex items-end justify-between  mb-10 w-full">
          <div className="flex space-x-3 items-end ">
            <SearchBar filterName={filterName} setFilterName={setFilterName} />

            <DropdownFilter
              type="Amount"
              filterAmount={filterAmount}
              setFilterAmount={setFilterAmount}
            />
            <DropdownFilter
              type="Payment"
              filterPaymentType={filterPaymentType}
              setFilterPaymentType={setFilterPaymentType}
            />

            <DateRangePicker
              filterFrom={filterFrom}
              filterTo={filterTo}
              setFilterFrom={setFilterFrom}
              setFilterTo={setFilterTo}
            />

            <div className="flex items-end space-x-1">
              <Button
                variant="contained"
                className="!bg-quadtiary-500 !text-sm"
                onClick={applyFilters}
              >
                Apply
              </Button>
              <Button
                variant="outlined"
                onClick={clearAppliedFilters}
                className="!text-quadtiary-500 !border-quadtiary-400 hover:!bg-quadtiary-50 !text-sm"
              >
                Clear
              </Button>
            </div>
          </div>

          <div>
            <button
              onClick={openAddSalaryModal}
              className="font-semibold hover:bg-quadtiary-500  hover:text-white hover:shadow-primary-1100 hover:scale-105 duration-300 ease-in-out hover:shadow-2xl transition-all  text-xl border-2 border-quadtiary-500 text-quadtiary-500 px-6 py-2"
            >
              Add Salary Report
            </button>
          </div>
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
                    <SalaryCard
                      report={report}
                      key={index}
                      deleteSalaryReport={deleteSalaryReport}
                      getSalaryReports={getSalaryReports}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div className="flex justify-center items-center flex-col">
              <img
                src={notfound}
                alt="No staff found"
                className="h-128 w-128"
              />
              <h1 className="font-bold text-2xl">
                No salary report found, please add one.
              </h1>
            </div>
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
            <div className="w-full flex justify-start flex-col items-start">
              <select
                name="staffs"
                id="staffs"
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
                required
                className="p-2 border-2 w-full text-lg border-gray focus:outline-quadtiary-400"
              >
                <option value="" disabled selected>
                  Staff Name
                </option>
                {staffList?.length > 0 &&
                  staffList.map((staff, index) => (
                    <option value={staff.fullName} key={index}>
                      {staff.fullName}
                    </option>
                  ))}
              </select>
            </div>

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

export default Salary;
