const express = require("express");
const router = express.Router();
const {
  createTask,
  displayAllTask,
  editTask,
  deleteTask,
  viewTaskById,
} = require("../controllers/task_controller");

router.post("/create-task", createTask);
router.get("/view-all-task", displayAllTask);
router.get("/show-task/:id", viewTaskById);
router.post("/edit-task/:id", editTask);
router.delete("/delete-task/:id", deleteTask);

module.exports = router;
