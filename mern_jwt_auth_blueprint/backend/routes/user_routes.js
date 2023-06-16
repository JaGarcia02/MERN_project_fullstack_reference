const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  Update,
  Remove,
  TestMe,
} = require("../controllers/user_controllers");
const { protect } = require("../middleware/UserAuth_Middleware");

// *post* //
router.post("/", Register);
router.post("/login", Login);

// *get* //

router.get("/getTest", protect, TestMe);

// *put* //
router.put("/", Update);

// *delete* //
router.delete("/", Remove);

module.exports = router;
