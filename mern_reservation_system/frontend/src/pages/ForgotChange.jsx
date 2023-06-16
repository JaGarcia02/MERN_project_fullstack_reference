import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { API_URL_USERS } from "../utils/Urls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ForgotChange = () => {
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirm: "",
  });
  const [success, setSuccess] = useState(false);

  const auth = useParams();
  const navigate = useNavigate();

  const change_password = (e) => {
    e.preventDefault();
    if (newPassword.password == newPassword.confirm) {
      axios
        .put(API_URL_USERS + "forgot-change", {
          token: auth.token,
          password: newPassword.password,
        })
        .then((res) => setSuccess(true))
        .catch((err) => {
          alert("Oops something went wrong!");
          navigate("/");
        });
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
    }
  };

  return (
    <div className="h-screen w-screen items-center justify-center bg-gray-300 flex">
      <Navbar />
      <form
        className="w-100 flex justify-center flex-col items-center  bg-white h-100 rounded-sm"
        onSubmit={change_password}
      >
        <span className="font-Roboto text-[20px] mb-12">
          Change your Password
        </span>
        <input
          className="w-80 h-8 mb-5 border border-gray-400 rounded-sm p-1 "
          placeholder="New Password"
          required
          type="password"
          onChange={(e) =>
            setNewPassword({ ...newPassword, password: e.target.value })
          }
        />
        <input
          className="w-80 h-8 mb-20 border border-gray-400 rounded-sm p-1 "
          placeholder="Confirm Password"
          required
          type="password"
          onChange={(e) =>
            setNewPassword({ ...newPassword, confirm: e.target.value })
          }
        />

        {success ? (
          <span
            className="w-80 bg-green-400 text-[15px] font-Roboto text-center p-1 rounded-md cursor-pointer"
            onClick={() => navigate("/")}
          >
            Password has been success fully change you may login now again
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

export default ForgotChange;
