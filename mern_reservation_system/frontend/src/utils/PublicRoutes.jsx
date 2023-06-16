import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const { admin } = useSelector((state) => state.admin);

  return admin == null || admin === undefined ? (
    <Outlet />
  ) : (
    <Navigate to="/admin-dashboard" />
  );
};

export default PublicRoutes;
