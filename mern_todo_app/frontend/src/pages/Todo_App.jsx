import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Todo_App = () => {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const { id } = useParams;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/todo/view-all-task")
      .then((res) => setTask(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addTaskSubmit = () => {
    setNewTask("");
    if (newTask == "") {
      alert("Input cannot be empty!");
    } else {
      setNewTask("");
      axios
        .post("http://localhost:8080/api/todo/create-task", {
          my_task: newTask,
        })
        .then((res) => {
          setTask(res.data);
          setNewTask("");
        })

        .catch((err) => console.log(err));
    }
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:8080/api/todo/delete-task/${id}`)
      .then((res) => {
        setTask(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="justify-center items-center flex w-screen h-screen">
      <div className="h-auto w-200 border border-black rounded-md">
        <div className="flex flex-col justify-center items-center mt-10 text-[45px] font-semibold">
          <h1 className="">Todo App</h1>
        </div>
        <div className="mt-15 flex">
          <button
            onClick={addTaskSubmit}
            className="text-[20px] font-semibold w-40 h-10 bg-green-500 rounded-md ml-35 active:scale-1 active:duration-75 transition-all hover:scale-110 ease-in-out transform py-1 hover:text-white hover:bg-green-700"
          >
            Add Task
          </button>
          <input
            type="text"
            value={newTask}
            onChange={(e) => {
              setNewTask(e.target.value);
            }}
            className="border border-black w-80 h-10 rounded-lg ml-10 text-[20px] font-thin active:scale-1 active:duration-75 transition-all hover:scale-105 ease-in-out transform py-1 hover:w-85"
          />
        </div>
        <div className="flex justify-center items-center mt-10">
          <table className="flex w-full justify-start flex-col items-start ">
            <tr className="w-full justify-evenly shadow-md shadow-gray-400 flex h-10  items-center">
              <th className="text-[15px] flex  w-[100%]">No.</th>
              <th className="text-[15px] flex  w-[100%]">Task</th>
              <th className="text-[15px] flex  w-[100%]"></th>
            </tr>
            {task.map((data, index) => {
              return (
                <tr className="hover:bg-blue-100 cursor-pointer shadow-sm shadow-gray-500 w-full justify-evenly  flex h-10  items-center">
                  <td className="text-[15px] flex text-black w-[100%]">
                    {index + 1}
                  </td>
                  <td className="text-[15px] flex text-black w-[100%]">
                    {data.my_task}
                  </td>
                  <td className="text-[15px] flex w-[100%]">
                    {/* <button className="bg-yellow-500 text-[13px] font-sm w-17 h-7 rounded-md ml-2 active:scale-1 active::duration-75 hover:scale-110 transition-all ease-in-out transform py-1 hover:bg-yellow-700 hover:text-cyan-50">
                      Update
                    </button> */}
                    <button
                      onClick={(e) => deleteTask(data.id)}
                      className="bg-red-500 text-[13px] font-sm w-17 h-7 rounded-md ml-2 active:scale-1 active::duration-75 hover:scale-110 transition-all ease-in-out transform py-1 hover:bg-red-700 hover:text-cyan-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Todo_App;
