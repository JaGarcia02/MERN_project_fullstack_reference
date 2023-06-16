import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";

const AdminProtected = ({ role }) => {
  const { admin } = useSelector((state) => state.admin);

  if (admin === undefined || admin === null) {
    return <Navigate to="/" />;
  }

  const decodedToken = jwt(admin);

  return decodedToken?.role == role ? (
    <Outlet />
  ) : admin ? (
    <Navigate to="/blocked" />
  ) : (
    <Navigate to="/" />
  );
};

export default AdminProtected;
