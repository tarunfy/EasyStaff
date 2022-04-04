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
import notfound from "../assets/images/404.svg";
import Spinner from "../components/Spinner";
import Sidebar from "../components/Sidebar/Sidebar";
import VisitCard from "../components/VisitCard";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import csvDownload from "json-to-csv-export";
import moment from "moment";

const Visit = () => {
  const [customerName, setCustomerName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [description, setDescription] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [addVisitModal, setAddVisitModal] = useState(false);
  const [error, setError] = useState("");

  const {
    visitReports,
    isFetching,
    fetchVisitReports,
    addNewVisitReport,
    isLoading,
    deleteVisitReport,
    customerList,
    business,
    fetchCustomers,
  } = useContext(BusinessContext);

  const { currentUser } = useContext(AuthContext);

  async function getVisitReports() {
    await fetchVisitReports(currentUser.uid);
  }

  useEffect(() => {
    getVisitReports();
  }, []);

  useEffect(() => {
    async function getCustomer() {
      await fetchCustomers(business.businessId);
    }
    if (business) {
      getCustomer();
    }
  }, []);

  const openAddVisitModal = () => {
    setAddVisitModal(true);
  };
  const closeAddVisitModal = () => {
    setAddVisitModal(false);
    clearModal();
  };
  const addNewVisit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await addNewVisitReport(customerId, {
      customerName,
      purpose,
      description,
      createdAt: Date.now(),
      userId: currentUser.uid,
    });
    if (res) {
      setError(res);
      return;
    }
    closeAddVisitModal();
    getVisitReports();
  };

  const clearModal = () => {
    setCustomerName("");
    setPurpose("");
    setDescription("");
  };

  const handleDownload = () => {
    const list = visitReports.map((visit, index) => ({
      "Serial Number": index + 1,
      "Customer Name": visit.customerName,
      Purpose: visit.purpose,
      Description: visit.description,
      "Visited on": moment(visit.createdAt).format("MM/DD/YYYY"),
    }));
    csvDownload(list);
  };

  if (isFetching || isLoading) return <Spinner />;

  return (
    <>
      <Sidebar />
      <div className="h-screen pl-64 w-full py-7 pr-7 bg-slate-50 flex justify-start flex-col overflow-y-scroll">
        <div className="flex items-center mb-10 justify-end w-full space-x-2">
          <button
            onClick={handleDownload}
            className="font-semibold hover:bg-quadtiary-500  hover:text-white hover:shadow-primary-1100 hover:scale-105 duration-300 ease-in-out hover:shadow-2xl transition-all  text-xl border-2 border-quadtiary-500 text-quadtiary-500 px-6 py-2"
          >
            <FileDownloadIcon /> Download
          </button>
          <button
            onClick={openAddVisitModal}
            className="font-semibold hover:bg-quadtiary-500  hover:text-white hover:shadow-primary-1100 hover:scale-105 duration-300 ease-in-out hover:shadow-2xl transition-all  text-xl border-2 border-quadtiary-500 text-quadtiary-500 px-6 py-2"
          >
            Add Visit
          </button>
        </div>
        <div className="flex justify-center">
          {visitReports ? (
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
                      Customer Name
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      Purpose
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      Visited on
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
                  {visitReports.map((report, index) => (
                    <VisitCard
                      report={report}
                      key={index}
                      deleteVisitReport={deleteVisitReport}
                      getVisitReports={getVisitReports}
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
                No visit exisits, please add one.
              </h1>
            </div>
          )}
        </div>
      </div>
      <Modal
        open={addVisitModal}
        onClose={closeAddVisitModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex h-screen w-full items-center justify-center"
      >
        <Box className="px-6 w-[30%] py-3 bg-slate-50 text-center border-none outline-none focus:outline-none ">
          <h1 className="text-[2rem] font-semibold">Add Visit</h1>
          <hr className="bg-slate-400 h-[2px] w-full mb-4" />
          <form
            onSubmit={addNewVisit}
            className="flex flex-col w-full justify-start items-start space-y-3"
          >
            <input
              type="text"
              value={customerId}
              required
              autoComplete="off"
              onChange={(e) => setCustomerId(e.target.value)}
              placeholder="Customer Id"
              className="p-2 my-2 w-full text-lg focus:outline-quadtiary-500 border-2 border-gray"
            />
            <select
              name="customers"
              id="customers"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              className="p-2 border-2 w-full text-lg border-gray focus:outline-quadtiary-400"
            >
              <option value="" disabled selected>
                Customer Name
              </option>
              {customerList?.length > 0 &&
                customerList.map((customer, index) => (
                  <option value={customer.fullName} key={index}>
                    {customer.fullName}
                  </option>
                ))}
            </select>
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
            {error && (
              <p className="text-base font-medium text-left my-1 text-red-500">
                {error}
              </p>
            )}
            <div className="flex justify-end items-center space-x-3">
              <button
                onClick={closeAddVisitModal}
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

export default Visit;
