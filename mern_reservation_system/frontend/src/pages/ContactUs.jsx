import React from "react";
import Navbar from "../components/Navbar";
import { AiFillPhone } from "react-icons/ai";
import { FaFax } from "react-icons/fa";
import { BiMap } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
const ContactUs = () => {
  return (
    <div className="w-screen h-screen bg-gray-900 flex">
      <Navbar />
      <img
        src="/imgs/slider1.jpg"
        className=" h-full w-full absolute bg-black opacity-30"
      />
      <div className="flex item-center z-index:0 justify-center flex-col ml-150 mt-20 h-120 w-150 bg-glass">
        <div className="w-full h-20 flex items-center justify-center ">
          <span className="font-bold text-[30px] center flex text-white">
            Contact Us
          </span>
        </div>
        <div className="flex flex-col w-full h-full ">
          <div className="w-full h-10  items-center flex justify-center  text-center">
            <input
              className="bg-transparent border-b border-white w-[70%] text-start text-white mt-15 focus:outline-none placeholder-white"
              placeholder="Enter your Name"
            />
          </div>
          <div className="w-full h-10 mt-5 items-center flex justify-center  text-center">
            <input
              className="bg-transparent border-b border-white w-[70%] text-start text-white mt-15 focus:outline-none placeholder-white"
              placeholder="Enter a valid Email"
              type="email"
              required
            />
          </div>
          <div className="w-full h-10 mt-20 items-center flex justify-center">
            <input
              className="bg-transparent border h-20 border-white w-[70%] text-start flex text-white mt-15 focus:outline-none placeholder-white"
              placeholder="Enter your message"
            />
          </div>
          <button className="mt-20 ml-25 text-white w-[70%] bg-transparent rounded-full transition-all border border-transparent duration-700 hover:(border border-white)">
            Submit
          </button>
        </div>
      </div>
      <div className="h-50 w-50  bg-glassv1 justify-center flex items-start mt-50 z-index:1 absolute  left-115 bottom-80 ">
        <div className="item-center justify-center flex flex-col">
          <AiFillPhone className="text-[50px] text-gray-700 w-full flex mt-8 " />
          <span className="font-serif text-center mt-2 w-full">
            PHONE NUMBER
          </span>
          <span className="font-serif text-center mt-2 w-full">
            09123456789
          </span>
        </div>
      </div>
      <div className="h-50 w-50  bg-glassv1 justify-center flex items-start mt-50 z-index:1 absolute left-55 left-115 bottom-80 bottom-80">
        <div className="item-center justify-center flex flex-col">
          <BiMap className="text-[50px] text-gray-700 w-full flex mt-8 " />
          <span className="font-serif text-center mt-2 w-full">
            OUR MAIN OFFICE
          </span>
          <span className="font-serif text-center mt-2 w-full">
            sa lugar na di mo mahahanap
          </span>
        </div>
      </div>
      <div className="h-50 w-50  bg-glassv1 justify-center flex items-start mt-50 z-index:1 absolute left-55 bottom-20">
        <div className="item-center justify-center flex flex-col">
          <FaFax className="text-[50px] text-gray-700 w-full flex mt-8 " />
          <span className="font-serif text-center mt-2 w-full">FAX</span>
          <span className="font-serif text-center mt-2 w-full">
            1-234-567-8900
          </span>
        </div>
      </div>
      <div className="h-50 w-50  bg-glassv1 justify-center flex items-start mt-50 z-index:1 absolute left-115 left-115 bottom-20">
        <div className="item-center justify-center flex flex-col">
          <BiMap className="text-[50px] text-gray-700 w-full flex mt-8 " />
          <span className="font-serif text-center mt-2 w-full">EMAIL</span>
          <span className="font-serif text-center mt-2 w-50 ">
            loremipsum@gmail.com
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
