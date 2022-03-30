import React from "react";

const DropdownFilter = ({
  type,
  filterAmount,
  setFilterAmount,
  filterPaymentType,
  setFilterPaymentType,
}) => {
  return (
    <>
      {type === "Amount" ? (
        <select
          name="amount"
          id="amount-filter"
          value={filterAmount}
          onChange={(e) => setFilterAmount(e.target.value)}
          className="py-[11px] bg-transparent px-2 border-[1.1px] border-black/20 cursor-pointer focus:outline-quadtiary-400"
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
          value={filterPaymentType}
          onChange={(e) => setFilterPaymentType(e.target.value)}
          className="py-[11px] bg-transparent px-2 border-[1.1px] border-black/20 cursor-pointer focus:outline-quadtiary-400"
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
