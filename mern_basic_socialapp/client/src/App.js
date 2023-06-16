import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

function App() {
  const history = useNavigate();
  const [authState, setAuthState] = useState({
    // this will store who is logged in
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    // if (localStorage.getItem("accessToken")) {

    axios
      .get("http://localhost:3002/auth/authCheker", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          // setAuthState(false); // if there is an fake token that is inputed in the console, this will set the authState false
          // this will prevent the non-user to access the page
          setAuthState({ ...authState, status: false }); // this will change only the authState status
        } else {
          setAuthState({
            // this is data is passed by the useState who ever is logged in
            // this information that is passed here is from the reoutes -> middleware -> to here (pages/App.js)
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
    // this will render again the links if the user is loggedin, the nav bar register and login links will dissappear

    // }
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
    history("/login");
  };

  return (
    <div className="App">
      {/* AuthContext is in the helpers folder: this does to re render the page by not using refresh */}
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <div className="navbar">
          <div className="links">
            {/* This auth state will rerender the page if the user is logged in or not */}

            {/* if else condition +++++++++++++++++++++++ */}
            {!authState.status ? (
              <>
                <a href="/registration">Registration</a>
                <a href="/login">Login</a>
              </>
            ) : (
              <>
                <a href="/">Home</a>
                <a href="/create-post">Create Post</a>
              </>
            )}
          </div>
          {/* if else condition +++++++++++++++++++++++ */}

          <div className="loggedInContainer">
            <h1>{authState.username} </h1>
            {authState.status && <button onClick={logout}> Logout</button>}
          </div>
        </div>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/create-post" element={<CreatePost />} />
          <Route exact path="/post/:id" element={<Post />} />
          <Route exact path="/login/" element={<Login />} />
          <Route exact path="/registration" element={<Registration />} />
          <Route exact path="/profile/:id" element={<Profile />} />
          <Route exact path="/change-password" element={<ChangePassword />} />
          <Route path="*" exact element={<PageNotFound />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
