import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import {
  API_URL_RESERVE,
  API_URL_ROOMS,
  API_URL_USERS,
} from "../../utils/Urls";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "lottie-react";
import LoadingJson from "../../LottieFiles/98742-loading.json";

const AdminBookModal = ({ setSearchModal, reservationData }) => {
  const [userInfo, setUserInfo] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let subscribed = true;
    axios
      .get(API_URL_USERS + `get-user/${reservationData.UserID}`)
      .then((res) => {
        if (subscribed) setUserInfo(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(API_URL_ROOMS + "get-rooms")
      .then((roomRes) => {
        if (subscribed) setRoomData(roomRes.data);
      })
      .catch((err) => console.log(err));

    return () => (subscribed = false);
  }, []);

  const update_reservation = (selectedButton) => {
    setLoading(true);
    if (selectedButton == "Occupied") {
      axios
        .put(API_URL_RESERVE + "update-data", {
          ID: reservationData.ID,
          status: "Occupied",
        })
        .then((res) =>
          toast.success("Reservation Has been admitted!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
        )
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      axios
        .put(API_URL_RESERVE + "update-data", {
          ID: reservationData.ID,
          status: "Canceled",
        })
        .then((res) =>
          toast.info("Reservation has been canceled!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
        )
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  };

  return (
    <motion.div className="w-screen h-screen fixed flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        exit={{ opacity: 0 }}
        className="w-100 h-85 bg-gray-200 shadow-md relative rounded-sm"
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
            <span className="ml-3 font-serif">Reservation Package:</span>
            <span>{reservationData.reservation_package}</span>
          </div>
          <div className="w-[90%] flex items-center mt-2 justify-between">
            <span className="ml-3 font-serif">Amenity:</span>
            <span>
              {
                roomData.filter(
                  (filter) => filter.ID == reservationData.reservation_roomID
                )[0]?.room_name
              }
            </span>
          </div>
          {loading ? (
            <Lottie
              className="w-25 h-25 self-center"
              animationData={LoadingJson}
              loop={true}
            />
          ) : (
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
          )}
        </div>
      </motion.div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </motion.div>
  );
};

export default AdminBookModal;
