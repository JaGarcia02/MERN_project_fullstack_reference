import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { register_user } from "../features/users/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MessengerChat } from "react-messenger-chat-plugin";
import { IoEyeSharp } from "react-icons/io5";

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
  const { isSuccessUser, isLoadingUser } = useSelector((state) => state.user);
  const [revealPassword, setRevealPassword] = useState(false);
  const [revealConfirm, setRevealConfirm] = useState(false);

  const validate = () => {
    let lengthString = "";
    let uppString = "";
    let specString = "";
    if (fieldForms.user_password.match(/[0-8]/)) {
    } else {
      lengthString = "Minimum of 1 number characters";
    }

    if (fieldForms.user_password.match(/[A-Z]/)) {
    } else {
      uppString = "Minimum of 1 Upper characters";
    }

    if (fieldForms.user_password.match(/[!\@\#\$\%\^\&\*\(\)\<\>\?\,\.]/)) {
    } else {
      specString = "Minimum of 1 special character is required";
    }

    return toast.error(lengthString + "\n" + uppString + "\n" + specString, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

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

    if (fieldForms.user_password !== confirmPassword) {
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
    } else if (
      !fieldForms.user_password.match(/[0-8]/) ||
      !fieldForms.user_password.match(/[A-Z]/) ||
      !fieldForms.user_password.match(/[!\@\#\$\%\^\&\*\(\)\<\>\?\,\.\_]/)
    ) {
      validate();
    } else {
      dispatch(register_user(fieldForms));
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black <md:(h-auto)">
      <div className="mt-15" />
      <Navbar />
      <img
        src="https://wallpapercave.com/wp/wp4611930.jpg"
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
            placeholder="Last name *"
            name="user_LastName"
            onChange={whenChange}
            required
          />
          <input
            className="bg-transparent border-b border-white w-[30%] text-white mt-12 focus:outline-none placeholder-white"
            placeholder="First name *"
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
          placeholder="Email *"
          name="user_Email"
          type="email"
          onChange={whenChange}
          required
        />
        <input
          className="bg-transparent border-b border-white w-[70%] text-white mt-7 focus:outline-none placeholder-white"
          placeholder="Contact # * (09)"
          name="user_ContactNum"
          type="number"
          maxLength={11}
          onInput={(e) => {
            if (e.target.value.length > e.target.maxLength)
              e.target.value = e.target.value.slice(0, e.target.maxLength);
          }}
          onChange={whenChange}
          required
        />
        <input
          className="bg-transparent border-b border-white w-[70%] text-white mt-7 focus:outline-none placeholder-white"
          placeholder="Address *"
          name="user_Address"
          onChange={whenChange}
          required
        />

        <input
          className="bg-transparent border-b border-white w-[70%] text-white mt-7 focus:outline-none placeholder-white"
          placeholder="Username *"
          name="user_username"
          onChange={whenChange}
          minLength={8}
          required
        />
        <div className="w-[70%] flex  mt-7 items-center justify-center relative">
          <input
            className="bg-transparent border-b border-white text-white w-full focus:outline-none placeholder-white"
            type={revealPassword ? "text" : "password"}
            placeholder="Password *"
            minLength={8}
            name="user_password"
            onChange={whenChange}
            required
          />
          <IoEyeSharp
            className="absolute right-0 text-white text-[18px] cursor-pointer"
            onMouseDown={() => setRevealPassword(true)}
            onMouseUp={() => setRevealPassword(false)}
            onMouseLeave={() => setRevealPassword(false)}
          />
        </div>
        <div className="w-[70%] flex  mt-7 items-center justify-center relative">
          <input
            className="bg-transparent border-b border-white text-white w-full focus:outline-none placeholder-white"
            type={revealConfirm ? "text" : "password"}
            placeholder="Confirm Password *"
            name="confirm_password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <IoEyeSharp
            className="absolute right-0 text-white text-[18px] cursor-pointer"
            onMouseDown={() => setRevealConfirm(true)}
            onMouseUp={() => setRevealConfirm(false)}
            onMouseLeave={() => setRevealConfirm(false)}
          />
        </div>
        {isSuccessUser ? (
          <p className="text-white text-center w-full text-[20px] mt-12">
            REGISTRATION SUCCESS
          </p>
        ) : (
          <button
            type="submit"
            className="mt-[12%] text-white w-[70%] bg-transparent rounded-full transition-all border border-transparent duration-700 hover:(border border-white) disabled:(cursor-wait)"
            disabled={isLoadingUser}
          >
            SIGN UP
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
