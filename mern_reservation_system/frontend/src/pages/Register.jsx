import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { register_user } from "../features/users/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MessengerChat } from "react-messenger-chat-plugin";

const Register = () => {
  const dispatch = useDispatch();
  const [fieldForms, setFieldForms] = useState({
    user_LastName: "",
    user_FirstName: "",
    user_MiddleName: "",
    user_Email: "",
    user_ContactNum: "",
    user_Address: "",
    user_username: "",
    user_password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isSuccessUser } = useSelector((state) => state.user);

  const whenChange = (e) => {
    setFieldForms((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isSuccessUser) {
      toast.success("CHECK YOUR EMAIL FOR VERIFICATION", {
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
  }, [isSuccessUser]);

  const register = (e) => {
    e.preventDefault();
    if (fieldForms.user_password == confirmPassword) {
      dispatch(register_user(fieldForms));
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
    <div className="w-screen flex items-center justify-center bg-black">
      <div className="mt-15" />
      <Navbar />
      <img
        src="/imgs/slider1.jpg"
        className=" h-full w-full absolute bg-black opacity-30"
      />
      <form
        className="w-100 h-145 bg-glass z-3 flex flex-col items-center mt-15"
        onSubmit={register}
      >
        <span className="text-white text-[45px] mt-7">REGISTER</span>
        <div className="flex w-[75%] flex  justify-between">
          <input
            className="bg-transparent border-b border-white w-[30%] text-white mt-12 focus:outline-none placeholder-white"
            placeholder="Last name"
            name="user_LastName"
            onChange={whenChange}
            required
          />
          <input
            className="bg-transparent border-b border-white w-[30%] text-white mt-12 focus:outline-none placeholder-white"
            placeholder="First name"
            name="user_FirstName"
            onChange={whenChange}
            required
          />
          <input
            className="bg-transparent border-b border-white w-[30%] text-white mt-12 focus:outline-none placeholder-white"
            placeholder="Middle name"
            name="user_MiddleName"
            onChange={whenChange}
          />
        </div>
        <input
          className="bg-transparent border-b border-white w-[70%] text-white mt-7 focus:outline-none placeholder-white"
          placeholder="Email"
          name="user_Email"
          type="email"
          onChange={whenChange}
          required
        />
        <input
          className="bg-transparent border-b border-white w-[70%] text-white mt-7 focus:outline-none placeholder-white"
          placeholder="Contact #"
          name="user_ContactNum"
          onChange={whenChange}
          required
        />
        <input
          className="bg-transparent border-b border-white w-[70%] text-white mt-7 focus:outline-none placeholder-white"
          placeholder="Address"
          name="user_Address"
          onChange={whenChange}
          required
        />

        <input
          className="bg-transparent border-b border-white w-[70%] text-white mt-7 focus:outline-none placeholder-white"
          placeholder="Username"
          name="user_username"
          onChange={whenChange}
          required
        />
        <input
          className="bg-transparent border-b border-white w-[70%] text-white mt-7 focus:outline-none placeholder-white"
          type="password"
          placeholder="Password"
          name="user_password"
          onChange={whenChange}
          required
        />
        <input
          className="bg-transparent border-b border-white w-[70%] text-white mt-7 focus:outline-none placeholder-white"
          type="password"
          placeholder="Confirm Password"
          name="confirm_password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="mt-[12%] text-white w-[70%] bg-transparent rounded-full transition-all border border-transparent duration-700 hover:(border border-white)"
          disabled={isSuccessUser}
        >
          LOGIN
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

      <MessengerChat
        pageId="110248655314753"
        language="en_US"
        themeColor={"#0733f9"}
        bottomSpacing={20}
        greetingDialogDisplay={"show"}
        debugMode={true}
      />
    </div>
  );
};

export default Register;
