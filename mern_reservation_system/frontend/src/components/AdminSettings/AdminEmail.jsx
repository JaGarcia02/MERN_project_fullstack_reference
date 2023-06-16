import React, { useState } from "react";
import { API_URL_ADMIN } from "../../utils/Urls";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import Lottie from "lottie-react";
import loadingJson from "../../LottieFiles/98742-loading.json";
import axios from "axios";
import { IoEyeSharp } from "react-icons/io5";

const AdminEmail = () => {
  const [fieldForms, setFieldForms] = useState({
    newEmail: "",
    password: "",
  });

  const { admin } = useSelector((state) => state.admin);

  const [loading, setLoading] = useState(false);
  const [revealPassword, setRevealPassword] = useState(false);

  const decodedToken = admin ? jwt(admin) : "";

  console.log(decodedToken);

  const submit_email = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(API_URL_ADMIN + "change-adminemail", {
        email: decodedToken.email,
        password: fieldForms.password,
        newEmail: fieldForms.newEmail,
      })
      .then((res) =>
        toast.success("Email has been changed!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      )
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
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <span className="absolute top-0 left-3 font-Roboto text-[25px]">
        Email Settings
      </span>

      <form className="flex flex-col" onSubmit={submit_email}>
        <input
          className="border border-black mb-6 w-80 h-10 pl-1 rounded-sm"
          placeholder="Insert you new Email"
          required
          onChange={(e) =>
            setFieldForms({ ...fieldForms, newEmail: e.target.value })
          }
        />
        <div className="border border-black mb-6 w-80 h-10 pl-1 rounded-sm relative flex items-center">
          <input
            className="w-full h-full  focus:(outline-none)"
            placeholder="Current Password"
            type={revealPassword ? "text" : "password"}
            required
            onChange={(e) =>
              setFieldForms({ ...fieldForms, password: e.target.value })
            }
          />
          <IoEyeSharp
            className="absolute  right-2 text-[20px] cursor-pointer"
            onMouseDown={() => setRevealPassword(true)}
            onMouseUp={() => setRevealPassword(false)}
            onMouseLeave={() => setRevealPassword(false)}
          />
        </div>
        {loading ? (
          <Lottie animationData={loadingJson} loop={true} classID="w-60 h-15" />
        ) : (
          <button
            type="submit"
            className="bg-green-700 w-60 rounded-sm shadow-sm text-white shadow-gray-700 self-center h-10"
          >
            Save Changes
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

export default AdminEmail;
