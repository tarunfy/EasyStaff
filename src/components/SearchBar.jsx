import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Stack, TextField } from "@mui/material";

const SearchBar = () => {
  const [name, setName] = useState("");

  return (
    <div className="flex items-end justify-start">
      <Stack sx={{ width: 160 }}>
        <TextField
          label="Search..."
          InputProps={{
            type: "search",
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Stack>
      <button
        onClick={() => console.log(name.trim())}
        disabled={!name}
        className="disabled:cursor-not-allowed py-[11px] px-2 border-[1.1px] border-l-0 border-black/20 cursor-pointer"
      >
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchBar;
