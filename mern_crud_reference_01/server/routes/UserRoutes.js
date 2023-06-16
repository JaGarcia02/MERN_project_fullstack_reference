const express = require("express");
const router = express.Router();

// ----- Express ----- //
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// ----- Express ----- //

// ------ Imports From Controller ----- //
const {
  insertUser,
  viewAllUsers,
  loginUser,
  viewUser,
  deleteUser,
  updateUser,
} = require("../controllers/UserController");
// ------ Imports From Controller ----- //

// ----- Routes ----- //
router.post("/insert-user", insertUser);
router.get("/view-all-users", viewAllUsers);
router.post("/login-user", loginUser);
router.get("/viewUser/:id", viewUser);
router.delete("/delete-user/:id", deleteUser);
router.put("/update-user", updateUser);
// ----- Routes ----- //

module.exports = router;
