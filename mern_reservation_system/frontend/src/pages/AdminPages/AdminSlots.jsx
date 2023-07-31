import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSideBar from "../../components/AdminComponents/AdminSideBar";
import AdminTopbar from "../../components/AdminComponents/AdminTopbar";
import { API_URL_ROOMS } from "../../utils/Urls";
import { IoAddOutline } from "react-icons/io5";
import { BsArrowLeftShort } from "react-icons/bs";
import { AnimatePresence } from "framer-motion";
import { AiFillDelete } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";

import { FaEdit } from "react-icons/fa";
import AdminAddRoon from "../../components/AdminComponents/AdminAddRoon";
import AdminUpdateRoom from "../../components/AdminComponents/AdminUpdateRoom";

const AdminSlots = () => {
  const [rooms, setRooms] = useState([]);
  const [addRoomToggle, setAddRoomToggle] = useState(false);
  const [updateToggle, setUpdateToggle] = useState(false);
  const [roomInfo, setRoomInfo] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL_ROOMS + "get-rooms")
      .then((res) => setRooms(res.data))
      .catch((err) => console.log(err));
  }, []);

  const delete_room = (id) => {
    axios
      .delete(API_URL_ROOMS + `remove-room/${id}`)
      .then((res) => setRooms(res.data))
      .catch((err) => console.log(err));
  };

  const updating_room = (data) => {
    setRoomInfo(data);
    setUpdateToggle(true);
  };
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setAddRoomToggle(false);
        // document.body.style.overflow = "unset";
      }
    };
    window.addEventListener("keydown", close);

    return () => {
      window.removeEventListener("keydown", close);
    };
  }, []);
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setUpdateToggle(false);
        // document.body.style.overflow = "unset";
      }
    };
    window.addEventListener("keydown", close);

    return () => {
      window.removeEventListener("keydown", close);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex">
      <AdminSideBar />
      <AdminTopbar />
      <div className="mt-15 ml-70 pb-10 flex flex-col w-full">
        <div className="w-full shadow pb-6 items-center justify-start flex shadow-b h-15 shadow-black">
          <span className="text-[30px] mt-5 font-serif ">Room Management</span>
        </div>
        <div className="w-full mt-5 pr-5 justify-end flex items-center">
          <button
            onClick={() => setAddRoomToggle(true)}
            className="w-30 h-15   pr-2 flex items-center justify-center text-[80%]   mr-3 shadow-sm text-black   border border-black active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out  transform py-1 rounded-sm hover:rounded-sm hover:border-black "
          >
            <GrAdd className="mr-2 text-[20px] cursor-pointer text-black hover:(text-black ) <md:(text-[50px])" />
            Add Room
          </button>
        </div>
        <div className="w-full flex pt-10  flex-wrap  h-full">
          {rooms.map((data) => {
            return (
              <div className="w-80  h-100 ml-5 shadow-sm shadow-gray-900 my-5 flex flex-col  relative mr-5">
                <img
                  className="w-full h-[60%] object-cover"
                  src={data.room_pic}
                />
                <span className="text-[20px] text-center mt-1">
                  {data.room_name}
                </span>
                <span className="text-center mx-3 mt-2">{data.room_desc}</span>

                <span className="mt-4 mx-3 text-left">
                  Slots: {data.room_available}
                </span>
                <FaEdit
                  className="absolute bottom-3 right-12 text-[25px] text-green-600 cursor-pointer rounded-md hover:(bg-gray-400)"
                  onClick={() =>
                    updating_room({
                      room_name: data.room_name,
                      id: data.ID,
                      room_price: data.room_price,
                      room_desc: data.room_desc,
                      room_available: data.room_available,
                      room_allowed_children: data.room_allowed_children,
                      room_allowed_adults: data.room_allowed_adults,
                    })
                  }
                />
                <AiFillDelete
                  className="absolute bottom-3 right-3 text-[25px] text-red-600 cursor-pointer rounded-md hover:(bg-gray-400)"
                  onClick={() => delete_room(data.ID)}
                />
              </div>
            );
          })}

          {/* <div
            className="w-65 h-120 shadow-sm shadow-gray-900 my-5 flex flex-col items-center justify-center cursor-pointer group mr-5"
            onClick={() => setAddRoomToggle(true)}
          >
            <IoAddOutline className="text-[80px] bg-gray-300 rounded-full group-hover:(bg-gray-500)" />
          </div> */}
        </div>
        {/* <div className="w-[90%] flex flex-wrap">
          {rooms.map((data) => {
            return (
              <div className="w-65 h-120 shadow-sm shadow-gray-900 my-5 flex flex-col relative mr-5">
                <img
                  className="w-full h-[60%] object-cover"
                  src={data.room_pic}
                />
                <span className="text-[20px] text-center mt-1">
                  {data.room_name}
                </span>
                <span className="text-center mx-3 mt-2">{data.room_desc}</span>
                <span className="mt-4 mx-3 text-left">
                  Price: {data.room_price}
                </span>
                <span className="mt-4 mx-3 text-left">
                  Slots: {data.room_available}
                </span>
                <FaEdit
                  className="absolute bottom-3 right-12 text-[25px] text-green-600 cursor-pointer rounded-md hover:(bg-gray-400)"
                  onClick={() =>
                    updating_room({
                      room_name: data.room_name,
                      id: data.ID,
                      room_price: data.room_price,
                      room_desc: data.room_desc,
                      room_available: data.room_available,
                      room_allowed_children: data.room_allowed_children,
                      room_allowed_adults: data.room_allowed_adults,
                    })
                  }
                />
                <AiFillDelete
                  className="absolute bottom-3 right-3 text-[25px] text-red-600 cursor-pointer rounded-md hover:(bg-gray-400)"
                  onClick={() => delete_room(data.ID)}
                />
              </div>
            );
          })}
          <div
            className="w-65 h-120 shadow-sm shadow-gray-900 my-5 flex flex-col items-center justify-center cursor-pointer group mr-5"
            onClick={() => setAddRoomToggle(true)}
          >
            <IoAddOutline className="text-[80px] bg-gray-300 rounded-full group-hover:(bg-gray-500)" />
          </div>
        </div> */}
      </div>
      <AnimatePresence>
        {addRoomToggle && <AdminAddRoon setAddRoomToggle={setAddRoomToggle} />}
        {updateToggle && (
          <AdminUpdateRoom
            setUpdateToggle={setUpdateToggle}
            roomInfo={roomInfo}
            setRoomInfo={setRoomInfo}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminSlots;
