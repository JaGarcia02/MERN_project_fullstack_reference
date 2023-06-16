import Cookies from "js-cookie";
import axios from "axios";
import { API_URL_ADMIN } from "../../utils/Urls";

const login_admin = async (userData) => {
  const response = await axios.post(API_URL_ADMIN + "login-admin", userData);

  return response.data;
};

const logout_admin = async () => {
  const response = await axios.get(API_URL_ADMIN + "logout-admin");

  Cookies.remove("admin_access_token");
};

const adminService = {
  login_admin,
  logout_admin,
};

export default adminService;
