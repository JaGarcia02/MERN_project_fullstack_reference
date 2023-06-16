import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { API_URL_RESERVE, API_URL_ROOMS } from "../../utils/Urls";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";
import moment from "moment";
import { MessengerChat } from "react-messenger-chat-plugin";

const ReservationUser = () => {
  const [reservationUser, setReservationUser] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const { user } = useSelector((state) => state.user);
  const decodedId = user ? jwt(user) : "";
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get(API_URL_RESERVE + `get-reservation-user/${decodedId.id}`)
      .then((res) => setReservationUser(res.data))
      .catch((err) => console.log(err));

    axios
      .get(API_URL_ROOMS + "get-rooms")
      .then((res) => setRoomData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const search = (e) => {
    e.preventDefault();
    setReservationUser(
      reservationUser.filter((filter) =>
        filter.reservation_key.includes(searchValue)
      )
    );
  };

  return (
    <div className="w-screen flex flex-col">
      <Navbar />
      <div className="mt-15" />
      <div className="w-full h-25 bg-white px-6 flex text-black items-center  <md:(h-10)">
        <span className="text-right text-[45px] font-serif <md:(text-left text-[18px])">
          ACTIVE RESERVATIONS
        </span>
      </div>
      <div className="bg-gray-50 shadow-md shadow-gray-100 w-full flex p-2 <md:(flex flex-col)">
        <div className="flex flex-[0.2] flex-col">
          <form className="h-35 w-[90%] bg-glasss flex flex-col p-3 rounded-sm <md:(w-full)">
            <span className="text-left font-serif">Search</span>
            <input
              className="bg-glasss"
              type="text"
              required
              onChange={(e) => setSearchValue(e.target.value)}
            />

            <button
              className="self-start mt-7 bg-gray-800 text-white w-20 h-8 rounded-sm shadow-sm shadow-gray-700"
              onClick={search}
            >
              Search
            </button>
          </form>
        </div>
        <div className="flex flex-[0.8] flex-col pr-3 <md:(pr-0 mt-10)">
          {reservationUser.map((data) => {
            return (
              <div
                className="h-50 w-full bg-glasss flex mb-5 rounded-sm overflow-auto p-2 <md:(h-30)"
                key={data.ID}
              >
                <img
                  className="h-full w-50 object-cover <md:(w-30)"
                  src={
                    roomData.filter(
                      (filter) => filter.ID == data.reservation_roomID
                    )[0]?.room_pic
                  }
                />
                <div className="ml-3 flex flex-col w-full">
                  <span className="text-[23px]  font-Roboto <md:(text-[20px])">
                    {
                      roomData.filter(
                        (filter) => filter.ID == data.reservation_roomID
                      )[0]?.room_name
                    }
                  </span>
                  <span className="text-[15px] mt-3  font-Roboto <md:(text-[13px])">
                    {moment(data.Date_Start).format("YYYY-MM-DD")}
                  </span>
                  <span className="text-[15px] mt-3  font-Roboto <md:(text-[14px])">
                    Status: {data.reservation_status}
                  </span>
                </div>
                <div className="w-full h-full flex items-end justify-end">
                  <span className="text-[25px] font-Roboto <md:(text-[14px])">
                    {data.reservation_key}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <MessengerChat
        pageId="110248655314753"
        language="en_US"
        themeColor={"#0733f9"}
        bottomSpacing={20}
        greetingDialogDisplay={"show"}
        debugMode={true}
      />
    </div>
  );
};

export default ReservationUser;
