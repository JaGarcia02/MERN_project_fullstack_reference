const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  Update,
  Remove,
  TestMe,
  GetToken,
} = require("../controllers/user_controllers");
const { protect } = require("../middleware/UserAuth_Middleware");

// *post* //
router.post("/", Register);
router.post("/login", Login);
router.post("/check-token", GetToken);

// *get* //

router.get("/getTest", protect, TestMe);

// *put* //
router.put("/", Update);

// *delete* //
router.delete("/", Remove);

module.exports = router;
