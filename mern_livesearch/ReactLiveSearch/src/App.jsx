import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import User from "./components/User";
import Header from "./components/Header";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("https://randomuser.me/api?results=50");
      const { results } = await res.json();

      setUsers(results);
      setFilteredUsers(results);
    };
    fetchUsers();
  }, []);
  // Search function
  const filterUsers = (searchValue) => {
    const results = users.filter((user) => {
      const fullName = user.name.first + " " + user.name.last;

      if (
        fullName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      ) {
        return user;
      }
    });
    setFilteredUsers(results);
  };

  return (
    <>
      <Header filterUsers={filterUsers} />
      <div className="users_container">
        {filteredUsers.map((user, i) => (
          <User user={user} key={i} />
        ))}
      </div>
    </>
  );
}

export default App;
