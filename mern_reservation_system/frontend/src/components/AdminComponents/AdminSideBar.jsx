import React from "react";
import { IoHome } from "react-icons/io5";
import { FaCashRegister, FaBed } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <div className="h-full mt-15 w-70 bg-blue-gray-900 fixed left-0 flex flex-col p-2">
      <Link to="/admin-dashboard">
        <span className="text-white h-15 w-full flex items-center cursor-pointer transition-all duration-300 hover:(bg-gray-300)">
          <IoHome className="mr-3" />
          Home
        </span>
      </Link>
      <hr className="w-full border-b border-b-white" />

      <Link to="/transactions">
        <span className="text-white h-15 w-full flex items-center cursor-pointer transition-all duration-300 hover:(bg-gray-300)">
          <FaCashRegister className="mr-3" />
          Transactions
        </span>
      </Link>

      <hr className="w-full border-b border-b-white" />
      <Link to="/admin-report">
        <span className="text-white h-15 w-full flex items-center cursor-pointer transition-all duration-300 hover:(bg-gray-300)">
          <GoGraph className="mr-3" />
          Reports
        </span>
      </Link>
      <hr className="w-full border-b border-b-white" />
      <Link to="/admin-rooms">
        <span className="text-white h-15 w-full flex items-center cursor-pointer transition-all duration-300 hover:(bg-gray-300)">
          <BsFillCalendarCheckFill className="mr-3" /> Available Slots
        </span>
      </Link>
      <hr className="w-full border-b border-b-white" />
      <Link to="/admin-reservation">
        <span className="text-white h-15 w-full flex items-center cursor-pointer transition-all duration-300 hover:(bg-gray-300)">
          <FaBed className="mr-3" />
          Reservations
        </span>
      </Link>
      <hr className="w-full border-b border-b-white" />
    </div>
  );
};

export default AdminSideBar;
