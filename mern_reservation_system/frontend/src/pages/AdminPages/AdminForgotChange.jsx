import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { API_URL_ADMIN } from "../../utils/Urls";
import { useParams } from "react-router-dom";

const AdminForgotChange = () => {
  const [changePassword, setChangePassword] = useState({
    password: "",
    verifyPassword: "",
  });
  const [success, setSuccess] = useState(false);

  const token = useParams();

  const change_password_admin = (e) => {
    e.preventDefault();
    if (changePassword.password == changePassword.verifyPassword) {
      axios
        .put(API_URL_ADMIN + "req-forgotChangePass", {
          token: token.token,
          password: changePassword.password,
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
      <form
        className="w-100 flex justify-center flex-col items-center  bg-white h-100 rounded-sm"
        onSubmit={change_password_admin}
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
            setChangePassword({ ...changePassword, password: e.target.value })
          }
        />
        <input
          className="w-80 h-8 mb-5 border border-gray-400 rounded-sm p-1 "
          placeholder="Verify Password"
          required
          type="password"
          onChange={(e) =>
            setChangePassword({
              ...changePassword,
              verifyPassword: e.target.value,
            })
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

export default AdminForgotChange;
