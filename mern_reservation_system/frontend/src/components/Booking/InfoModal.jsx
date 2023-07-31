import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiFillCloseCircle, AiFillCreditCard } from "react-icons/ai";
import jwt from "jwt-decode";
import { useSelector } from "react-redux";
import uniqid from "uniqid";
import axios from "axios";
import { API_URL_REPORTS, API_URL_RESERVE } from "../../utils/Urls";
import Lottie from "lottie-react";
import LoadingJson from "../../LottieFiles/98742-loading.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InfoModal = ({ setShowModal, reservationInfo, setReservationInfo }) => {
  const { user } = useSelector((state) => state.user);
  const decodedToken = user ? jwt(user) : null;
  const [reserveData, setReserveData] = useState({
    reservation_roomID: reservationInfo.roomID,
    reservation_paymentMethod: "",
    reservation_key: uniqid().toString().toUpperCase(),
    Date_Start: null,
    reservation_package: "",
    reservation_status: "reserved",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submit_reservation = (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    };
    if (
      reserveData.reservation_paymentMethod !== "" ||
      reserveData.Date_Start !== null ||
      reservation_package !== ""
    ) {
      axios
        .put(API_URL_REPORTS + "adding-report")
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      axios
        .post(API_URL_RESERVE + "reserve-room", reserveData, config)
        .then((res) => setSuccess(true))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      toast.error("You need to fill up the required inputs", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (success) window.location.reload();
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, [success]);

  const disabledDates = () => {
    var today, dd, mm, yyyy;
    today = new Date();
    dd = today.getDate() + 1;
    mm = today.getMonth() + 1;
    yyyy = today.getFullYear();
    return (
      yyyy +
      "-" +
      mm.toString().padStart(2, 0) +
      "-" +
      dd.toString().padStart(2, 0)
    );
  };
  return (
    <motion.div className="fixed h-full w-full  top-0 left-0 bg-black bg-opacity-80 flex items-center justify-center z-99 ">
      <motion.form
        onSubmit={submit_reservation}
        className="absolute flex h-90 w-200  bg-white flex-col items-center z-99 rounded-md <md:(h-full w-full rounded-none)"
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        exit={{ scale: 0 }}
      >
        <AiFillCloseCircle
          className="absolute top-2 right-2 text-[20px] text-red-600 cursor-pointer <md:(top-2 right-5 text-[30px])"
          onClick={() => {
            setShowModal(false);
            setReservationInfo(null);
          }}
        />
        <div className="w-full items-center justify-start flex flex-col">
          <span className="mt-10 font-serif  text-center font-bold">
            Book a Hotel room
          </span>
          <span className="mt-3 font-serif w-83 items-center justify-center flex text-cener text-[12px]">
            Book online. Day rooms with same day check-in and check-out
          </span>{" "}
        </div>
        <div className="w-full h-full flex <md:(flex flex-col h-auto)">
          <div className="flex flex-col  w-[50%] ml-3 shadow-md mb-2 shadow-black  items-start <md:(w-full ml-0 h-50)">
            <div className="flex items-center justify-center text-center mt-5 ml-25">
              <input
                className=""
                type="radio"
                onChange={(e) =>
                  setReserveData({
                    ...reserveData,
                    reservation_paymentMethod: "Card" ? "GCash" : "",
                  })
                }
              />
              <div className="items-center justify-center flex ">
                <span className="text-[15px] mr-10 flex items-center">
                  <img className="w-15" src="/imgs/visamastercard.png" />
                </span>
              </div>
              <input
                className=""
                type="radio"
                onChange={(e) =>
                  setReserveData({
                    ...reserveData,
                    reservation_paymentMethod: "GCash",
                  })
                }
              />
              <div className="items-center justify-center flex ">
                <span className="text-[15px] mr-10 flex items-center">
                  <img className="w-15" src="/imgs/GCash.png" />
                </span>
              </div>
            </div>
            <div className="pl-2 mt-5 w-full items-center justify-center relative flex flex-col <md:(ml-0)">
              <div className="flex w-full items-center text-black mt-2 px-4 justify-between  <md:(w-full text-black mt-2 px-4 justify-between)">
                <span className="inline-block font-serif w-[6rem] text-[14px] <md:(inline-block w-[8rem])">
                  Card number :
                </span>
                <input
                  className=" border w-40 border-black <md:(w-40)"
                  required
                />
              </div>

              <div className="flex w-full items-center text-black mt-2 px-4 justify-between <md:(w-full text-black mt-2 px-4 justify-between)">
                <span className="inline-block font-serif w-[8rem] text-[14px] <md:(inline-block w-[8rem])">
                  Expiration Date:
                </span>
                <input
                  type="date"
                  className="border mt-2 w-40 border-black  <md:(w-40)"
                  required
                />
              </div>
              <div className="flex w-full items-center text-black mt-2 px-4 justify-between <md:(w-full text-black mt-2 px-4 justify-between)">
                <span className=" border-black font-serif  inline-block w-[8rem]  text-[14px] <md:(inline-block w-[8rem])">
                  Card security code :
                </span>
                <input
                  className=" w-40 border border-black <md:(w-40)"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[50%]  mr-3 mb-2 shadow-md shadow-black  items-start <md:(w-full h-38)">
            <div className="mt-10 flex w-full items-center text-black mt-2 px-4 justify-between <md:(w-full items-center text-black mt-2 px-4 justify-between)">
              <span className=" border-black font-serif  inline-block w-[8rem]  text-[14px] <md:(inline-block w-[7rem])">
                Customer name:
              </span>
              <input
                className="w-40 border h-6 text-[14px] border border-black <md:(ml-0 w-40 border h-6 text-[14px])"
                value={decodedToken.fullName}
                required
              />
            </div>

            <div className="w-full mt-3 flex items-center text-black mt-2 px-4 justify-between <md:(w-full items-center text-black mt-2 px-4 justify-between)">
              <span className=" border-black font-serif inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
                Room :
              </span>
              <input
                className="w-40 border h-6 text-[14px] border border-black  <md:(ml-0 w-40 border h-6 text-[14px])"
                value={reservationInfo.room_name}
                required
              />
            </div>
            <div className="w-full mt-3 flex items-center text-black mt-2 px-4 justify-between <md:(w-full items-center text-black mt-2 px-4 justify-between)">
              <span className=" border-black font-serif  inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
                Price :
              </span>
              <select
                onChange={(e) =>
                  setReserveData({
                    ...reserveData,
                    reservation_package: e.target.value,
                  })
                }
                required
                className="w-40 border h-6 text-[14px] border border-black <md:(ml-0 w-40 border h-6 text-[14px])"
              >
                <option value="" hidden selected>
                  Select a package
                </option>
                {JSON.parse(reservationInfo.room_price).map((val) => (
                  <option value={val?.value}>{val?.value}</option>
                ))}
              </select>
            </div>

            <div className="w-full mt-3 flex items-center text-black mt-2 px-4 justify-between <md:(w-full items-center text-black mt-2 px-4 justify-between)">
              <span className="border-black font-serif inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
                Check-in
              </span>
              <input
                required
                min={disabledDates()}
                type="date"
                className="ml-0 w-40 border border-black h-6 text-[14px] <md:(ml-0 w-40 border h-6 text-[14px])"
                onChange={(e) =>
                  setReserveData({
                    ...reserveData,
                    Date_Start: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center my-4 <md:(flex)">
          {success ? (
            <span className="h-7 p-2 bg-green-700 text-white items-center flex">
              YOUR RESERVATION BOOKED SUCCESSFULLY
            </span>
          ) : (
            <button
              className="bg-blue-900 w-30 h-7 flex items-center justify-center mb-3 shadow-sm shadow-gray-900 rounded-sm text-white disabled:cursor-not-allowed"
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <Lottie
                  animationData={LoadingJson}
                  loop={true}
                  className="w-16 h-16"
                />
              ) : (
                "Submit"
              )}
            </button>
          )}
        </div>
      </motion.form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
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

export default InfoModal;
