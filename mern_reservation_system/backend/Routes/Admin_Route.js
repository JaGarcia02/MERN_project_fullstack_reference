const express = require("express");
const router = express.Router();
const {
  create_admin,
  login_admin,
  logout_admin,
} = require("../Controllers/Admin");

router.get("/create-admin", create_admin);
router.post("/login-admin", login_admin);
router.get("/logout-admin", logout_admin);

module.exports = router;
