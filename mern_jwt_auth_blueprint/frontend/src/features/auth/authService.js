import axios from "axios";

// if you are using vite you need to add /server, and also add proxy: then your localhost in vite.config.js
const API_URL = "/server" + "/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    // localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
