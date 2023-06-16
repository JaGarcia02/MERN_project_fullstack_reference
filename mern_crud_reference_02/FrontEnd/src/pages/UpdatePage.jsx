import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const UpdatePage = () => {
  //--- Getting the ID --- //
  const { id } = useParams();
  //--- Getting the ID --- //

  const [name, setNameUpdate] = useState("");
  const [age, setAgeUpdate] = useState("");
  const [date, setDateUpdate] = useState("");

  const [showEmp, setEmp] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/goals/viewById/${id}`)
      .then((res) => {
        setEmp(res.data);
        setNameUpdate(res.data[0].full_name);
        setAgeUpdate(res.data[0].age);
        setDateUpdate(res.data[0].date);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(showEmp);

  const updateData = (id) => {
    axios
      .put("http://localhost:5000/api/goals/update", {
        name: name,
        age: age,
        date: date,
        id: id,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="">
        <div className="flex flex-col w-60">
          {showEmp.map((data) => {
            return (
              <>
                <label htmlFor="">Full Name</label>
                <input
                  type="text"
                  className="border border-black"
                  onChange={(e) => setNameUpdate(e.target.value)}
                  value={name}
                />
                <label htmlFor="">Age</label>
                <input
                  type="text"
                  className="border border-black"
                  onChange={(e) => setAgeUpdate(e.target.value)}
                  value={age}
                />
                <label htmlFor="">Date</label>
                <input
                  type="date"
                  id="dateRequired"
                  className="border border-black"
                  name="dateRequired"
                  onChange={(e) => setDateUpdate(e.target.value)}
                  value={date}
                />
                <Link to={"/"}>
                  <button
                    className="bg-yellow-400 w-60"
                    onClick={() => updateData(data.id)}
                  >
                    Update
                  </button>
                </Link>

                <Link to={"/"}>
                  <button className="bg-blue-gray-500 w-60">Back</button>
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
