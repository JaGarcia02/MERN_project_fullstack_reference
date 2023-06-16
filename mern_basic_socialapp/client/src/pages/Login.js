import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext); // <=== this will trigger the AuthContext in the App.js
  const history = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3002/auth/login", data).then((response) => {
      // this error condition is the defence mechanism of the application
      // it will prevent non useres / unregistered users to access or read comments in the application
      if (response.data.error) {
        alert(response.data.error); // this will send error message in the ui
        console.log(response.data); // this will send error in the console
      } else {
        // if you are not validated, there will be no token stored in the session
        // you cant login and make any comments
        //  sessionStorage.setItem("accessToken", response.data); // this will check if the token is stored in the session
        localStorage.setItem("accessToken", response.data.token); // this will put the token in  the local storage
        setAuthState({
          // all this value is from the response.data
          username: response.data.username,
          id: response.data.id,
          status: true,
        }); // <==== this is the trigger to render the page if the user is successfully logged in (this is the reference to trigger the render of the body!!)
        console.log(response.data.token);
        history("/");
      }
    });
  };

  return (
    <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}> Login </button>
    </div>
  );
};

export default Login;
