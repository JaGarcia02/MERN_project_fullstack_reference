import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";

const ProtectedRoutes = () => {
  const { admin } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.user);

  if (admin) {
    return <Navigate to="/admin-dashboard" />;
  }

  if (user === undefined || user === null) {
    return <Navigate to="/blocked" />;
  }

  return user ? <Outlet /> : <Navigate to="/blocked" />;
};

export default ProtectedRoutes;
