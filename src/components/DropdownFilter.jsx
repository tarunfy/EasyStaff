import React from "react";

const DropdownFilter = ({ type }) => {
  return (
    <>
      {type === "Amount" ? (
        <select
          name="amount"
          id="amount-filter"
          className="py-[11px] px-2 border-[1.1px] border-black/20 cursor-pointer focus:outline-quadtiary-400"
        >
          <option value="" disabled selected>
            Amount
          </option>
          <option value="asc">Low to high</option>
          <option value="desc">High to low</option>
        </select>
      ) : (
        <select
          name="paymentType"
          id="paymentType-filter"
          className="py-[11px] px-2 border-[1.1px] border-black/20 cursor-pointer focus:outline-quadtiary-400"
        >
          <option value="" disabled selected>
            Payment Type
          </option>
          <option value="Regular">Regular</option>
          <option value="Advance">Advance</option>
        </select>
      )}
    </>
  );
};

export default DropdownFilter;
