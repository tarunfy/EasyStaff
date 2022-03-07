import React from "react";
import { MdPersonRemoveAlt1, MdEdit } from "react-icons/md";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

const StaffCard = ({ staff, openUpdateStaffModal, handleRemove }) => {
  return (
    <div className="w-full bg-slate-50 shadow-custom p-4 rounded-sm">
      <h1 className="font-bold text-3xl mb-4">{staff.fullName}</h1>
      <p className="font-medium text-xl text-slate-700 mb-1">
        {staff.designation}
      </p>
      <div className="flex justify-start items-center space-x-2 mb-4">
        <p className="font-semibold text-base text-slate-700">
          {staff.phoneNumber}
        </p>
        <p className="font-semibold text-base text-slate-700">{staff.email}</p>
      </div>
      <div className="flex justify-end items-center space-x-4">
        <Tippy interactive={true} animation="scale" content="Edit staff">
          <div
            onClick={() => openUpdateStaffModal(staff.id)}
            className="p-2 border-[1px] hover:cursor-pointer border-zinc-800 hover:text-teal-500 hover:border-[1px] hover:border-teal-500 transition-all duration-300 ease-in-out"
          >
            <MdEdit className="h-6 w-6" />
          </div>
        </Tippy>
        <Tippy interactive={true} animation="scale" content="Remove staff">
          <div
            onClick={() => handleRemove(staff.id)}
            className="p-2 border-[1px] hover:cursor-pointer border-zinc-800 hover:text-red-500 hover:border-[1px] hover:border-red-500 transition-all duration-300 ease-in-out"
          >
            <MdPersonRemoveAlt1 className="h-6 w-6" />
          </div>
        </Tippy>
      </div>
    </div>
  );
};

export default StaffCard;
