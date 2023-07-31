import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import EmailSetting from "../../components/SettingComponent/EmailSetting";
import PasswordSetting from "../../components/SettingComponent/PasswordSetting";

const AccountUserSetting = () => {
  const [toggleState, setToggleState] = useState(1);

  return (
    <div className="w-screen flex">
      <Navbar />
      <div className="mt-15 flex w-full h-screen <md:(flex-col flex)">
        <div className="flex-[0.2] flex flex-col border-r border-r-gray-800 p-5">
          <span className="font-Roboto text-[25px] ">Account Setting</span>
          <div className="flex flex-col ml-4 mt-9">
            <span
              className="mb-9 cursor-pointer h-9 flex items-center text-[18px]"
              onClick={() => setToggleState(1)}
            >
              Email Settings
            </span>
            <span
              className="mb-9 cursor-pointer h-9 flex items-center text-[18px]"
              onClick={() => setToggleState(2)}
            >
              Password Settings
            </span>
          </div>
        </div>
        <div className="flex-[0.8] p-5">
          {toggleState == 1 ? (
            <EmailSetting />
          ) : toggleState == 2 ? (
            <PasswordSetting />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountUserSetting;
