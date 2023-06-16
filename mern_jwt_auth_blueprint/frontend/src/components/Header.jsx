import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  return (
    <header className="header">
      <div className="logo">
        <a href="/dashboard">GoalSetter</a>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt />
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <a href="/login">
                <FaSignInAlt />
                Login
              </a>
            </li>
            <li>
              <a href="/register">
                <FaUser />
                Register
              </a>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
