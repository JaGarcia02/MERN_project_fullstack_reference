import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage";
import RegisterPage from "./pages/RegisterPage";
import UpdatePage from "./pages/UpdatePage";
import EmployeeDetails from "./pages/EmployeeDetails";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<DetailsPage />} />
        <Route path="/insert" element={<RegisterPage />} />
        <Route path="/update/:id" element={<UpdatePage />} />
        <Route path="/empDetails/:id" element={<EmployeeDetails />} />
      </Routes>
    </>
  );
}

export default App;
