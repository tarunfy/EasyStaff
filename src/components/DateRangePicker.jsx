import React, { useState } from "react";

const DateRangePicker = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return (
    <div className="w-56">
      <div className="flex items-end justify-between space-x-1">
        <label htmlFor="from" className="text-sm">
          From:
        </label>
        <input
          type="date"
          name="from"
          id="from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border-[1.1px] border-black/20"
        />
      </div>
      <div className="flex items-end justify-between space-x-1">
        <label htmlFor="to" className="text-sm">
          To:
        </label>
        <input
          type="date"
          name="to"
          id="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border-[1.1px] border-black/20"
          x
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
