import { useContext, useState } from "react";
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
    </>
  );
};

export default SearchBar;
