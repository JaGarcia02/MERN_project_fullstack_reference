const express = require("express");
const {
  create_user,
  login_user,
  logout_user,
  get_user_info,
  verify_user,
  forgot_password_generate,
  forgot_password_change,
  change_email,
  change_password,
} = require("../Controllers/Users");
const router = express.Router();

router.post("/create-user", create_user);
router.post("/login-user", login_user);
router.get("/logout-user", logout_user);
router.get("/get-user/:ID", get_user_info);
router.put("/verify-user", verify_user);
router.post("/forgot-send", forgot_password_generate);
router.put("/forgot-change", forgot_password_change);
router.put("/change-email", change_email);
router.put("/change-password", change_password);

module.exports = router;
