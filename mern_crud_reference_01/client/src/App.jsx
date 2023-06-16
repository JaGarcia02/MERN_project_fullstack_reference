import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MenuPage from "./pages/MenuPage";
import UpdatePage from "./pages/UpdatePage";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/menu" element={<MenuPage />} />
        <Route exact path="/update/:id" element={<UpdatePage />} />
      </Routes>
    </>
  );
}

export default App;
