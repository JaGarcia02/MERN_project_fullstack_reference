import React, { useState, useRef, forwardRef } from "react";
import { ImExit, ImHome } from "react-icons/im";
import {
  AiFillSchedule,
  AiFillQuestionCircle,
  AiOutlineClose,
  AiFillSetting,
} from "react-icons/ai";
import { FaBed } from "react-icons/fa";
import { MdWineBar } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { RiLoginBoxFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import jwt from "jwt-decode";
import { logoutUser } from "../features/users/userSlice";
import withClickOutside from "../utils/withClickedOutside";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = forwardRef(({ open, setOpen }, ref) => {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const name = user ? jwt(user) : null;
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div
      className="w-full fixed bg-gray-800 h-15 flex items-center justify-center z-50 top-0 left-0 "
      ref={ref}
    >
      <div className="flex w-300 h-full <md:(justify-between) ">
        <img src="/imgs/NewJe.jpg" alt="logo" />
        <div className="flex text-white items-center justify-evenly w-full <md:(hidden)">
          <a href="/" className="h-full">
            <span className="nav-bar-items">
              <ImHome className="mr-2" />
              Home
            </span>
          </a>

          <a href="/accommodations" className="h-full">
            <span className="nav-bar-items">
              <FaBed className="mr-2" />
              Accommodation
            </span>
          </a>

          {user ? (
            <span
              className={`nav-bar-items relative ${open && "bg-gray-400"}`}
              onClick={() => setOpen(!open)}
            >
              {name.fullName.split(" ")[0]}
              {open && (
                <div className="absolute top-13 rounded-md shadow-light-300 shadow-sm right-0 overflow-auto items-center w-40 bg-gray-400 flex flex-col justify-center">
                  <Link to="/reserve" className="w-full">
                    <span className="border-b border-b-gray-900 w-full flex items-center justify-center h-8 z-99">
                      Reservations
                    </span>
                  </Link>
                  <Link to="/account-setting" className="w-full">
                    <span className="border-b border-b-gray-900 w-full flex items-center justify-center h-8 z-99">
                      Account Settings
                    </span>
                  </Link>
                  <span
                    className="border-b border-b-gray-900 w-full flex items-center justify-center h-8 z-99"
                    onClick={logout}
                  >
                    Logout
                  </span>
                </div>
              )}
            </span>
          ) : (
            <a href="/login" className="h-full">
              <span className="nav-bar-items">
                <RiLoginBoxFill className="mr-2" />
                Login
              </span>
            </a>
          )}
        </div>
        {/*RESPONSIVE NAVBAR  */}
        <div className="hidden <md:(flex text-white items-center mr-4 text-[30px] )">
          <GiHamburgerMenu onClick={() => setShowMenu(true)} />
        </div>

        {/*SIDEBAR THAT SHOWING WHE BURGER MENU WAS CLICKED */}
        <div
          className={`hidden bg-gray-900 w-[250px] h-screen fixed top-0 transition-all duration-500 flex-col justify-center z-50 ${
            showMenu ? "right-0" : "right-[-100%]"
          } items-center <md:(flex)`}
        >
          <AiOutlineClose
            className="absolute top-1 text-red-600 left-1 text-[40px] cursor-pointer"
            onClick={() => setShowMenu(false)}
          />
          <div className="w-full h-full  flex flex-col items-center ">
            <div className="flex flex-col mt-20">
              <Link to="/">
                <span className="text-left flex items-center mb-10 text-[20px] text-white font-Roboto cursor-pointer hover:(bg-gray-400)">
                  <ImHome className="mr-2" />
                  Home
                </span>
              </Link>
              <Link to="/accommodations">
                <span className="text-left flex items-center mb-10 text-[20px] text-white font-Roboto cursor-pointer hover:(bg-gray-400)">
                  <FaBed className="mr-2" /> Accommodations
                </span>
              </Link>
              {user ? (
                <>
                  <Link to="/reserve" className="w-full">
                    <span className="text-left flex items-center mb-10 text-[20px] text-white font-Roboto cursor-pointer hover:(bg-gray-400)">
                      <AiFillSchedule className="mr-2" />
                      Reservation
                    </span>
                  </Link>
                  <Link to="/account-setting" className="w-full">
                    <span className="text-left flex items-center mb-10 text-[20px] text-white font-Roboto cursor-pointer hover:(bg-gray-400)">
                      <AiFillSetting className="mr-2" /> Settings
                    </span>
                  </Link>
                  <span
                    onClick={logout}
                    className="text-left flex items-center mb-10 text-[20px] text-white font-Roboto cursor-pointer hover:(bg-gray-400)"
                  >
                    <ImExit className="mr-2" /> Logout
                  </span>
                </>
              ) : (
                <Link to="/login" className="w-full">
                  <span className="text-left flex items-center mb-10 text-[20px] text-white font-Roboto cursor-pointer hover:(bg-gray-400)">
                    <RiLoginBoxFill className="mr-2" /> Login
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default withClickOutside(Navbar);
