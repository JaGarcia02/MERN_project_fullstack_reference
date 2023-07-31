import React, { useEffect, useState } from "react";
import AdminSideBar from "../../components/AdminComponents/AdminSideBar";
import AdminTopbar from "../../components/AdminComponents/AdminTopbar";
import moment from "moment";
import axios from "axios";
import { API_URL_RESERVE, API_URL_ROOMS } from "../../utils/Urls";

const AdminReservation = () => {
  const [roomData, setRoomData] = useState([]);
  const [reservationData, setReservationData] = useState([]);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  useEffect(() => {
    axios
      .get(API_URL_ROOMS + "get-rooms")
      .then((res) => setRoomData(res.data))
      .catch((err) => console.log(err));

    axios
      .get(API_URL_RESERVE + "get-all")
      .then((res) => setReservationData(res.data))
      .catch((err) => console.log(err));
  }, [date]);

  return (
    <div className="w-screen h-screen flex">
      <AdminTopbar />
      <AdminSideBar />
      <div className="mt-15 ml-70 flex w-full flex-col ">
        <div className="w-full shadow pb-6 items-center justify-start flex shadow-b h-15 shadow-black">
          <span className="text-[30px] mt-5 font-serif ">Reservation</span>
        </div>
        <div className="pt-5 w-full items-center  justify-end flex pr-10  ">
          <span className="font-serif text-[15px]">Select Date: </span>
          <input
            className=" w-40 border h-10  items-center  border-black"
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="pt-4 w-full flex-wrap h-full flex">
          {roomData.map((data) => {
            return (
              <div className="w-80  h-100 ml-5 shadow-sm shadow-gray-900 my-5 flex flex-col  relative mr-5">
                <img
                  className="w-full h-[60%] object-cover"
                  src={data.room_pic}
                />
                <span className="text-[20px] text-center mt-1">
                  {data.room_name}
                </span>
                <span className="text-center mx-3 mt-2">{data.room_desc}</span>
                <span className="mt-4 mx-3 text-left">
                  Price: {data.room_price}
                </span>
                <span className="mt-4 mx-3 text-left">
                  Slots:{" "}
                  {data.room_available -
                    reservationData.filter(
                      (filter) =>
                        filter.reservation_roomID == data.ID &&
                        moment(filter.Date_Start).format("YYYY-MM-DD") == date
                    ).length}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminReservation;
