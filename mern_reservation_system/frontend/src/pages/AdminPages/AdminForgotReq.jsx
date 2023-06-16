import axios from "axios";
import React, { useState } from "react";
import { API_URL_ADMIN } from "../../utils/Urls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminForgotReq = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const sendEmail_admin = (e) => {
    e.preventDefault();
    axios
      .post(API_URL_ADMIN + "req-forgotPass", { email })
      .then((res) => setSuccess(true))
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, {
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
    <div className="h-screen w-screen items-center justify-center bg-gray-300 flex">
      <form
        className="w-100 flex  flex-col items-center  bg-white h-100"
        onSubmit={sendEmail_admin}
      >
        <img
          src="/imgs/undraw_forgot_password_re_hxwm.svg"
          alt="logo"
          className="h-40 w-40 object-contain  justify-self-center"
        />
        <span className="font-Roboto text-[20px] mb-12">Forgot Password?</span>
        <input
          className="w-80 h-8 mb-20 border border-gray-400 rounded-sm p-1 "
          placeholder="Enter your email address or Username"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        {success ? (
          <span className="bg-green-400 text-[15px] p-1 rounded-md">
            Please check your email confirmation
          </span>
        ) : (
          <button
            type="submit"
            className="bg-green-800 w-40 h-10 text-white rounded-md shadow-sm shadow-gray-400"
          >
            Submit
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

export default AdminForgotReq;
