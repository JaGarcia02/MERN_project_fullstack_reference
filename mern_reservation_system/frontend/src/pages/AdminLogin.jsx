import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login_admin } from "../features/admin/adminSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import Lottie from "lottie-react";
import LoadingJson from "../LottieFiles/98742-loading.json";

const AdminLogin = () => {
  const [adminFields, setAdminFields] = useState({
    username: "",
    password: "",
  });

  const [viewPassword, setViewPassword] = useState(false);

  const dispatch = useDispatch();
  const { isErrorAdmin, isLoadingAdmin, messageAdmin } = useSelector(
    (state) => state.admin
  );

  const handleAdminLogin = (e) => {
    e.preventDefault();
    dispatch(login_admin(adminFields));
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form
        className="shadow-md shadow-gray-900 h-120 w-100 rounded-md flex flex-col items-center justify-center"
        onSubmit={handleAdminLogin}
      >
        <span className="text-[45px] text-gray-900 mb-10">LOGIN</span>
        <span className="mt-5 text-[25px] text-gray-900">ADMINISTRATOR</span>
        <input
          className="border w-[70%] h-8 mt-10 border-black rounded-none focus:(outline-none)"
          type="text"
          required
          onChange={(e) =>
            setAdminFields({ ...adminFields, username: e.target.value })
          }
        />
        <div className="border w-[70%] h-8 mt-10 border-black rounded-none relative flex items-center">
          <input
            className="w-full h-full focus:(outline-none)"
            type={viewPassword ? "text" : "password"}
            required
            onChange={(e) =>
              setAdminFields({ ...adminFields, password: e.target.value })
            }
          />
          <IoEyeSharp
            className="absolute right-1 text-black text-[20px] cursor-pointer"
            onMouseDown={() => setViewPassword(true)}
            onMouseUp={() => setViewPassword(false)}
            onMouseLeave={() => setViewPassword(false)}
          />
        </div>
        <Link to="/admin-forgot" className="my-10 ">
          <span className="text-[12px] my-10 cursor-pointer hover:(text-blue-900 underline underline-blue-900)">
            Forgot Password
          </span>
        </Link>
        {isLoadingAdmin ? (
          <Lottie
            animationData={LoadingJson}
            loop={true}
            className="h-25 w-25 self-center"
          />
        ) : (
          <button
            className=" w-[60%] bg-blue-gray-800 text-white rounded-full disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoadingAdmin}
          >
            LOGIN
          </button>
        )}
      </form>
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
    </div>
  );
};

export default AdminLogin;
