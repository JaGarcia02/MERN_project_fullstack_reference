import React, { useEffect, useState } from "react";
import AdminSideBar from "../../components/AdminComponents/AdminSideBar";
import AdminTopbar from "../../components/AdminComponents/AdminTopbar";
import moment from "moment";
import axios from "axios";
import {
  API_URL_RESERVE,
  API_URL_ROOMS,
  API_URL_USERS,
} from "../../utils/Urls";

const AdminReservation = () => {
  const [roomData, setRoomData] = useState([]);
  const [reservationData, setReservationData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [category, setCategory] = useState(1);
  const [time, setTime] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL_ROOMS + "get-rooms")
      .then((res) => setRoomData(res.data))
      .catch((err) => console.log(err));

    axios
      .get(API_URL_RESERVE + "get-all")
      .then((res) => setReservationData(res.data))
      .catch((err) => console.log(err));

    axios
      .get(API_URL_USERS + "all-user")
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  }, [date]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-screen flex">
      <AdminTopbar />
      <AdminSideBar />
      <div className="mt-15 ml-70 flex w-full flex-col ">
        <div className="w-full shadow pb-6 items-center justify-start flex shadow-b h-15 shadow-black">
          <span className="text-[30px] mt-5 font-serif ">
            Reserved Amenities
          </span>
        </div>
        <div className="pt-5 w-full items-center  justify-end flex pr-10  ">
          <span className="font-serif text-[15px] mr-2">Category:</span>
          <select
            className=" w-40 border h-10  items-center  border-black mr-4"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="1" selected>
              Slots
            </option>
            <option value="2">Admitted</option>
          </select>
          <span className="font-serif text-[15px] mr-2">Select Date: </span>
          <input
            className=" w-40 border h-10  items-center  border-black"
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {category == 1 ? (
          <div className="pt-4 w-full flex-wrap flex">
            {roomData.map((data) => {
              return (
                <div className="w-80 overflow-y-auto  h-100 ml-5 shadow-sm shadow-gray-900 my-5 flex flex-col  relative mr-5">
                  <img
                    className="w-full h-[60%] object-cover"
                    src={data.room_pic}
                  />
                  <span className="text-[20px] text-center mt-1">
                    {data.room_name}
                  </span>
                  <span className="text-center mx-3 mt-2">
                    {data.room_desc}
                  </span>
                  <span className="mt-4 mx-3 text-left flex-col flex">
                    <p>Price:</p>
                    {JSON.parse(data.room_price)?.map((data) => (
                      <span className="">{data.value}</span>
                    ))}
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
        ) : category == 2 ? (
          <div className="pt-4 w-full flex-wrap h-full flex">
            {reservationData
              .filter(
                (filter) =>
                  filter.reservation_status == "Occupied" &&
                  moment(filter.updatedAt).format("YYYY-MM-DD") == date
              )
              .map((data) => {
                return (
                  <div className="w-90 p-3 overflow-y-auto text-center flex items-center justify-center h-60 ml-5 shadow-sm shadow-gray-900 my-5 flex flex-col  relative mr-5">
                    <span className="text-[20px] font-bold">
                      {data.reservation_key}
                    </span>
                    <span className="text-[18px] my-2 flex justify-between w-[90%]">
                      <p>Amenity:</p>
                      {
                        roomData.filter(
                          (filter) => filter.ID == data.reservation_roomID
                        )[0]?.room_name
                      }
                    </span>
                    <span className="text-[15px] my-2 flex justify-between w-[90%]">
                      <p>Date of Reservation: </p>
                      {moment(data.Date_Start).format("MMMM DD, YYYY")}
                    </span>
                    <span className="text-[15px] my-2 flex justify-between w-[90%]">
                      <p>Time Consumed:</p>
                      {moment.duration(time.diff(data.updatedAt)).hours() +
                        ":" +
                        moment.duration(time.diff(data.updatedAt)).minutes() +
                        ":" +
                        moment.duration(time.diff(data.updatedAt)).seconds()}
                    </span>
                    <span className="text-[15px] my-2 flex justify-between w-[90%]">
                      <p>Customer:</p>
                      {userData
                        .filter((fil) => fil.ID == data.UserID)
                        .map(
                          (dataUser) =>
                            dataUser.user_FirstName +
                            " " +
                            dataUser?.user_MiddleName +
                            " " +
                            dataUser.user_LastName
                        )}
                    </span>
                    <span className="text-[15px] my-2 flex justify-between w-[90%]">
                      <p>Package:</p>
                      {data.reservation_package}
                    </span>
                  </div>
                );
              })}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AdminReservation;
