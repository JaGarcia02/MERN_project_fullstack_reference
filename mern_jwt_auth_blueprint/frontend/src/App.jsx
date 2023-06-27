import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const { user, message } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    switch (message) {
      case "Not Authorized!":
        alert("NO TOKEN! PLEASE RELOGIN AGAIN");
        localStorage.removeItem("user");
        navigate("/");
        window.location.reload();
        break;
    }
  }, [message]);

  return (
    <>
      <div className="container">
        <Header />
        <Routes>
          {user && <Route exact path="/dashboard" element={<Dashboard />} />}
          {!user && (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
          <Route
            path="*"
            element={<Navigate to={user ? "/dashboard" : "/login"} />}
          />
          <Route
            path="*"
            element={<Navigate to={!user ? "/login" : "/dashboard"} />}
          />
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
