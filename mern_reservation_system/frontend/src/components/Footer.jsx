import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail, MdLocationPin } from "react-icons/md";
const Footer = () => {
  return (
    <div className="w-full h-[300px] bg-black flex items-center justify-center <md:(flex-col flex justify-center items-center h-full)">
      <div className="h-full flex items-center justify-center w-480 <md:(flex-col flex w-full items-start justify-start pl-4) ">
        <div className="w-full h-full flex flex-col items-center justify-center flex-1">
          <span className="font-resortlogo text-[30px] text-white mt-5 ml-15 w-full <md:(ml-0)">
            JE Resort
          </span>
          <span className="w-100 mt-6 font-resortlogov1 text-white <md:(flex-col flex w-[95%] items-start justify-start)">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus
            pulvinar elementum integer enim neque volutpat ac tincidunt vitae.
            Egestas erat imperdiet sed euismod nisi porta. Eget mauris pharetra
            et ultrices neque ornare aenean euismod elementum. Diam volutpat
            commodo sed egestas egestas fringilla phasellus. Id neque aliquam
          </span>
        </div>
        <div className="w-120 h-full flex flex-col items-center  flex-1 text-white <md:(flex-col flex w-[95%] items-start justify-start)">
          <span className="font-resortlogo text-[20px]  mt-15 ml-7 w-full <md:(ml-0)">
            Contact us
          </span>
          <span className="w-100 mt-6 font-resortlogocontact h-10 items-center flex  text-[15px]  mt-2 <md:(w-full)">
            <BsFillTelephoneFill className="mr-2 text-[20px] font-resortlogocontactk" />
            {"  "}
            +6391234567890
          </span>
          <span className="w-100  font-resortlogocontact h-10 items-center flex text-[15px]   <md:(w-full)">
            <MdEmail className="mr-2 text-[20px]  " />
            {"  "}
            example@example.com
          </span>
          <span className="w-100  font-resortlogocontact h-10 items-center flex text-[15px]  <md:(w-full)">
            <MdLocationPin className="mr-2 text-[20px]  " />
            {"  "}# street, sample barangay. District,City
          </span>
        </div>
        <div className="w-120 h-full flex flex-col items-center r flex-1 <md:(flex-col flex w-[95%] items-start justify-start)">
          <span className="font-resortlogo text-[20px] text-white mt-15 ml-7 w-full <md:(ml-0)">
            Legal Rights
          </span>
          <a className="w-100 mt-10 font-resortlogov1 cursor-pointer  text-white hover:text-blue-400 <md:(w-full)">
            Legal Terms
          </a>
          <a className="w-100 mt-5 font-resortlogov1 cursor-pointer  text-white hover:text-blue-400 <md:(w-full)">
            Privacy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
