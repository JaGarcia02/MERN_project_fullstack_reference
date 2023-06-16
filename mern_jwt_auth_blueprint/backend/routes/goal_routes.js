const express = require("express");
const router = express.Router();
const {
  get_goals,
  create_goals,
  update_goals,
  delete_goals,
} = require("../controllers/goal_controllers");
const { protect } = require("../middleware/UserAuth_Middleware");

// --- use this if you have different route names --- //
router.get("/", protect, get_goals);
router.post("/", protect, create_goals);
router.put("/:id", protect, update_goals);
router.delete("/:id", protect, delete_goals);
// router.get("/", get_goals);
// router.post("/", create_goals);
// router.put("/:id", update_goals);
// router.delete("/:id", delete_goals);

// --- use this if you have simillar route names --- //
// router.route("/").get(get_goals).post(create_goals);
// router.route("/:id").delete(delete_goals).put(update_goals);

module.exports = router;
