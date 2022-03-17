import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Sidebar from "../components/Sidebar/Sidebar";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

function createData(calories, fat, carbs, protein) {
  return { calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 6.0, 24, 4.0),
  createData("Ice cream sandwich", 9.0, 37, 4.3),
  createData("Eclair", 16.0, 24, 6.0),
  createData("Cupcake", 3.7, 67, 4.3),
  createData("Gingerbread", 16.0, 49, 3.9),
];

const Salary = () => {
  return (
    <>
      <Sidebar />
      <div className="h-screen pl-64 w-full py-7 pr-7 bg-slate-50 flex justify-start flex-col overflow-y-scroll">
        <div className="flex items-center mb-10 justify-end w-full">
          <button className="font-semibold hover:bg-quadtiary-500  hover:text-white hover:shadow-primary-1100 hover:scale-105 duration-300 ease-in-out hover:shadow-2xl transition-all  text-xl border-2 border-quadtiary-500 text-quadtiary-500 px-6 py-2">
            Add Salary
          </button>
        </div>
        <div className="flex justify-center">
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
                {rows.map((row) => (
                  <>
                    <TableRow
                      key={row.fat}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        sx={{ fontSize: "1.05rem", fontWeight: "500" }}
                      >
                        {row.calories}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ fontSize: "1.05rem", fontWeight: "500" }}
                      >
                        {row.fat}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ fontSize: "1.05rem", fontWeight: "500" }}
                      >
                        {row.carbs}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ fontSize: "1.05rem", fontWeight: "500" }}
                      >
                        {row.protein}
                      </TableCell>
                      <TableCell align="right">
                        <Tippy
                          content="Edit report"
                          interactive={true}
                          animation="scale"
                        >
                          <button className="p-1 mr-1 border-[0.5px] border-black">
                            <EditIcon />
                          </button>
                        </Tippy>
                        <Tippy
                          content="Delete report"
                          interactive={true}
                          animation="scale"
                        >
                          <button className="p-1 border-[0.5px] border-black">
                            <RemoveCircleOutlineIcon />
                          </button>
                        </Tippy>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default Salary;
