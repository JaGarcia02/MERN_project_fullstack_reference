import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  // ----- Input Values ----- //
  const [name, setName] = useState("");
  const [birth_date, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // ----- Input Values ----- //

  const insertUser = () => {
    axios
      .post("http://localhost:3001/api/user/insert-user", {
        name: name,
        birth_date: birth_date,
        gender: gender,
        age: age,
        username: username,
        password: password,
        email: email,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className=" flex justify-center ">
      <div className="flex justify-center items-center  flex-col h-screen w-screen  bg-blue-900">
        <h1 className="font-sans md:font-serif text-white text-2xl mb-4">
          {" "}
          Signup Page
        </h1>
        <label htmlFor="" className="text-white">
          Full Name
        </label>
        <input
          type="text"
          className="border border-black w-60  rounded-sm"
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="" className="text-white  mt-5">
          Age
        </label>
        <input
          type="number"
          className="border border-black w-60 rounded-sm"
          onChange={(e) => setAge(e.target.value)}
        />

        <label htmlFor="" className="text-white  mt-5">
          Birthdate
        </label>
        <input
          type="date"
          className="border border-black w-60 rounded-sm"
          onChange={(e) => setBirthdate(e.target.value)}
        />

        <label htmlFor="" className="text-white  mt-5">
          Gender
        </label>
        <select
          name=""
          id=""
          selected
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="" selected hidden className=" text-dark-100">
            Choose your gender...
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label htmlFor="" className="text-white  mt-5">
          username
        </label>
        <input
          type="text"
          className="border border-black w-60 rounded-sm"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="" className="text-white  mt-5">
          Password
        </label>
        <input
          type="password"
          className="border border-black w-60 rounded-sm"
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="" className="text-white  mt-5">
          Email
        </label>
        <input
          type="email"
          className="border border-black w-60 rounded-sm"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Link to={"/"}>
          <button
            className="bg-green-600 mt-9 w-40 rounded-md"
            onClick={insertUser}
          >
            Submit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
