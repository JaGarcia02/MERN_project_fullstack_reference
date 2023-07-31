import React, { useState } from "react";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";
import axios from "axios";
import { API_URL_USERS } from "../../utils/Urls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "lottie-react";
import loadingJson from "../../LottieFiles/98742-loading.json";

const EmailSetting = () => {
  const { user } = useSelector((state) => state.user);
  const [fieldForms, setFieldForms] = useState({
    password: "",
    newEmail: "",
  });
  const [loading, setLoading] = useState(false);

  const submit_data = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(API_URL_USERS + "change-email", {
        email: jwt(user).email,
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

      <form className="flex flex-col" onSubmit={submit_data}>
        <input
          className="border border-black mb-6 w-80 h-10 pl-1 rounded-sm"
          placeholder="Insert you new Email"
          required
          onChange={(e) =>
            setFieldForms({ ...fieldForms, newEmail: e.target.value })
          }
        />
        <input
          className="border border-black mb-6 w-80 h-10 pl-1 rounded-sm"
          placeholder="Current Password"
          type="password"
          required
          onChange={(e) =>
            setFieldForms({ ...fieldForms, password: e.target.value })
          }
        />
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

export default EmailSetting;
