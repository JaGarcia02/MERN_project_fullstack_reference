import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import { API_URL_RESERVE, API_URL_USERS } from "../../utils/Urls";
import moment from "moment";

const AdminBookModal = ({ setSearchModal, reservationData }) => {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    let subscribed = true;
    axios
      .get(API_URL_USERS + `get-user/${reservationData.UserID}`)
      .then((res) => {
        if (subscribed) setUserInfo(res.data);
      })
      .catch((err) => console.log(err));

    return () => (subscribed = false);
  }, []);

  const update_reservation = (selectedButton) => {
    if (selectedButton == "Occupied") {
      axios
        .put(API_URL_RESERVE + "update-data", {
          ID: reservationData.ID,
          status: "Occupied",
        })
        .then((res) => window.location.reload())
        .catch((err) => console.log(err));
    } else {
      axios
        .put(API_URL_RESERVE + "update-data", {
          ID: reservationData.ID,
          status: "Canceled",
        })
        .then((res) => window.location.reload())
        .catch((err) => console.log(err));
    }
  };

  return (
    <motion.div className="w-screen h-screen fixed flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        exit={{ opacity: 0 }}
        className="w-100 h-75  bg-gray-200 shadow-md relative rounded-sm"
      >
        <div className="w-full h-full item-center justify-start flex flex-col relative">
          <AiFillCloseCircle
            className="absolute text-red-600 right-2 top-2 text-[20px] cursor-pointer"
            onClick={() => setSearchModal(false)}
          />
          <div className=" w-[90%] mt-15 flex items-center justify-between">
            <span className="ml-3 font-serif">Visitor name:</span>
            <span className="border border-black text-center w-[60%]">
              {userInfo.user_LastName +
                ", " +
                userInfo.user_FirstName +
                " " +
                userInfo.user_MiddleName}
            </span>
          </div>
          <div className="w-[90%] flex items-center mt-2 justify-between">
            <span className="ml-3 font-serif">Date:</span>
            <span className="border border-black text-center w-[60%]">
              {moment(reservationData.Date_Start).format("MM/DD/YYYY")}
            </span>
          </div>
          <div className="w-[90%] flex items-center mt-2 justify-between">
            <span className="ml-3 font-serif">Reservation ID:</span>
            <span className="border border-black text-center w-[60%]">
              {reservationData.reservation_key}
            </span>
          </div>
          <div className="w-[90%] flex items-center mt-2 justify-between">
            <span className="ml-3 font-serif">Payment Method:</span>
            <span>{reservationData.reservation_paymentMethod}</span>
          </div>
          <div className="w-[90%] flex items-center mt-2 justify-between">
            <span className="ml-3 font-serif">Payment Method:</span>
            <span>{reservationData.reservation_package}</span>
          </div>
          <div className="flex flex-row mt-5 items-end justify-evenly w-full">
            <button
              className="w-20 h-10 rounded-md hover:rounded-sm bg-red-600 font-serif"
              onClick={() => update_reservation("Canceled")}
            >
              Canceled
            </button>
            <button
              className="w-20 h-10 rounded-md hover:rounded-sm bg-blue-600 font-serif"
              onClick={() => update_reservation("Occupied")}
            >
              Book
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminBookModal;
