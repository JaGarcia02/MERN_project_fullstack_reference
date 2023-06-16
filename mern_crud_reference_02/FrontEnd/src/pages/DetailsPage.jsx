import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DetailsPage = () => {
  const [showPeople, setShowPeople] = useState([]);
  const [showAll, setShowAll] = useState([]);

  //   ----- Delete ----- //
  const deleteEmp = (id) => {
    axios
      .delete(`http://localhost:5000/api/goals/delete/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  //   ----- Delete ----- //

  //   ----- View All ----- //
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/goals/viewAll")
      .then((res) => setShowPeople(res.data))
      .catch((err) => console.log(err));
  }, []);
  //   ----- View All ----- //

  return (
    <div>
      <Link to={"/insert"}>
        <button className="bg-green-600 w-60">Add Employee</button>
      </Link>

      <table>
        <thead>
          <th>Name</th>
          <th>Age</th>
          <th>Date</th>
          <th>Action</th>
        </thead>
        <tbody>
          {showPeople.map((data) => {
            return (
              <tr>
                <td className="bg-cyan-300">{data.full_name}</td>
                <td className="bg-cyan-300">{data.age}</td>
                <td className="bg-cyan-300">{data.date}</td>
                <td>
                  <Link to={`/update/${data.id}`}>
                    <button className="bg-yellow-300">Update</button>
                  </Link>
                  <button
                    className="bg-red-500"
                    onClick={() => deleteEmp(data.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/empDetails/${data.id}`}>
                    <button className="bg-blue-400">Details</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DetailsPage;
