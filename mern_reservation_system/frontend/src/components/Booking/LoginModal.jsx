import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/users/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fieldForms, setFieldForms] = useState({
    username: "",
    password: "",
  });
  const [revealPassword, setRevealPassword] = useState(false);

  const login_modal = (e) => {
    e.preventDefault();

    dispatch(loginUser(fieldForms));
  };

  return (
    <motion.div className="shadow-md h-screen w-screen fixed top-0 left-0 items-center justify-center mb-100 flex z-999">
      <motion.form
        onSubmit={login_modal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        exit={{ opacity: 0 }}
        className="w-80 h-50 absolute top-20 rounded-md text-center bg-white shadow-md shadow-gray-900 items-center flex-col justify-center"
      >
        <div className="h-full w-full ">
          <AiFillCloseCircle
            className="text-red-600 absolute top-1 right-1 cursor-pointer text-[18px]"
            onClick={() => setShowModal(false)}
          />
          <span className="text-center font-mono font-bold items-center text-black mt-3 justify-center flex text-[20px]">
            Login
          </span>
          <input
            className="bg-transparent border-b mt-3 border-black w-[70%] text-black  focus:outline-none placeholder-black"
            placeholder="Username"
            required
            onChange={(e) =>
              setFieldForms({ ...fieldForms, username: e.target.value })
            }
          />
          <div className="relative flex items-center justify-center">
            <input
              className="bg-transparent border-b border-black w-[70%] text-black  focus:outline-none placeholder-black"
              type={revealPassword ? "type" : "password"}
              placeholder="Password"
              required
              onChange={(e) =>
                setFieldForms({ ...fieldForms, password: e.target.value })
              }
            />
            <IoEyeSharp
              className="absolute right-12 cursor-pointer"
              onMouseDown={() => setRevealPassword(true)}
              onMouseUp={() => setRevealPassword(false)}
              onMouseLeave={() => setRevealPassword(false)}
            />
          </div>
          <button
            type="submit"
            className="mt-[5%] text-black w-[70%] bg-transparent rounded-full transition-all border border-transparent duration-700 hover:(border border-black)"
          >
            LOGIN
          </button>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="mt-[5%] text-black w-[70%] bg-transparent rounded-full transition-all border border-transparent duration-700 hover:(border border-black)"
          >
            REGISTER
          </button>
        </div>
      </motion.form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
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

export default LoginModal;
