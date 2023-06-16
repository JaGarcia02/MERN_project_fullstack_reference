import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext"; // AuthContext plays a boig role in this page this does to verify if the user that can only edit his/her own posts and account

const Profile = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPost] = useState([]);
  const { authState } = useContext(AuthContext); // part of the AuthContext
  const history = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3002/auth/basicInfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });

    axios
      .get(`http://localhost:3002/posts/get-by-user/${id}`)
      .then((response) => {
        setListOfPost(response.data);
      });
  }, []);
  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        <h1> Username: {username} </h1>
        {authState.username === username && (
          <button onClick={() => history("/change-password")}>
            Change My Password
          </button>
        )}
      </div>
      <div className="listOfPosts">
        {listOfPosts.map((value, key) => {
          return (
            <div key={key} className="post">
              <div className="title"> {value.title} </div>
              <div
                className="body"
                onClick={() => {
                  history(`/post/${value.id}`);
                  //   if this is clicked, this will send the user to its post
                }}
              >
                {value.postText}
              </div>
              <div className="footer">
                <div className="username">{value.username}</div>
                <div className="buttons">
                  <label> {value.Likes.length}</label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
