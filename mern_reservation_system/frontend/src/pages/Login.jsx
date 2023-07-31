import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/users/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MessengerChat } from "react-messenger-chat-plugin";

const Login = () => {
  const dispatch = useDispatch();
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });

  const login = (e) => {
    e.preventDefault();
    dispatch(loginUser(userCredentials));
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black">
      <div className="mt-15" />
      <Navbar />
      <img
        src="/imgs/slider1.jpg"
        className=" h-full w-full absolute bg-black opacity-30"
      />
      <form
        className="w-85 h-110 bg-glass z-3 flex flex-col items-center"
        onSubmit={login}
      >
        <span className="text-white text-[45px] mt-7">LOGIN</span>
        <input
          className="bg-transparent border-b border-white w-[70%] text-white mt-15 focus:outline-none placeholder-white"
          placeholder="Username"
          onChange={(e) =>
            setUserCredentials({ ...userCredentials, username: e.target.value })
          }
          required
        />
        <input
          className="bg-transparent border-b border-white w-[70%] text-white mt-15 focus:outline-none placeholder-white"
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setUserCredentials({ ...userCredentials, password: e.target.value })
          }
          required
        />
        <button
          type="submit"
          className="mt-[12%] text-white w-[70%] bg-transparent rounded-full transition-all border border-transparent duration-700 hover:(border border-white)"
        >
          LOGIN
        </button>
        <Link
          to="/register"
          className="text-white mt-[6%] text-[12px] cursor-pointer hover:(underline)"
        >
          <span>Don't have an account? Register now!</span>
        </Link>
        <Link
          to="/forgot-pass"
          className="text-white mt-[6%] text-[12px] cursor-pointer hover:(underline)"
        >
          <span>Forgot password</span>
        </Link>
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

export default Login;
