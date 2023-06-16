import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const LoginPage = () => {
  // Input Values //
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userLogin, setUserLogin] = useState("");
  //   const { id } = useParams();

  const loginUser = () => {
    axios
      .post("http://localhost:3001/api/user/login-user", {
        email: email,
        password: password,
      })
      .then((res) => window.location.assign("/menu"))
      .catch((err) => console.log(err));
  };
  // Input Values //

  return (
    <div className=" flex justify-center ">
      <div className="flex justify-center items-center  flex-col h-80 w-80  bg-blue-900">
        <h1 className="font-sans md:font-serif text-white text-2xl mb-4">
          {" "}
          Login Page
        </h1>
        <label htmlFor="" className="text-white">
          Email
        </label>
        <input type="text" className="border border-black w-60  rounded-sm" />
        <label htmlFor="" className="text-white  mt-5">
          Password
        </label>
        <input type="text" className="border border-black w-60 rounded-sm" />
        <button
          className="bg-green-500 mt-10 w-40 rounded-md"
          onClick={loginUser}
        >
          Login
        </button>
        <Link to={`/signup/`}>
          <button className="bg-cyan-500 mt-2 w-40 rounded-md">Register</button>
        </Link>
        ;
      </div>
    </div>
  );
};

export default LoginPage;
