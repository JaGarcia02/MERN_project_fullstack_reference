import React, { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";
import axios from "axios";
import { API_URL_USERS } from "../../utils/Urls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserInfo = () => {
  const { user } = useSelector((state) => state.user);
  const [fieldForms, setFieldForms] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    contactNum: jwt(user).contactNum,
    password: "",
  });

  const change_info = (e) => {
    e.preventDefault();
    const { lastName, firstName, middleName, contactNum, password } =
      fieldForms;
    axios
      .put(API_URL_USERS + "update-info", {
        ID: jwt(user).id,
        password,
        contactNum,
        lastName,
        firstName,
        middleName,
      })
      .then((res) => {
        toast.success("Info has been changed!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((err) => {
        const message =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();

        toast.error(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <span className="absolute top-0 left-3 font-Roboto text-[25px]">
        Information Settings
      </span>

      <form className="flex flex-col" onSubmit={change_info}>
        <span className="-ml-6">
          Current Name: <p className="font-semibold">{jwt(user).fullName}</p>
        </span>
        <div className="mb-6 w-80 h-10 pl-1 rounded-sm relative flex items-center">
          <input
            className="w-full h-full border-black border focus:(outline-none)"
            placeholder="Last Name"
            required
            onChange={(e) =>
              setFieldForms({ ...fieldForms, lastName: e.target.value })
            }
          />
          <input
            className="w-full h-full border-black border mx-2 focus:(outline-none)"
            placeholder="First Name"
            required
            onChange={(e) =>
              setFieldForms({ ...fieldForms, firstName: e.target.value })
            }
          />
          <input
            className="w-full h-full border-black border  focus:(outline-none)"
            placeholder="Middle Name"
            required
            onChange={(e) =>
              setFieldForms({ ...fieldForms, middleName: e.target.value })
            }
          />
        </div>
        <div className="border border-black mb-6 w-80 h-10 pl-1 rounded-sm relative flex items-center">
          <input
            className="w-full h-full  focus:(outline-none)"
            placeholder="Contact num"
            required
            value={fieldForms.contactNum}
            onChange={(e) =>
              setFieldForms({ ...fieldForms, contactNum: e.target.value })
            }
          />
        </div>
        <div className="border border-black mb-6 w-80 h-10 pl-1 rounded-sm relative flex items-center">
          <input
            className="w-full h-full  focus:(outline-none)"
            placeholder="Enter your current Password"
            required
            onChange={(e) =>
              setFieldForms({ ...fieldForms, password: e.target.value })
            }
          />
          <IoEyeSharp className="absolute  right-2 text-[20px] cursor-pointer" />
        </div>

        <button
          type="submit"
          className="bg-green-700 w-60 rounded-sm shadow-sm text-white shadow-gray-700 self-center h-10"
        >
          Save Changes
        </button>
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

export default UserInfo;
