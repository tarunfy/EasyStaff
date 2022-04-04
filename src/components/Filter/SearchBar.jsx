import { useContext } from "react";
import { BusinessContext } from "../../contexts/BusinessContext";
import SearchIcon from "@mui/icons-material/Search";
import { Stack, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchBar = ({ filterName, setFilterName }) => {
  const { filterByName } = useContext(BusinessContext);

  const handleFilterByName = async () => {
    const res = await filterByName(filterName.trim());
    if (res.error) {
      toast.error(res.error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-start relative justify-start">
        <Stack direction="row">
          <TextField
            label="Search..."
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            sx={{ width: 150 }}
          />

          <button
            onClick={() => handleFilterByName()}
            disabled={!filterName}
            className="disabled:cursor-not-allowed  py-[14px] px-2 border-[1.1px] border-l-0 border-black/20 cursor-pointer"
          >
            <SearchIcon />
          </button>
        </Stack>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default SearchBar;
