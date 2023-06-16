import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmployeeDetails = () => {
  const [showEmp, setEmp] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/goals/viewById/${id}`)
      .then((res) => setEmp(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-purple-400 w-screen h-screen">
      <h1 className="mb-5">Employee Details</h1>
      <div className="flex flex-col w-60">
        {showEmp.map((data) => {
          return (
            <>
              {/* Full Name */}
              <label htmlFor="" className="">
                Full Name
              </label>
              <input type="text" value={data.full_name} />
              {/* Full Name */}

              {/* Age */}
              <label htmlFor="" className="">
                Age
              </label>
              <input type="text" value={data.age} />
              {/* Age */}

              {/* Date */}
              <label htmlFor="" className="">
                Date
              </label>
              <input type="text" className="" value={data.date} />
              {/* Date */}

              <Link to={"/"}>
                <button className="bg-blue-gray-500 w-60">Back</button>
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default EmployeeDetails;
