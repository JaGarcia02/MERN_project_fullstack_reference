import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [person, setPerson] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [newPerson, setNewPerson] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8001/api/people/view-all-person")
      .then((res) => setPerson(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addPerson = () => {
    if (newPerson == "") {
      alert("Input field is empty!");
    } else {
      axios
        .post("http://localhost:8001/api/people/create-person", {
          personFullName: newPerson,
        })
        .then((res) => {
          setPerson(res.data);
          setNewPerson("");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="App">
      <div className="flex flex-col items-center justify-center">
        <button
          onClick={addPerson}
          className="mr-21 mt-2 mb-1 bg-green-500 w-25 active:scale-1 active:duration-75 transition transform ease-in-out hover:bg-green-600 hover:text-white hover:scale-105 hover:rounded-md"
        >
          Add Person
        </button>
        <input
          type="text"
          className="border border-black active:scale-1 active:duration-75 transition transform ease-in-out hover:scale-102 hover:rounded-md"
          placeholder="enter name. . . ."
          onChange={(e) => setNewPerson(e.target.value)}
          value={newPerson}
        />
        <input
          type="text"
          className="border border-black mt-5 active:scale-1 active:duration-75 transition transform ease-in-out hover:scale-102 hover:rounded-md"
          placeholder="search person. . ."
          onChange={(e) => setSearchData(e.target.value)}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {person
              .filter((val) => {
                if (searchData == "") {
                  return val;
                } else if (
                  val.personFullName
                    .toLowerCase()
                    .includes(searchData.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((data, index, key) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{data.personFullName}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
