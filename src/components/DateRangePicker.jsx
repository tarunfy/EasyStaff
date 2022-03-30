const DateRangePicker = ({
  filterFrom,
  filterTo,
  setFilterFrom,
  setFilterTo,
}) => {
  return (
    <div className="w-[210px]">
      <div className="flex items-end justify-between">
        <label htmlFor="from" className="text-sm">
          From:
        </label>
        <input
          type="date"
          name="from"
          id="from"
          value={filterFrom}
          onChange={(e) => setFilterFrom(e.target.value)}
          className="border-[1.1px] border-black/20"
        />
      </div>
      <div className="flex items-end justify-between ">
        <label htmlFor="to" className="text-sm">
          To:
        </label>
        <input
          type="date"
          name="to"
          id="to"
          value={filterTo}
          onChange={(e) => setFilterTo(e.target.value)}
          className="border-[1.1px] border-black/20"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
