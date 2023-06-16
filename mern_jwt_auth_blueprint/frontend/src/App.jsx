import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.auth);

  console.log(user);

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
