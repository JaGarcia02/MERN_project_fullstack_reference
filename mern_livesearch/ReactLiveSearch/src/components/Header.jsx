import React from "react";

const Header = ({ filterUsers }) => {
  return (
    <header>
      <div className="header_container">
        <h2>Live User Filter</h2>
        <span>Search by Full Name</span>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => filterUsers(e.target.value)}
        />
      </div>
    </header>
  );
};

export default Header;
