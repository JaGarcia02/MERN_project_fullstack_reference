const express = require("express");
const router = express.Router();
const {
  addTask,
  viewAllTask,
  deleteTask,
  viewTaskById,
  updateTask,
  taskCount,
} = require("../controllers/controller_task");

router.post("/create-task", addTask);

router.put("/update-task/:id", updateTask);

router.delete("/delete-task/:id", deleteTask);

router.get("/view-all-task", viewAllTask);
router.get("/view-task/:id", viewTaskById);
router.get("/view-task-count", taskCount);

module.exports = router;
