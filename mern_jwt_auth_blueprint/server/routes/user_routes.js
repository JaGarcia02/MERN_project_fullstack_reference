import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user_controllers.js";
import { protect } from "../middleware/auth_Middleware.js";
const router = express.Router();

router.post("/auth", authUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  // added protect middleware to check if there is a valid token
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
