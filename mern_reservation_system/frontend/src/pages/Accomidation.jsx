import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { API_URL, API_URL_ROOMS } from "../utils/Urls";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LoginModal from "../components/Booking/LoginModal";
import { AnimatePresence } from "framer-motion";
import Fade from "react-reveal/Fade";
import Footer from "../components/Footer";
import { MessengerChat } from "react-messenger-chat-plugin";
import ReservationSticky from "../components/ReservationSticky";

const Accomidation = () => {
  const [rooms, setRooms] = useState([]);
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {
    let subscribe = true;
    axios
      .get(API_URL_ROOMS + "get-rooms")
      .then((res) => {
        if (subscribe) setRooms(res.data);
      })
      .catch((err) => console.log(err));

    return () => (subscribe = false);
  }, []);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollValue(position);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollValue]);

  return (
    <div className=" w-screen flex flex-col justify-start items-center <md:(flex-col flex w-full  items-center justify-start)">
      <Navbar />
      <ReservationSticky />
      {/* header */}
      <div className=" items-start sticky z-20 bg-glasss justify-start w-full h-30  flex flex-col p-2">
        <span className="text-black text-[30px] mt-3 ml-3">Accommodation</span>
        <span className="text-black text-[20px] mt-3 ml-3 font-bold">
          New JE Resort
        </span>
        <span className="text-black text-[10px] mt-3 mb-5 ml-3">
          99 A. MABINI ST. BRGY SABANG BALIUAG,BULACAN, Baliuag, Philippines
        </span>
      </div>
      {/* header */}
      <div className="flex flex-col text-black items-center bg-gray-300 justify-evenly <md:(flex-col flex w-full items-start justify-center)">
        <div className="w-[80%] mt-15 flex <md:(flex flex-col justify-center w-full)">
          <div className="flex-1 flex flex-col items-center justify-end <md:(justify-center)">
            {rooms.map((data, index) => {
              return (
                <div
                  className={`flex  items-center justify-center mb-10  ${
                    index % 2 ? "flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-1 flex flex-col items-center justify-end <md:(justify-center)">
                    <img
                      src={data.room_pic}
                      className="h-100 w-100 object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col p-2 h-full  w-[90%] border border-black  <md:(w-full)">
                    <span className="text-center text-[30px] mb-3 font-bold">
                      {data.room_name}
                    </span>
                    <div className="w-full grid grid-cols-2 mt-4">
                      <div className=" flex flex-col">
                        <span className="text-[25px] <md:(text-[15px])">
                          Description:
                        </span>
                        <p className="ml-4 mt-3 whitespace-pre-line">
                          {data.room_desc}
                        </p>
                      </div>
                      <div className=" flex flex-col">
                        <span className="text-[25px] <md:(text-[15px])">
                          Rates:
                        </span>
                        <ul className="list-disc ml-8 mt-3 ">
                          {JSON.parse(data.room_price).map((dataPrice) => {
                            return <li>{dataPrice.value}</li>;
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-start flex-col mt-20 mb-10 <md:(px-2 w-full)">
          <iframe
            src="https://www.youtube.com/embed/LDzdHR9ysgc"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            className="w-200 h-120 <md:(w-full)"
          />
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
  );
};

export default Accomidation;
