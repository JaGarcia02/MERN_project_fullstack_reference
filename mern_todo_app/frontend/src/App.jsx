import { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useRoutes,
  NavLink,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todo_App from "./pages/Todo_App";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/todoApp" element={<Todo_App />} />
      </Routes>
    </>
  );
}

export default App;
