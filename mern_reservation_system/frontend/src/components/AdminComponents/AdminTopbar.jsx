import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { redirect } from "react-router-dom";
import { logout_admin, reset } from "../../features/admin/adminSlice";

const AdminTopbar = () => {
  const [adminHover, setAdminHover] = useState(false);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logout_admin());
    dispatch(reset());

    redirect("/");
  };

  return (
    <div className="h-15 fixed top-0 bg-blue-gray-800 w-full flex px-5 items-center justify-between z-999">
      <span className="text-[30px] text-white">LOGO AND NAME OF BUSINESS</span>
      <div
        onMouseOver={() => setAdminHover(true)}
        onMouseOut={() => setAdminHover(false)}
        className="rounded-md hover:(bg-gray-400)"
      >
        <FaUserCircle className="text-white p-1 text-[50px] rounded-sm cursor-pointer " />
        {adminHover && (
          <>
            <div className="absolute bg-gray-400 top-12 right-5 flex flex-col items-center rounded-md overflow-auto">
              <span className="admin-topbar-items">Account Settings</span>
              <span className="admin-topbar-items" onClick={logout}>
                Logout
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminTopbar;
