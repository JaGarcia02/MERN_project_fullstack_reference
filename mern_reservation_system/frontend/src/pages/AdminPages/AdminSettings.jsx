import React, { useState } from "react";
import AdminTopbar from "../../components/AdminComponents/AdminTopbar";
import AdminSideBar from "../../components/AdminComponents/AdminSideBar";
import AdminEmail from "../../components/AdminSettings/AdminEmail";
import AdminPassword from "../../components/AdminSettings/AdminPassword";

const AdminSettings = () => {
  const [togglePicked, setTogglePicked] = useState(1);
  return (
    <div className="w-screen h-screen flex">
      <AdminTopbar />
      <AdminSideBar />
      <div className="mt-15 ml-70 flex w-full ">
        <div className="flex-[0.2] flex flex-col border-r border-r-gray-800 p-5">
          <span className="font-Roboto text-[25px] ">Account Setting</span>
          <div className="flex flex-col ml-4 mt-9">
            <span
              className="mb-9 cursor-pointer h-9 flex items-center text-[18px]"
              onClick={() => setTogglePicked(1)}
            >
              Email Settings
            </span>
            <span
              className="mb-9 cursor-pointer h-9 flex items-center text-[18px]"
              onClick={() => setTogglePicked(2)}
            >
              Password Settings
            </span>
          </div>
        </div>
        <div className="flex-[0.8] p-5">
          {togglePicked == 1 ? (
            <AdminEmail />
          ) : togglePicked == 2 ? (
            <AdminPassword />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
