const express = require("express");
const router = express.Router();
const {
  createUser,
  deleteUser,
  viewAllUsers,
  updateUser,
  viewSingleUser,
  Login_User,
} = require("../controllers/controller_users");

router.post("/create-user", createUser);
router.post("/user-login", Login_User);

router.delete("/delete-user/:id", deleteUser);

router.put("/update-user/:id", updateUser);

router.get("/view-all-users", viewAllUsers);
router.get("/view-user/:id", viewSingleUser);

module.exports = router;
