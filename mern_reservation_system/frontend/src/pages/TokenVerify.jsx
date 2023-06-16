import axios from "axios";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL_USERS } from "../utils/Urls";
import { BsInfoCircleFill } from "react-icons/bs";

const TokenVerify = () => {
  const token = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .put(API_URL_USERS + "verify-user", { token: token.token })
      .then((res) => console.log("Success"))
      .catch((err) => navigate("/blocked"));
  }, []);

  return (
    <div className="w-screen h-screen flex bg-blue-gray-900 items-center justify-center">
      <div className="w-150 h-100 rounded-md bg-white flex flex-col items-center justify-center relative">
        <BsInfoCircleFill className="text-green-500 text-[80px] absolute top-5" />
        <span className="font-Roboto text-[25px] my-18">
          Verification is Success you may login now!
        </span>
        <button
          className="w-30 h-8 bg-blue-500 rounded-full text-white shadow-sm shadow-black"
          onClick={() => navigate("/login")}
        >
          LOGIN NOW{" "}
        </button>
      </div>
    </div>
  );
};

export default TokenVerify;
