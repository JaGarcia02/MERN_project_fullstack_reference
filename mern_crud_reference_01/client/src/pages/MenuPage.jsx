import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MenuPage = () => {
  const [showUsers, setShowUsers] = useState([]);
  const [singleUser, setSingleUser] = useState([]);

  // --- View all --- //
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/user/view-all-users")
      .then((res) => setShowUsers(res.data))
      .catch((err) => console.log(err));
  });
  // --- View all --- //

  // --- Delete User --- //
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:3001/api/user/delete-user/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  // --- Delete User --- //

  return (
    <div className="justify-start h-screen w-screen">
      <div className="flex justify-center items-center">
        <button className="bg-green-600  rounded-md w-20 mb-20">
          Add User
        </button>
        <table className="mt-10 border-collapse border-slate-400">
          <thead>
            <th></th>
            <th className="border border-slate-300">Full Name</th>

            <th className="border border-slate-300">Username</th>

            <th className="border border-slate-300">Email</th>
          </thead>
          <tbody>
            {showUsers.map((data) => {
              return (
                <tr>
                  <td className="">
                    <button className="bg-cyan-300 mr-2 w-20 rounded-md">
                      Details
                    </button>
                  </td>

                  <td className="border border-slate-300 ">{data.name}</td>

                  <td className="border border-slate-300">{data.username}</td>

                  <td className="border border-slate-300">{data.email}</td>

                  <td>
                    <Link to={`/update/${data.id}`}>
                      <button className="mr-2 ml-2 bg-yellow-400 rounded-md w-20">
                        Update
                      </button>
                    </Link>

                    <button
                      className="bg-red-500 rounded-md w-20"
                      onClick={() => deleteUser(data.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenuPage;
