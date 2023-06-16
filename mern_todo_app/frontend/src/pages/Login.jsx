import axios from "axios";
import React, { useEffect, useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = (e) => {
    const data = { username: username, password: password };
    axios
      .post("http://localhost:8080/api/user/user-login", data)
      .then((res) => {
        navigate("/todoApp");
        console.log(res);
        alert(`Welcome ${data.username}`);
      })
      .catch((err) => {
        if (data.username == "" && data.password == "") {
          alert("please fill thee blanks below!");
        } else if (data.username == "") {
          alert("please enter your username!");
        } else if (data.password == "") {
          alert("please enter your password!");
        } else if (err) {
          alert("Please try again!");
        }
      });
  };
  return (
    <div className=" w-screen h-screen">
      <div className="flex w-full justify-center items-center h-full">
        <div className="bg-wihite px-10 py-20 rounded-3xl border-2 border-gray-300">
          <div className="flex  justify-center items-center">
            <h1 className="text-[140px] text-red-500 text-[70px] font-semibold">
              Login Page
            </h1>
          </div>

          <div className="block">
            <p className="font-medium text-lg text-gray-500 mt-3">
              Welcome Back! Please enter your details.
            </p>

            <div className="mt-10">
              <label className="text-lg font-medium">Username</label>
              <input
                type="text"
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-white"
                placeholder="Enter your username address..."
                required
                // onChange={(e) => console.log(e.target.value)}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="mt-5">
              <label className="text-lg font-medium">Password</label>
              <input
                type="password"
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-white"
                placeholder="Enter your password..."
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="mt-10 flex  items-center justify-center">
            <button
              onClick={loginUser}
              className="bg-blue-500 text-base font-medium w-52 h-10 rounded-md ml-2 active:scale-1 active::duration-75 hover:scale-110 transition-all ease-in-out transform py-1 hover:bg-blue-700 hover:text-cyan-50"
            >
              Sign up
            </button>
          </div>
          <div className="flex mt-10 font-semibold justify-center">
            <p>
              Dont have an account?
              <Link to={"/register"} className="text-cyan-600 ml-1">
                click here!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
