import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import { API_URL_ROOMS } from "../../utils/Urls";
import { GrAdd, GrPowerReset } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "lottie-react";
import LoadingJson from "../../LottieFiles/98742-loading.json";

const AdminUpdateRoom = ({ setUpdateToggle, roomInfo, setRoomInfo }) => {
  const [valuePrice, setValuePrice] = useState({ value: "" });
  const [arrayValues, setArrayValues] = useState([]);
  const [loading, setLoading] = useState(false);

  const update_room = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(API_URL_ROOMS + "update-room", {
        id: roomInfo.id,
        room_price: roomInfo.room_price,
        room_name: roomInfo.room_name,
        room_desc: roomInfo.room_desc,
        room_available: roomInfo.room_available,
        room_category: roomInfo.room_category,
      })
      .then((res) =>
        toast.info("UPDATE SUCCESSFULLY", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      )
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setRoomInfo({
      ...roomInfo,
      room_price: JSON.stringify(arrayValues),
    });
  }, [arrayValues]);

  const click_add = () => {
    setArrayValues([...arrayValues, valuePrice]);

    setValuePrice({ value: "" });
  };

  const click_reset = () => {
    setRoomInfo({ ...roomInfo, room_price: null });
  };

  console.log(roomInfo);

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
            EDIT AMENITY
          </span>
          <form className="flex flex-col w-full" onSubmit={update_room}>
            <div className="flex mt-9 mb-6 h-8 relative ">
              <span className="inline-block ml-3 w-[10rem] arial-narrow text-black">
                AMENITY NAME:
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
                AMENITY PRICE:
              </span>
              <input
                className="w-30 border h-7 border-black rounded-md bg-white focus:(outline-none)"
                required
                onChange={(e) => setValuePrice({ value: e.target.value })}
              />
              <select>
                {JSON.parse(roomInfo.room_price)?.map((data) => (
                  <option>{data?.value}</option>
                ))}
              </select>
              <button
                type="button"
                className="bg-green-500 h-6 w-6 flex items-center justify-center rounded-md ml-1"
                onClick={click_add}
              >
                <GrAdd />
              </button>
              <button
                type="button"
                className="bg-red-500 h-6 w-6 flex items-center justify-center rounded-md ml-1"
                onClick={click_reset}
              >
                <GrPowerReset />
              </button>
            </div>
            <div className="flex mb-6 h-8 relative ">
              <span className="inline-block ml-3 w-[10rem] arial-narrow text-black">
                AMENITY DESCRIPTION:
              </span>
              <textarea
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
                AMENITY SLOT:
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
                AMENITY PAX:
              </span>
              <input
                className="w-60 border h-7 border-black rounded-md bg-white focus:(outline-none)"
                required
                value={roomInfo.room_pax}
                onChange={(e) =>
                  setRoomInfo({ ...roomInfo, room_pax: e.target.value })
                }
              />
            </div>
            <div className="flex mb-6 h-8 relative ">
              <span className="inline-block ml-3 w-[10rem] arial-narrow text-black">
                AMENITY CATEGORY:
              </span>
              <select
                required
                className="w-60 border h-7 border-black rounded-md bg-white focus:(outline-none)"
                onChange={(e) =>
                  setRoomInfo({ ...roomInfo, room_category: e.target.value })
                }
                value={roomInfo.room_category}
              >
                <option value="KTV Rooms">KTV Rooms</option>
                <option value="Pools (Includes Private and Public)">
                  Pools (Includes Private and Public)
                </option>
                <option value="Cottages">Cottages</option>
                <option value="Kids Pool and Pavilions">
                  Kids Pool and Pavilions
                </option>
                <option value="Function Hall">Function Hall</option>
              </select>
            </div>

            <div className="w-full flex items-center justify-center">
              {loading ? (
                <Lottie
                  className="w-25 h-25 self-center -mt-5"
                  animationData={LoadingJson}
                  loop={true}
                />
              ) : (
                <button
                  className="w-30 h-10 text-white bg-green-700 rounded-md hover:(bg-green-300)"
                  type="submit"
                >
                  SUBMIT
                </button>
              )}
            </div>
          </form>
        </div>
      </motion.div>
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
    </motion.div>
  );
};

export default AdminUpdateRoom;
