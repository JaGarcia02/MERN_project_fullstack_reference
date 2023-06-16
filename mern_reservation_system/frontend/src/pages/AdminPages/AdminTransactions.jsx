import React, { useState, useEffect } from "react";
import AdminSideBar from "../../components/AdminComponents/AdminSideBar";
import AdminTopbar from "../../components/AdminComponents/AdminTopbar";
import axios from "axios";
import { API_URL_RESERVE } from "../../utils/Urls";
import { AnimatePresence, motion } from "framer-motion";
import AdminBookModal from "../../components/AdminComponents/AdminBookModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminCheckout from "../../components/AdminComponents/AdminCheckout";

const AdminTransactions = () => {
  const [reservationKey, setReservationKey] = useState("");
  const [checkoutKey, setCheckoutKey] = useState("");
  const [reservationData, setReservationData] = useState([]);
  const [searchModal, setSearchModal] = useState(false);
  const [searchCheckout, setSearchCheckout] = useState(false);
  const [loading, setLoading] = useState(false);

  const search_key = () => {
    axios
      .get(API_URL_RESERVE + `get-key/${reservationKey.toUpperCase()}`)
      .then((res) => {
        setSearchModal(true);
        setReservationData(res.data);
      })
      .catch((err) =>
        toast.error("Nothing Found!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      );
  };

  const search_checkoutKey = () => {
    axios
      .get(API_URL_RESERVE + `get-key/${checkoutKey.toUpperCase()}`)
      .then((res) => {
        setSearchCheckout(true);
        setReservationData(res.data);
      })
      .catch((err) =>
        toast.error("Nothing Found!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      );
  };

  return (
    <div className="w-screen h-screen flex">
      <AdminSideBar />
      <AdminTopbar />
      <div className="mt-15 ml-70 flex flex-col w-full">
        <div className="w-full shadow items-center justify-start flex shadow-b h-16 shadow-black">
          <span className="text-[30px] font-serif">Transactions</span>
        </div>
        <div className="flex w-full items-center justify-evenly h-full ">
          <div className="w-full h-full  items-center flex justify-center flex-col">
            <span className="text-left">Enter Reservation key</span>
            <input
              className="border border-gray-500 h-9 w-80 uppercase focus:(outline-none) "
              onChange={(e) => setReservationKey(e.target.value)}
              value={reservationKey}
            />
            <button
              className="w-20 h-9 bg-blue-700 shadow-sm shadow-gray-900 mt-5 rounded-sm"
              // onClick={search_key}
              onClick={search_key}
            >
              SEARCH
            </button>
          </div>
          <div className="w-full h-full  items-center flex justify-center flex-col">
            <span className="text-left">Checkout</span>
            <input
              className="border border-gray-500 h-9 w-80 uppercase focus:(outline-none) "
              onChange={(e) => setCheckoutKey(e.target.value)}
            />
            <button
              className="w-20 h-9 bg-green-500 shadow-sm shadow-gray-900 mt-5 rounded-sm"
              // onClick={search_key}
              onClick={search_checkoutKey}
            >
              Checkout
            </button>
          </div>
        </div>
        {/* 
          <div className="w-full h-full  items-center flex justify-center flex-col">
            <span className="text-left">Enter Reservation key</span>
            <input
              className="border border-gray-500 h-9 w-80 uppercase focus:(outline-none) "
              onChange={(e) => setReservationKey(e.target.value)}
              value={reservationKey}
            />
            <button
              className="w-20 h-9 bg-blue-700 shadow-sm shadow-gray-900 mt-5 rounded-sm"
              // onClick={search_key}
              onClick={search_key}
            >
              SEARCH
            </button>
          </div>
        </div>
        <div className="flex w-full h-full flex-1">
          <div className="w-full h-full  items-center flex justify-center flex-col">
            <span className="text-left">Checkout</span>
            <input
              className="border border-gray-500 h-9 w-80 uppercase focus:(outline-none) "
              onChange={(e) => setCheckoutKey(e.target.value)}
            />
            <button
              className="w-20 h-9 bg-green-500 shadow-sm shadow-gray-900 mt-5 rounded-sm"
              // onClick={search_key}
              onClick={search_checkoutKey}
            >
              Checkout
            </button>
          </div>
        </div> */}
      </div>
      <AnimatePresence>
        {searchModal && (
          <AdminBookModal
            setSearchModal={setSearchModal}
            reservationData={reservationData}
          />
        )}
        {searchCheckout && (
          <AdminCheckout
            setSearchCheckout={setSearchCheckout}
            reservationData={reservationData}
          />
        )}
      </AnimatePresence>
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
    </div>
  );
};

export default AdminTransactions;
