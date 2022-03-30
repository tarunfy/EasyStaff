import { useContext } from "react";
import { BusinessContext } from "../contexts/BusinessContext";
import SearchIcon from "@mui/icons-material/Search";
import { Stack, TextField } from "@mui/material";

const SearchBar = ({ filterName, setFilterName }) => {
  const { filterByName } = useContext(BusinessContext);

  const handleFilterByName = () => {
    filterByName(filterName.trim());
  };

  return (
    <>
      <div className="flex items-end relative justify-start">
        <Stack sx={{ width: 150 }}>
          <TextField
            label="Search..."
            InputProps={{
              type: "search",
            }}
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </Stack>
        <button
          onClick={() => handleFilterByName()}
          disabled={!filterName}
          className="disabled:cursor-not-allowed  py-[11px] px-2 border-[1.1px] border-l-0 border-black/20 cursor-pointer"
        >
          <SearchIcon />
        </button>
      </div>
    </>
  );
};

export default SearchBar;
