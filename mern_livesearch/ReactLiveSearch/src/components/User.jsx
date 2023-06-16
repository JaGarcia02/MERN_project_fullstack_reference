import React from "react";

const User = ({ user }) => {
  return (
    <div className="user_container">
      <img src={user.picture.large} alt="" />
      <div className="user_info">
        <div>
          <h4>
            {user.name.first} {user.name.last}
          </h4>
          <p>
            {user.location.city}, {user.location.country}
          </p>
        </div>
        <small>{user.phone}</small>
      </div>
    </div>
  );
};

export default User;
