import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AiFillCloseCircle } from "react-icons/ai";
import moment from "moment";
import axios from "axios";
import {
  API_URL_RESERVE,
  API_URL_ROOMS,
  API_URL_USERS,
} from "../../utils/Urls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "lottie-react";
import LoadingJson from "../../LottieFiles/98742-loading.json";

const AdminCheckout = ({ setSearchCheckout, reservationData }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [roomData, setRoomData] = useState([]);

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

  const clickCheckout = () => {
    setLoading(true);
    axios
      .put(API_URL_RESERVE + "update-data", {
        ID: reservationData.ID,
        status: "Done",
      })
      .then((res) =>
        toast.info("Checkout Success!", {
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
  };

  return (
    <motion.div className="w-screen h-screen fixed flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        exit={{ opacity: 0 }}
        className="w-100 h-85  bg-gray-200 shadow-md relative rounded-sm"
      >
        <div className="w-full h-full item-center justify-start flex flex-col relative">
          <AiFillCloseCircle
            className="absolute text-red-600 right-2 top-2 text-[20px] cursor-pointer"
            onClick={() => setSearchCheckout(false)}
          />
          <div className=" w-[90%] mt-15 flex items-center justify-between">
            <span className="ml-3 font-serif">Visitor name:</span>
            <span className="border border-black text-center w-[60%]">
              {userInfo?.user_LastName +
                ", " +
                userInfo?.user_FirstName +
                " " +
                userInfo?.user_MiddleName}{" "}
            </span>
          </div>
          <div className="w-[90%] flex items-center mt-2 justify-between">
            <span className="ml-3 font-serif">Date:</span>
            <span className="border border-black text-center w-[60%]">
              {moment().format("MM/DD/YYYY")}
            </span>
          </div>
          <div className="w-[90%] flex items-center mt-2 justify-between">
            <span className="ml-3 font-serif">Reservation ID:</span>
            <span className="border border-black text-center w-[60%]">
              {reservationData.reservation_key}{" "}
            </span>
          </div>
          <div className="w-[90%] flex items-center mt-2 justify-between">
            <span className="ml-3 font-serif">Payment Method:</span>
            <span> {reservationData.reservation_paymentMethod}</span>
          </div>
          <div className="w-[90%] flex items-center mt-2 justify-between">
            <span className="ml-3 font-serif">Reservation Package:</span>
            <span> {reservationData.reservation_package}</span>
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
          <div className="flex flex-row mt-5 items-end justify-evenly w-full">
            {loading ? (
              <Lottie
                className="w-25 h-25 self-center -mt-9"
                animationData={LoadingJson}
                loop={true}
              />
            ) : (
              <button
                className="w-20 h-10 rounded-md hover:rounded-sm bg-blue-600 font-serif"
                onClick={clickCheckout}
              >
                Checkout
              </button>
            )}
          </div>
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

export default AdminCheckout;
