const express = require("express");
const router = express.Router();
const {
  create_admin,
  login_admin,
  logout_admin,
  change_email_admin,
  change_password_admin,
  admin_forgot,
  admin_forgotChange,
} = require("../Controllers/Admin");

router.get("/create-admin", create_admin);
router.post("/login-admin", login_admin);
router.get("/logout-admin", logout_admin);
router.put("/change-adminemail", change_email_admin);
router.put("/change-adminpass", change_password_admin);
router.post("/req-forgotPass", admin_forgot);
router.put("/req-forgotChangePass", admin_forgotChange);

module.exports = router;
