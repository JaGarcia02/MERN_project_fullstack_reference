import React from "react";
import { motion } from "framer-motion";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import { API_URL_ROOMS } from "../../utils/Urls";

const AdminUpdateRoom = ({ setUpdateToggle, roomInfo, setRoomInfo }) => {
  const update_room = (e) => {
    e.preventDefault();
    axios
      .put(API_URL_ROOMS + "update-room", {
        id: roomInfo.id,
        room_price: roomInfo.room_price,
        room_name: roomInfo.room_name,
        room_desc: roomInfo.room_desc,
        room_available: roomInfo.room_available,
        room_allowed_children: roomInfo.room_allowed_children,
        room_allowed_adults: roomInfo.room_allowed_children,
      })
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  };

  return (
    <motion.div className="fixed h-full w-full  top-0 left-0 bg-black bg-opacity-80 flex items-center justify-center z-99 ">
      <motion.div
        className="absolute flex h-125 w-120 bg-white flex-col items-center z-99 rounded-md"
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        exit={{ scale: 0 }}
      >
        <div className="w-full h-full relative flex items-start flex-col">
          <AiFillCloseCircle
            className="absolute text-red-500 text-[25px] right-2 top-2 cursor-pointer"
            onClick={() => setUpdateToggle(false)}
          />
          <span className="mt-9 font-Roboto text-[25px] w-full text-center">
            EDIT ROOM
          </span>
          <form className="flex flex-col w-full" onSubmit={update_room}>
            <div className="flex mt-9 mb-6 h-8 relative ">
              <span className="inline-block ml-3 w-[10rem] arial-narrow text-black">
                ROOM NAME:
              </span>
              <input
                className="w-60 border h-7 border-black rounded-md bg-white focus:(outline-none)"
                required
                value={roomInfo.room_name}
                onChange={(e) =>
                  setRoomInfo({ ...roomInfo, room_name: e.target.value })
                }
              />
            </div>
            <div className="flex mb-6 h-8 relative ">
              <span className="inline-block ml-3 w-[10rem] arial-narrow text-black">
                ROOM PRICE:
              </span>
              <input
                className="w-60 border h-7 border-black rounded-md bg-white focus:(outline-none)"
                required
                value={roomInfo.room_price}
                onChange={(e) =>
                  setRoomInfo({ ...roomInfo, room_price: e.target.value })
                }
              />
            </div>
            <div className="flex mb-6 h-8 relative ">
              <span className="inline-block ml-3 w-[10rem] arial-narrow text-black">
                ROOM DESCRIPTION:
              </span>
              <input
                className="w-60 border h-7 border-black rounded-md bg-white focus:(outline-none)"
                required
                value={roomInfo.room_desc}
                onChange={(e) =>
                  setRoomInfo({ ...roomInfo, room_desc: e.target.value })
                }
              />
            </div>
            <div className="flex mb-6 h-8 relative ">
              <span className="inline-block ml-3 w-[10rem] arial-narrow text-black">
                ROOM SLOT:
              </span>
              <input
                className="w-60 border h-7 border-black rounded-md bg-white focus:(outline-none)"
                required
                value={roomInfo.room_available}
                onChange={(e) =>
                  setRoomInfo({ ...roomInfo, room_available: e.target.value })
                }
              />
            </div>
            <div className="flex mb-6 h-8 relative ">
              <span className="inline-block ml-3 w-[10rem] arial-narrow text-black">
                CHILDREN COUNT:
              </span>
              <input
                className="w-60 border h-7 border-black rounded-md bg-white focus:(outline-none)"
                required
                value={roomInfo.room_allowed_children}
                onChange={(e) =>
                  setRoomInfo({
                    ...roomInfo,
                    room_allowed_children: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex mb-6 h-8 relative ">
              <span className="inline-block ml-3 w-[10rem] arial-narrow text-black">
                ADULT COUNT:
              </span>
              <input
                className="w-60 border h-7 border-black rounded-md bg-white focus:(outline-none)"
                required
                value={roomInfo.room_allowed_adults}
                onChange={(e) =>
                  setRoomInfo({
                    ...roomInfo,
                    room_allowed_adults: e.target.value,
                  })
                }
              />
            </div>

            <div className="w-full flex items-center justify-center">
              <button
                className="w-30 h-10 text-white bg-green-700 rounded-md hover:(bg-green-300)"
                type="submit"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminUpdateRoom;
