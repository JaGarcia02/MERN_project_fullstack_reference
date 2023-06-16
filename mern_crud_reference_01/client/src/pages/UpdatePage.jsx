import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "momnet";

const UpdatePage = () => {
  // --- Getting id --- //
  const { id } = useParams();
  // --- Getting id --- //

  // --- Values --- //
  const [name, setNameUpdate] = useState("");
  const [birth_date, setBirthDateUpdate] = useState(null);
  const [gender, setGenderUpdate] = useState("");
  const [age, setAgeUpdate] = useState("");
  const [username, setUsernameUpdate] = useState("");
  const [password, setPasswordUpdate] = useState("");
  const [email, setEmailUpdate] = useState("");
  // --- Values --- //

  // --- Moment Date & Time Format --- //
  const dataDate = moment(birth_date).format("MM-d-YYYY");
  // --- Moment Date & Time Format --- //

  // --- Show Database Values --- //
  const [showUpdateValues, setUpdateValues] = useState([]);
  // --- Show Database Values --- //

  // --- Update User --- //
  useEffect(() => {
    axios.get(`http://localhost:3001/api/user/viewUser/${id}`).then((res) => {
      setUpdateValues(res.data);
      setNameUpdate(res.data[0].name);
      setAgeUpdate(res.data[0].age);
      setBirthDateUpdate(res.data[0].birth_date);
      setGenderUpdate(res.data[0].gender);
    });
  }, []);

  const updateUser = (id) => {
    axios
      .delete("http://localhost:3001/api/user/update", {
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
  // --- Update User --- //
  return (
    <div>
      <div className=" flex justify-center ">
        <div className="flex justify-center items-center  flex-col h-screen w-screen bg-orange-600">
          {showUpdateValues.map((data) => {
            return (
              <>
                <h1 className="font-sans md:font-serif text-white text-2xl mb-4">
                  {" "}
                  Update Page
                </h1>
                <label htmlFor="" className="text-white">
                  Full Name
                </label>
                <input
                  type="text"
                  className="border border-black w-60  rounded-sm"
                  onChange={(e) => setNameUpdate(e.target.value)}
                  value={name}
                />

                <label htmlFor="" className="text-white  mt-5">
                  Age
                </label>
                <input
                  type="number"
                  className="border border-black w-60 rounded-sm"
                  onChange={(e) => setNameUpdate(e.target.value)}
                  value={age}
                />

                <label htmlFor="" className="text-white  mt-5">
                  Birthdate
                </label>
                <input
                  type="date"
                  className="border border-black w-60 rounded-sm"
                  onChange={(e) => console.log(e.target.value)}
                />

                <label htmlFor="" className="text-white  mt-5">
                  Gender
                </label>
                <select
                  className="w-60"
                  name=""
                  id=""
                  onSelect={(e) => setGenderUpdate(e.target.value)}
                >
                  <option value="Male" className="text-center">
                    Male
                  </option>
                  <option value="Female" className="text-center">
                    Female
                  </option>
                </select>

                <label htmlFor="" className="text-white  mt-5">
                  username
                </label>
                <input
                  type="text"
                  className="border border-black w-60 rounded-sm"
                  onChange={(e) => setUsernameUpdate(e.target.value)}
                  value={data.username}
                />

                <label htmlFor="" className="text-white  mt-5">
                  Password
                </label>
                <input
                  type="text"
                  className="border border-black w-60 rounded-sm"
                  onChange={(e) => setPasswordUpdate(e.target.value)}
                  value={data.password}
                />

                <label htmlFor="" className="text-white  mt-5">
                  Email
                </label>
                <input
                  type="email"
                  className="border border-black w-60 rounded-sm"
                  onChange={(e) => setEmailUpdate(e.target.value)}
                  value={data.email}
                />

                <Link to={""}>
                  <button
                    className="bg-green-600 mt-9 w-40 rounded-md"
                    onClick={console.log(data)}
                  >
                    Save
                  </button>
                </Link>

                <Link to={"/menu"}>
                  <button className="bg-violet-600 mt-2 w-40 rounded-md ">
                    Back
                  </button>
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
