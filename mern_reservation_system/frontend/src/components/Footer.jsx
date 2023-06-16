import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail, MdLocationPin } from "react-icons/md";
import { AiFillFacebook } from "react-icons/ai";
const Footer = () => {
  return (
    <div className="w-full h-[300px]  bg-black flex items-center justify-center <md:(flex-col flex justify-center items-center h-full)">
      <div className="h-full flex items-center justify-center w-480 <md:(flex-col flex w-full items-start justify-start pl-4) ">
        <div className="w-full h-full flex flex-col items-center justify-center flex-1">
          <span className="font-resortlogo text-[30px] text-white mt-5 ml-15 w-full <md:(ml-0)">
            New JE Resort
          </span>
          <span className="w-150 mt-6 font-resortlogov1 text-white <md:(flex-col flex w-[95%] items-start justify-start)">
            Discover a spectacular private resort that is only about two hours
            away from Manila. New JE Resort is located on Baliuag in the
            province of Bulacan. With our private rooms and pools, you can enjoy
            our amenities with your family and friends while celebrating
            memorable occasions with us. Dispel your daily worries and stresses
            in a setting that offers serenity. Come and experience a life that
            has a remarkably new flavor. Whether you're going on a trip for work
            or pleasure, a family holiday or a romantic break.
          </span>
        </div>
        <div className=" w-120 h-full flex flex-col items-center text-left flex-1 text-white <md:(flex-col flex w-[95%] items-start justify-start)">
          <div className="text-left mt-15">
            <span className="font-resortlogo text-[20px]  mt-15  <md:(ml-0)">
              Contact us
            </span>
            <span className="w-100 mt-6 font-resortlogocontact h-10 items-center flex  text-[15px]  mt-2 <md:(w-full)">
              <BsFillTelephoneFill className="mr-2 text-[20px] font-resortlogocontactk" />
              {"  "}
              0919 806 0645 <br />
              (044) 308-5247
            </span>
            <span className="w-100  font-resortlogocontact h-10 items-center flex text-[15px]   <md:(w-full)">
              <MdEmail className="mr-2 text-[20px]  " />
              {"  "}
              njegardenresortandpavillion@gmail.com
            </span>
            <p className=" w-100  font-resortlogocontact h-10 items-center flex text-[15px] hover:text-blue-700   <md:(w-full)">
              <AiFillFacebook className="mr-2 text-[20px]  " />
              <a
                href="https://www.facebook.com/NJEresortlegitaccount"
                target="_blank"
              >
                {" "}
                https://www.facebook.com/NJEresortlegitaccount
              </a>
            </p>
            <span className="w-100  font-resortlogocontact h-10 items-center flex text-[15px]  <md:(w-full)">
              <MdLocationPin className="mr-2 text-[20px]  " />
              {"  "}#99 A. MABINI ST. BRGY SABANG BALIUAG,BULACAN, Baliuag,
              Philippines
            </span>
          </div>
        </div>
        {/* <div className="w-120 h-full flex flex-col items-center r flex-1 <md:(flex-col flex w-[95%] items-start justify-start)">
          <span className="font-resortlogo text-[20px] text-white mt-15 ml-7 w-full <md:(ml-0)">
            Legal Rights
          </span>
          <a className="w-100 mt-10 font-resortlogov1 cursor-pointer  text-white hover:text-blue-400 <md:(w-full)">
            Legal Terms
          </a>
          <a className="w-100 mt-5 font-resortlogov1 cursor-pointer  text-white hover:text-blue-400 <md:(w-full)">
            Privacy
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default Footer;
