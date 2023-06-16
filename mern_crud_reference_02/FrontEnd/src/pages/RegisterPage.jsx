import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");

  const submitData = () => {
    axios
      .post("http://localhost:5000/api/goals/set", {
        name: name,
        age: age,
        date: date,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="flex flex-col w-60">
        <label htmlFor="">Full Name</label>
        <input
          type="text"
          className="border border-black"
          placeholder="Enter your full name..."
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="" className="mt-3">
          Age
        </label>
        <input
          type="text"
          className="border border-black"
          placeholder="Enter your age..."
          onChange={(e) => setAge(e.target.value)}
        />
        <label htmlFor="" className="mt-3">
          Date
        </label>
        <input
          type="date"
          className="border border-black"
          onChange={(e) => setDate(e.target.value)}
        />
        <Link to={"/"}>
          <button className="bg-green-500 w-60" onClick={submitData}>
            Submit
          </button>
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;
