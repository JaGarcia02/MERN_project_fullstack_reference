import React, { useEffect, useState } from "react";
import AdminSideBar from "../../components/AdminComponents/AdminSideBar";
import AdminTopbar from "../../components/AdminComponents/AdminTopbar";
import { GrTransaction } from "react-icons/gr";
import { FaBed } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { BsFillCalendarCheckFill } from "react-icons/bs";

import axios from "axios";
import { API_URL_REPORTS } from "../../utils/Urls";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL_REPORTS + "get-report")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="w-screen h-screen flex">
      <AdminTopbar />
      <AdminSideBar />

      <div className="mt-15 ml-70 flex items-center w-full flex-col ">
        <div className="w-full shadow pb-6 items-center justify-start flex shadow-b h-15 shadow-black">
          <span className="text-[30px] mt-5 font-serif">Welcome Admin</span>
        </div>
        <div className="w-[90%] pt-20 flex flex-wrap justify-between">
          <div className="h-30 w-50 bg-violet-800 relative cursor-pointer rounded-sm p-2">
            <span className=" text-[20px]">Transactions </span>
            <GrTransaction className="absolute bottom-5 right-5 text-[60px] " />
          </div>
          <div className="h-30 w-50 bg-green-500 relative cursor-pointer rounded-sm p-2">
            <span className=" text-[20px]">Reservation</span>
            <FaBed className="absolute bottom-5 right-5 text-[60px] " />
          </div>
          <div className="h-30 w-50 bg-red-600 relative cursor-pointer rounded-sm p-2">
            <span className=" text-[20px]">Report</span>{" "}
            <GoGraph className="absolute bottom-5 right-5 text-[60px]" />
          </div>
          <div className="h-30 w-50 bg-yellow-400 relative cursor-pointer rounded-sm p-2">
            <span className=" text-[20px]">Available Slots</span>
            <BsFillCalendarCheckFill className="absolute bottom-5 right-5 text-[60px]" />
          </div>
        </div>
        <div className="h-full bg-blue-100 my-8 p-1  w-[90%]">
          <ResponsiveContainer width="95%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="monthYear" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar dataKey="numberData" fill="#1122bb" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
