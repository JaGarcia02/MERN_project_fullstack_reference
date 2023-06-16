import Cookies from "js-cookie";
import axios from "axios";
import { API_URL_USERS } from "../../utils/Urls";

const register_user = async (userData) => {
  const response = await axios.post(API_URL_USERS + "create-user", userData);

  return response.data;
};

const login_user = async (userData) => {
  const response = await axios.post(API_URL_USERS + "login-user", userData);

  return response.data;
};

const logout_user = async () => {
  const response = await axios.get(API_URL_USERS + "logout-user");

  Cookies.remove("user_access_token");
  return response.data;
};
const userService = {
  register_user,
  login_user,
  logout_user,
};

export default userService;
