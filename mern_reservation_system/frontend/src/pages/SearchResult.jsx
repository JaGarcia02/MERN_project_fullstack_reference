import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL, API_URL_RESERVE, API_URL_ROOMS } from "../utils/Urls";
import Navbar from "../components/Navbar";
import { MdChildCare } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import LoginModal from "../components/Booking/LoginModal";
import InfoModal from "../components/Booking/InfoModal";
import moment from "moment";
import Lottie from "lottie-react";
import loadingData from "../LottieFiles/98742-loading.json";
import { MessengerChat } from "react-messenger-chat-plugin";
import Footer from "../components/Footer";

const SearchResult = () => {
  const parameters = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [searchedData, setSearchedData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchForms, setSearchForms] = useState({
    available: "",
    pax: "",
    date: "",
  });
  const [reservationInfo, setReservationInfo] = useState(null);
  const [reservationData, setReservationData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let subscribed = true;
    setLoading(true);
    axios
      .get(
        API_URL_ROOMS + `search-room/${parameters.available}/${parameters.pax}`
      )
      .then((res) => {
        if (subscribed) setSearchedData(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(API_URL_RESERVE + "get-all")
      .then((res) => {
        setReservationData(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));

    return () => (subscribed = false);
  }, [parameters]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/searched/${searchForms.available}/${searchForms.date}/${searchForms.pax}`
    );
  };

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
    <>
      <div className="w-screen h-screen flex flex-col relative <md:(h-auto)">
        <Navbar />
        <div className="mt-15" />
        <div className="w-full h-25 bg-white px-6 flex text-black items-center <md:(h-10)">
          <span className="text-right text-[45px] font-serif <md:(text-left text-[18px])">
            ENJOY YOUR STAY WITH US!
          </span>
        </div>
        <div className="bg-gray-50 shadow-md shadow-gray-100 w-full h-full flex p-2 <md:(flex flex-col)">
          <div className="flex flex-[0.2] flex-col ">
            <form
              className="h-65 w-[90%] bg-glasss flex flex-col p-3 rounded-sm <md:(w-full)"
              onSubmit={handleSearch}
            >
              <span className="text-left font-serif">Check in date:</span>
              <input
                className="bg-glasss w-full"
                type="date"
                min={disabledDates()}
                required
                onChange={(e) =>
                  setSearchForms({ ...searchForms, date: e.target.value })
                }
              />

              <span className="text-left mt-3 font-serif  ">Rooms</span>

              <input
                className="bg-glasss"
                type="number"
                required
                onChange={(e) =>
                  setSearchForms({ ...searchForms, available: e.target.value })
                }
              />
              <span className="text-left mt-3 font-serif  ">Pax</span>

              <input
                className="bg-glasss"
                type="number"
                required
                onChange={(e) =>
                  setSearchForms({ ...searchForms, pax: e.target.value })
                }
              />
              <button className="self-start mt-7 bg-gray-800 text-white w-20 h-8 rounded-sm shadow-sm shadow-gray-700">
                Search
              </button>
            </form>
          </div>
          <div className="flex flex-[0.8] flex-col pr-3 <md:(pr-0 mt-10)">
            {loading ? (
              <Lottie animationData={loadingData} loop={true} />
            ) : (
              <>
                {searchedData.length == 0 ? (
                  <span className="text-[30px] text-center">
                    NOTHING FOUND!
                  </span>
                ) : (
                  <>
                    {searchedData?.map((data) => {
                      return (
                        <div
                          className="h-50 w-full bg-glasss flex mb-5 rounded-sm overflow-auto p-2 <md:(h-30 )"
                          key={data.ID}
                        >
                          <img
                            className="h-full w-50 object-cover <md:(w-30)"
                            src={data.room_pic}
                          />
                          <div className="ml-3 flex flex-col w-full">
                            <span className="text-[23px]  font-Roboto <md:(text-[20px])">
                              {data.room_name}
                            </span>
                            <span className="text-[15px] mt-3  font-Roboto <md:(text-[13px])">
                              {data.room_desc}
                            </span>
                            <div className="h-10 my-2">
                              <span className="text-[12px] bg-blue-600 w-auto mt-3 h-full p-1 rounded-md font-Roboto <md:(text-[9px])">
                                Capacity: {data.room_pax}
                              </span>
                            </div>
                            <div className="flex w-full flex-wrap mt-0">
                              <div className="w-full flex justify-between">
                                <span className="text-[18px] <md:(text-[14px])">
                                  Slots:{" "}
                                  {data.room_available -
                                    reservationData.filter(
                                      (filter) =>
                                        moment(filter.Date_Start).format(
                                          "YYYY-MM-DD"
                                        ) == parameters.date &&
                                        filter.reservation_roomID == data.ID
                                    ).length}
                                </span>
                                <div className="flex flex-col">
                                  {data.room_available -
                                    reservationData.filter(
                                      (filter) =>
                                        moment(filter.Date_Start).format(
                                          "YYYY-MM-DD"
                                        ) == parameters.date &&
                                        filter.reservation_roomID == data.ID
                                    ).length ==
                                  0 ? (
                                    <span className="mt-5 h-9 items-center p-1 bg-red-700 text-white flex rounded-md text-[18px] <md:(mt-0 h-5  text-[12px])">
                                      FULLY BOOKED
                                    </span>
                                  ) : (
                                    <button
                                      className="h-9 w-30 text-white mt-5 rounded-sm shadow-sm shadow-gray-900 bg-gray-800 <md:(mt-0 h-5 w-20 text-[15px])"
                                      onClick={() => {
                                        setShowModal(true);
                                        setReservationInfo({
                                          roomID: data.ID,
                                          room_name: data.room_name,
                                          room_price: data.room_price,
                                        });
                                      }}
                                    >
                                      Book now
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </>
            )}
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
        <Footer />
      </div>
      <AnimatePresence>{showModal && !user && <LoginModal />}</AnimatePresence>
      <AnimatePresence>
        {showModal && user && (
          <InfoModal
            setShowModal={setShowModal}
            reservationInfo={reservationInfo}
            setReservationInfo={setReservationInfo}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchResult;
