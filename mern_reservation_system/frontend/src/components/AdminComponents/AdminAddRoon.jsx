import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import { API_URL_ROOMS } from "../../utils/Urls";
import { uploadMusic } from "../../firebase";
import uniqid from "uniqid";
import { GrAdd, GrPowerReset } from "react-icons/gr";

const AdminAddRoon = ({ setAddRoomToggle }) => {
  const [file, setFile] = useState(null);
  const [formValues, setFormValues] = useState({
    room_name: "",
    room_price: [],
    room_desc: "",
    room_slot: "",
    room_children: "",
    room_adult: "",
    room_pax: "",
  });

  const [valuePrice, setValuePrice] = useState({ value: "" });

  const click_add = () => {
    setFormValues({
      ...formValues,
      room_price: [...formValues.room_price, valuePrice],
    });

    setValuePrice({ value: "" });
  };

  const click_reset = () => {
    setFormValues({ ...formValues, room_price: [] });
  };

  const add_room_data = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      const picData = await uploadMusic(file, uniqid());

      const data = {
        room_name: formValues.room_name,
        room_price: JSON.stringify(formValues.room_price),
        room_desc: formValues.room_desc,
        room_available: formValues.room_slot,
        room_pic: picData,
        room_pax: formValues.room_pax,
      };

      await axios.post(API_URL_ROOMS + "add-room", data);

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(formValues);

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
        <div className="w-full h-full flex items-start  relative flex-col">
          <AiFillCloseCircle
            className="absolute text-red-500 text-[25px] right-2 top-2 cursor-pointer"
            onClick={() => setAddRoomToggle(false)}
          />

          <span className="mt-9 font-Roboto text-[25px] w-full text-center">
            ADD NEW ROOM
          </span>
          <form className="flex flex-col w-full" onSubmit={add_room_data}>
            <div className="flex mt-9 mb-6 h-8 relative ">
              <span className="inline-block ml-3 w-[10rem] arial-narrow text-black">
                ROOM NAME:
              </span>
              <input
                className="w-60 border h-7 border-black rounded-md bg-white focus:(outline-none)"
                onChange={(e) =>
                  setFormValues({ ...formValues, room_name: e.target.value })
                }
                required
              />
            </div>
            <div className="flex mb-6 h-8 relative  flex items-center">
              <span className="inline-block ml-3 w-[10rem] arial-narrow text-black">
                ROOM PRICE:
              </span>
              <input
                className="w-30 border h-7 border-black rounded-md bg-white focus:(outline-none)"
                onChange={(e) => setValuePrice({ value: e.target.value })}
                value={valuePrice.value}
              />
              <select className="w-30 border h-auto overflow-auto">
                {formValues.room_price.map((data) => (
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
                ROOM DESCRIPTION:
              </span>
              <input
                className="w-60 border h-7 border-black rounded-md bg-white focus:(outline-none)"
                onChange={(e) =>
                  setFormValues({ ...formValues, room_desc: e.target.value })
                }
                required
              />
            </div>
            <div className="flex mb-6 h-8 relative ">
              <span className="inline-block ml-3 w-[10rem] arial-narrow text-black">
                ROOM SLOT:
              </span>
              <input
                type="number"
                className="w-60 border h-7 border-black rounded-md bg-white focus:(outline-none)"
                onChange={(e) =>
                  setFormValues({ ...formValues, room_slot: e.target.value })
                }
                required
              />
            </div>
            <div className="flex mb-6 h-8 relative ">
              <span className="inline-block ml-3 w-[10rem] arial-narrow text-black">
                MAXIMUM CAPACITY:
              </span>
              <input
                type="number"
                className="w-60 border h-7 border-black rounded-md bg-white focus:(outline-none)"
                onChange={(e) =>
                  setFormValues({ ...formValues, room_pax: e.target.value })
                }
                required
              />
            </div>

            <div className="flex mb-6 h-8 relative ">
              <span className="inline-block ml-3 w-[10rem] arial-narrow text-black">
                ROOM PICTURE:
              </span>
              <input
                type="file"
                className="w-60  bg-white focus:(outline-none)"
                onChange={(e) => setFile(e.target.files[0])}
                required
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

export default AdminAddRoon;
