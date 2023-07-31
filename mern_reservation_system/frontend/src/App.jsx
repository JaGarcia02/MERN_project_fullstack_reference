import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminPages/AdminDashboard";
import BlockingPage from "./pages/BlockingPage";
import ContactUs from "./pages/ContactUs";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AdminProtected from "./utils/AdminProtected";
import PublicRoutes from "./utils/PublicRoutes";
import AdminSlots from "./pages/AdminPages/AdminSlots";
import Register from "./pages/Register";
import Accomidation from "./pages/Accomidation";
import SearchResult from "./pages/SearchResult";
import AdminTransactions from "./pages/AdminPages/AdminTransactions";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import ReservationUser from "./pages/UserPages/ReservationUser";
import AdminReservation from "./pages/AdminPages/AdminReservation";
import AdminReports from "./pages/AdminPages/AdminReports";
import TokenVerify from "./pages/TokenVerify";
import { useEffect } from "react";
import axios from "axios";
import { API_URL_ADMIN } from "./utils/Urls";
import ForgotPassword from "./pages/ForgotPassword";
import ForgotChange from "./pages/ForgotChange";
import AccountUserSetting from "./pages/UserPages/AccountUserSetting";

function App() {
  const { admin } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <Routes>
        {/*===========================================PUBLIC ROUTES ============================================================== */}
        <Route element={<PublicRoutes />}>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/admin"
            element={user ? <Navigate to="/" /> : <AdminLogin />}
          />
          <Route path="/contactus" element={<ContactUs />} />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route path="/accommodations" element={<Accomidation />} />
          <Route
            path="/searched/:available/:date/:pax"
            element={<SearchResult />}
          />
          <Route path="/verification/:token" element={<TokenVerify />} />
          <Route path="/forgot-pass" element={<ForgotPassword />} />
          <Route path="/forgot/:token" element={<ForgotChange />} />
        </Route>

        {/*===========================================USER PROTECTED ROUTES ============================================================== */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/reserve" element={<ReservationUser />} />
          <Route path="/account-setting" element={<AccountUserSetting />} />
        </Route>

        {/*===========================================ADMIN PROTECTED ROUTES ====================================================== */}
        <Route element={<AdminProtected role={0} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-rooms" element={<AdminSlots />} />
          <Route path="/transactions" element={<AdminTransactions />} />
          <Route path="/admin-reservation" element={<AdminReservation />} />
          <Route path="/admin-report" element={<AdminReports />} />
        </Route>
        {/*==========================ROUTES FOR WILDCARDS =========================================== */}
        <Route path="/blocked" element={<BlockingPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
