import axios from "axios";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import AdminSideBar from "../../components/AdminComponents/AdminSideBar";
import AdminTopbar from "../../components/AdminComponents/AdminTopbar";
import { API_URL_RESERVE, API_URL_ROOMS } from "../../utils/Urls";

const AdminReports = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const get_data = async () => {
      const room = await axios.get(API_URL_ROOMS + "get-rooms");
      const reservation = await axios.get(API_URL_RESERVE + "get-all");

      setData(
        room.data.map((data) => {
          return {
            roomName: data.room_name,
            dataNum: reservation.data.filter(
              (filter) => filter.reservation_roomID == data.ID
            ).length,
          };
        })
      );
    };

    get_data();
  }, []);
  return (
    <div className="w-screen h-screen flex">
      <AdminTopbar />
      <AdminSideBar />
      <div className="mt-15 ml-70 flex  w-full flex-col ">
        <div className="w-full shadow items-center justify-start flex shadow-b h-15 shadow-black">
          <span className="text-[30px] font-serif">Reports</span>
        </div>
        <div className=" items-center mt-10 justify-center flex w-full">
          <BarChart width={1000} height={300} data={data}>
            <XAxis dataKey="roomName" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="dataNum" fill="#8884d8" barSize={30} />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
