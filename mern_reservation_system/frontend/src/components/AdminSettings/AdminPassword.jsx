import React, { useState } from "react";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";
import axios from "axios";
import { API_URL_ADMIN } from "../../utils/Urls";
import { toast, ToastContainer } from "react-toastify";
import Lottie from "lottie-react";
import loadingJson from "../../LottieFiles/98742-loading.json";
import { IoEyeSharp } from "react-icons/io5";

const AdminPassword = () => {
  const [fieldForms, setFieldForms] = useState({
    currentPassword: "",
    newPassword: "",
    verifyPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const { admin } = useSelector((state) => state.admin);

  const decodedToken = admin ? jwt(admin) : "";

  const [revealPassword, setRevealPassword] = useState({
    password1: false,
    password2: false,
    password3: false,
  });

  const change_password = (e) => {
    e.preventDefault();
    setLoading(true);
    if (fieldForms.newPassword == fieldForms.verifyPassword) {
      axios
        .put(API_URL_ADMIN + "change-adminpass", {
          ID: decodedToken.ID,
          currentPassword: fieldForms.currentPassword,
          newPassword: fieldForms.newPassword,
        })
        .then((res) =>
          toast.success("Password has been changed!", {
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
    } else {
      toast.error("Password doesn't match!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <span className="absolute top-0 left-3 font-Roboto text-[25px]">
        Password Settings
      </span>

      <form className="flex flex-col" onSubmit={change_password}>
        <div className="border border-black mb-6 w-80 h-10 pl-1 rounded-sm relative flex items-center">
          <input
            className="w-full h-full  focus:(outline-none)"
            placeholder="Enter your new Password"
            required
            type={revealPassword.password1 ? "text" : "password"}
            minLength={8}
            onChange={(e) =>
              setFieldForms({ ...fieldForms, newPassword: e.target.value })
            }
          />
          <IoEyeSharp
            className="absolute  right-2 text-[20px] cursor-pointer"
            onMouseDown={() =>
              setRevealPassword({ ...revealPassword, password1: true })
            }
            onMouseUp={() =>
              setRevealPassword({ ...revealPassword, password1: false })
            }
            onMouseLeave={() =>
              setRevealPassword({ ...revealPassword, password1: false })
            }
          />
        </div>
        <div className="border border-black mb-6 w-80 h-10 pl-1 rounded-sm relative flex items-center">
          <input
            className="w-full h-full  focus:(outline-none)"
            placeholder="Confirm your new Password"
            type={revealPassword.password2 ? "text" : "password"}
            required
            minLength={8}
            onChange={(e) =>
              setFieldForms({ ...fieldForms, verifyPassword: e.target.value })
            }
          />
          <IoEyeSharp
            className="absolute  right-2 text-[20px] cursor-pointer"
            onMouseDown={() =>
              setRevealPassword({ ...revealPassword, password2: true })
            }
            onMouseUp={() =>
              setRevealPassword({ ...revealPassword, password2: false })
            }
            onMouseLeave={() =>
              setRevealPassword({ ...revealPassword, password2: false })
            }
          />
        </div>
        <div className="border border-black mb-6 w-80 h-10 pl-1 rounded-sm relative flex items-center">
          <input
            className="w-full h-full  focus:(outline-none)"
            placeholder="Enter your current Password"
            type={revealPassword.password3 ? "text" : "password"}
            required
            onChange={(e) =>
              setFieldForms({ ...fieldForms, currentPassword: e.target.value })
            }
          />
          <IoEyeSharp
            className="absolute  right-2 text-[20px] cursor-pointer"
            onMouseDown={() =>
              setRevealPassword({ ...revealPassword, password3: true })
            }
            onMouseUp={() =>
              setRevealPassword({ ...revealPassword, password3: false })
            }
            onMouseLeave={() =>
              setRevealPassword({ ...revealPassword, password3: false })
            }
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

export default AdminPassword;
