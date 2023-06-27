import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { check_token, logout } from "../features/auth/authSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  console.log(user.token);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(check_token({ Token: user.token }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
